/**
 * Mock reactor adapter that logs operations without actually storing data.
 * Useful for testing import flows and understanding what operations would be performed.
 */

import {
  type ReactorAdapter,
  type ReactorOperationsSummary,
  type OperationLog,
} from "./ReactorAdapter.js";
import { type DriveNodes, type DriveResultNode } from "../common/ReactorClient.js";
import { randomUUID } from "crypto";

export class MockReactorAdapter implements ReactorAdapter {
  private operations: OperationLog[] = [];
  private drives: Map<string, { id: string; name: string; nodes: DriveResultNode[] }> = new Map();
  private documents: Map<string, any> = new Map();
  private verbose: boolean;

  constructor(options?: { verbose?: boolean }) {
    this.verbose = options?.verbose ?? true;
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

    if (this.verbose) {
      console.log(`[MOCK QUERY] ${operation.name}`, variables || "");
    }

    // Return mock data based on query patterns
    let result: any = {};

    if (query.includes("getDocumentDriveNodes")) {
      const driveId = (variables as any)?.driveId;
      const drive = this.drives.get(driveId);
      result = {
        document: {
          id: driveId,
          state: {
            icon: drive?.icon || "Folder",
            name: drive?.name || driveId,
            nodes: drive?.nodes || [],
          },
        },
      };
    } else if (query.includes("getDriveIds")) {
      result = {
        drives: Array.from(this.drives.keys()),
      };
    } else if (query.includes("document(id:")) {
      // Document query - return mock document
      const docId = (variables as any)?.id;
      const doc = this.documents.get(docId);
      result = {
        document: doc || {
          id: docId,
          name: "Mock Document",
          revision: 1,
          state: {},
        },
      };
    }

    operation.result = result;
    this.operations.push(operation);

    return result as T;
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

    if (this.verbose) {
      console.log(`[MOCK MUTATION] ${mutationName}`, variables);
    }

    let result: any = {};

    // Handle specific mutations
    if (mutationName.includes("_createDocument")) {
      const docId = `phd:${randomUUID()}`;
      const docType = mutationName.split("_")[0];
      const doc = {
        id: docId,
        name: (variables as any).__args?.name || "New Document",
        revision: 1,
        state: {},
      };
      this.documents.set(docId, doc);
      result = docId;

      if (this.verbose) {
        console.log(`  → Created document: ${docId}`);
      }
    } else if (mutationName === "addDrive") {
      const args = variables as any;
      this.drives.set(args.__args.id, {
        id: args.__args.id,
        name: args.__args.name || args.__args.id,
        nodes: [],
      });
      result = {
        id: args.__args.id,
        name: args.__args.name,
        slug: args.__args.slug,
        icon: args.__args.icon,
      };

      if (this.verbose) {
        console.log(`  → Created drive: ${args.__args.id}`);
      }
    } else {
      // Generic mutation - just log it
      result = { success: true };
    }

    operation.result = result;
    this.operations.push(operation);

    return result as T;
  }

  async getDriveIds(): Promise<string[]> {
    return this.executeQuery(
      "system",
      "query getDriveIds { drives }"
    ).then((r: any) => r.drives);
  }

  async getDocumentDriveNodes(driveId: string): Promise<DriveNodes> {
    const result = await this.executeQuery<any>(
      "drive",
      "query getDocumentDriveNodes($driveId: String!) { ... }",
      { driveId }
    );

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
    return this.executeMutation("system", "addDrive", { __args: args });
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
   * Print a formatted summary of all operations.
   */
  printSummary(): void {
    const summary = this.getSummary();

    console.log("\n" + "=".repeat(60));
    console.log("Mock Reactor Operations Summary");
    console.log("=".repeat(60));
    console.log(`Total Operations: ${summary.operations.length}`);
    console.log(`  - Queries: ${summary.queriesExecuted}`);
    console.log(`  - Mutations: ${summary.mutationsExecuted}`);
    console.log(`Drives Created: ${summary.drivesCreated}`);
    console.log(`Documents Created: ${summary.documentsCreated}`);
    console.log(`Documents Updated: ${summary.documentsUpdated}`);
    console.log("=".repeat(60));

    // Group mutations by type
    const mutationsByType: { [key: string]: number } = {};
    summary.operations
      .filter((op) => op.type === "mutation")
      .forEach((op) => {
        const base = op.name.split("_")[0];
        mutationsByType[base] = (mutationsByType[base] || 0) + 1;
      });

    if (Object.keys(mutationsByType).length > 0) {
      console.log("\nMutations by Document Type:");
      Object.entries(mutationsByType)
        .sort(([, a], [, b]) => b - a)
        .forEach(([type, count]) => {
          console.log(`  ${type}: ${count}`);
        });
    }

    console.log("\n" + "=".repeat(60));
  }

  /**
   * Extract operation name from GraphQL query string.
   */
  private extractOperationName(query: string): string | null {
    const match = query.match(/(?:query|mutation)\s+(\w+)/);
    return match ? match[1] : null;
  }
}
