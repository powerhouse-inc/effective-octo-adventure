/**
 * HTTP reactor adapter that uses the existing GraphQL clients.
 * This wraps the current remote reactor implementation.
 */

import { type BaseAction } from "document-model";
import {
  type ReactorAdapter,
  type ReactorOperationsSummary,
  type OperationLog,
} from "./ReactorAdapter.js";
import { type DriveNodes } from "../common/ReactorClient.js";
import { queryGraphQL } from "../common/gql-utils.js";
import { gql } from "graphql-request";
import { graphqlClient, systemClient } from "../../clients/index.js";

export class HttpReactorAdapter implements ReactorAdapter {
  private gqlEndpoint: string;
  private driveEndpoint: string;
  private systemEndpoint: string;
  private operations: OperationLog[] = [];

  constructor(gqlEndpoint: string, driveName?: string) {
    this.gqlEndpoint = gqlEndpoint;
    this.driveEndpoint = driveName
      ? new URL(`./d/${driveName}`, gqlEndpoint).href
      : gqlEndpoint;
    this.systemEndpoint = new URL("./graphql/system", gqlEndpoint).href;

    // Configure the generated clients
    graphqlClient.setUrl(this.driveEndpoint);
    systemClient.setUrl(this.systemEndpoint);
  }

  /**
   * Update the drive endpoint URL (when switching drives).
   */
  setDriveEndpoint(driveName: string): void {
    this.driveEndpoint = new URL(`./d/${driveName}`, this.gqlEndpoint).href;
    graphqlClient.setUrl(this.driveEndpoint);
  }

  async executeQuery<T>(
    endpoint: string,
    query: string,
    variables?: object
  ): Promise<T> {
    const operation: OperationLog = {
      type: "query",
      name: this.extractOperationName(query) || "unknown",
      timestamp: new Date(),
      args: variables,
    };

    try {
      const result = await queryGraphQL<T>(endpoint, query, variables);

      if ((result as any).errors) {
        const error = `GraphQL errors: ${JSON.stringify((result as any).errors)}`;
        operation.error = error;
        this.operations.push(operation);
        throw new Error(error);
      }

      operation.result = result;
      this.operations.push(operation);
      return result;
    } catch (error) {
      operation.error = String(error);
      this.operations.push(operation);
      throw error;
    }
  }

  async executeMutation<T>(
    endpoint: string,
    mutationName: string,
    variables: object
  ): Promise<T> {
    const operation: OperationLog = {
      type: "mutation",
      name: mutationName,
      timestamp: new Date(),
      args: variables,
    };

    try {
      // The generated clients handle mutations internally
      // This method is mainly for tracking/logging
      let result: any;

      // Determine which client to use based on mutation name
      if (mutationName === "addDrive") {
        result = await systemClient.mutations.addDrive(variables as any);
      } else {
        // For document mutations, they're called directly by the Atlas clients
        // This is a passthrough for logging purposes
        result = { success: true };
      }

      operation.result = result;
      this.operations.push(operation);
      return result as T;
    } catch (error) {
      operation.error = String(error);
      this.operations.push(operation);
      throw error;
    }
  }

  async addAction(
    driveId: string,
    docId: string,
    documentType: string,
    action: BaseAction
  ): Promise<any> {
    const operation: OperationLog = {
      type: "mutation",
      name: `addAction:${action.type}`,
      timestamp: new Date(),
      args: {
        driveId,
        docId,
        documentType,
        actionType: action.type,
        actionInput: action.input,
      },
    };

    try {
      // Convert document type to GraphQL prefix
      // "sky/atlas-scope" -> "AtlasScope"
      const typePrefix = this.documentTypeToPrefix(documentType);

      // Convert action type to camelCase method name
      // "SET_SCOPE_NAME" -> "setScopeName"
      const methodName = this.actionTypeToMethodName(action.type);

      // Build full mutation name: "AtlasScope_setScopeName"
      const mutationName = `${typePrefix}_${methodName}`;

      // Call the generated client
      const mutationFn = (graphqlClient.mutations as any)[mutationName];
      if (!mutationFn) {
        throw new Error(`Mutation ${mutationName} not found in generated client`);
      }

      const result = await mutationFn({
        __args: {
          driveId,
          docId,
          input: action.input,
        },
      });

      operation.result = result;
      this.operations.push(operation);
      return result;
    } catch (error) {
      operation.error = String(error);
      this.operations.push(operation);
      throw error;
    }
  }

  async addDriveAction(
    driveId: string,
    driveAction: BaseAction
  ): Promise<any> {
    const operation: OperationLog = {
      type: "mutation",
      name: `addDriveAction:${driveAction.type}`,
      timestamp: new Date(),
      args: {
        driveId,
        actionType: driveAction.type,
        actionInput: driveAction.input,
      },
    };

    try {
      let result: any;

      // Handle specific drive actions
      if (driveAction.type === "ADD_FILE") {
        // Use graphqlClient for drive mutations
        result = await graphqlClient.mutations.addFile({
          __args: {
            driveId,
            ...driveAction.input,
          },
        });
      } else {
        throw new Error(`Unsupported drive action type: ${driveAction.type}`);
      }

      operation.result = result;
      this.operations.push(operation);
      return result;
    } catch (error) {
      operation.error = String(error);
      this.operations.push(operation);
      throw error;
    }
  }

  async getDriveIds(): Promise<string[]> {
    const result = await this.executeQuery<any>(
      this.systemEndpoint,
      gql`
        query getDriveIds {
          drives
        }
      `
    );

    if (!result.drives) {
      throw new Error(`Failed to fetch drive ids from ${this.systemEndpoint}`);
    }

    return result.drives;
  }

  async getDocumentDriveNodes(driveId: string): Promise<DriveNodes> {
    const result = await this.executeQuery<any>(
      this.driveEndpoint,
      gql`
        query getDocumentDriveNodes($driveId: String!) {
          document(id: $driveId) {
            id
            ... on DocumentDrive {
              state {
                icon
                name
                nodes {
                  ... on DocumentDrive_FolderNode {
                    id
                    parentFolder
                    name
                  }
                  ... on DocumentDrive_FileNode {
                    id
                    documentType
                    parentFolder
                    name
                  }
                }
              }
            }
          }
        }
      `,
      { driveId }
    );

    if (!result.document) {
      throw new Error(`Failed to fetch drive info from ${this.driveEndpoint}`);
    }

    return {
      id: result.document.id,
      slug: result.document.id,
      icon: result.document.state.icon,
      name: result.document.state.name,
      nodes: result.document.state.nodes,
    };
  }

  async createDrive(args: {
    id: string;
    name?: string;
    slug?: string;
    icon?: string;
    preferredEditor?: string;
  }): Promise<any> {
    return this.executeMutation("system", "addDrive", {
      __args: args,
      id: true,
      name: true,
      slug: true,
      icon: true,
    });
  }

  getSummary(): ReactorOperationsSummary {
    const queries = this.operations.filter((op) => op.type === "query");
    const mutations = this.operations.filter((op) => op.type === "mutation");
    const creates = mutations.filter((op) => op.name.includes("createDocument"));
    const updates = mutations.filter(
      (op) => !op.name.includes("createDocument") && !op.name.includes("addDrive")
    );
    const drives = mutations.filter((op) => op.name.includes("addDrive"));

    return {
      queriesExecuted: queries.length,
      mutationsExecuted: mutations.length,
      drivesCreated: drives.length,
      documentsCreated: creates.length,
      documentsUpdated: updates.length,
      operations: this.operations,
    };
  }

  /**
   * Extract operation name from GraphQL query string.
   */
  private extractOperationName(query: string): string | null {
    const match = query.match(/(?:query|mutation)\s+(\w+)/);
    return match ? match[1] : null;
  }

  /**
   * Convert document type to GraphQL type prefix.
   * E.g., "sky/atlas-scope" -> "AtlasScope"
   */
  private documentTypeToPrefix(documentType: string): string {
    const parts = documentType.split("/");
    const typeName = parts[parts.length - 1];
    // Convert kebab-case to PascalCase
    return typeName
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
  }

  /**
   * Convert action type to GraphQL method name.
   * E.g., "SET_SCOPE_NAME" -> "setScopeName"
   */
  private actionTypeToMethodName(actionType: string): string {
    // Split by underscore and convert to camelCase
    const parts = actionType.toLowerCase().split("_");
    return parts
      .map((part, index) =>
        index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
      )
      .join("");
  }
}
