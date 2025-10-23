import path from "path";
import { queryGraphQL } from "./gql-utils.js";
import { gql } from "graphql-request";
import type { ReactorAdapter } from "../adapters/ReactorAdapter.js";

export type DriveResultNode = {
  id: string;
  parentFolder: string;
  name: string;
  documentType?: string;
};

export type DriveResult = {
  drive: DriveNodes;
};

export type DocumentDriveResult = {
  document: {
    id: string;
    state: {
      icon: string;
      name: string;
      nodes: DriveResultNode[];
    };
  };
};

export type DriveIdsResult = {
  drives: string[];
};

export type DriveNodes = {
  id: string;
  slug: string;
  name: string;
  icon: string;
  nodes: DriveResultNode[];
};

export class ReactorClient {
  private endpointUrl: string | undefined;
  private driveEndpointUrl: string;
  private systemEndpointUrl: string;
  private adapter?: ReactorAdapter;

  constructor(
    endpointUrl: string | undefined,
    driveName: string,
    adapter?: ReactorAdapter
  ) {
    this.endpointUrl = endpointUrl;
    this.driveEndpointUrl = path.join(endpointUrl || "", "d", driveName);
    this.systemEndpointUrl = new URL("./graphql/system", endpointUrl || "").href;
    this.adapter = adapter;
  }

  public async queryReactor<ReturnType>(
    query: string,
    variables?: object,
  ): Promise<ReturnType> {
    if (this.adapter) {
      // Extract docId and schema for getDocument call
      // The query format is: query getDocument($id: String!) { document(id: $id) { ... on Schema } }
      const docId = (variables as any)?.id;
      if (!docId) {
        throw new Error("queryReactor requires 'id' in variables when using adapter");
      }

      // Extract schema name from query (between "... on " and the closing brace)
      const schemaMatch = query.match(/\.\.\.\s+on\s+(\w+)/);
      if (!schemaMatch) {
        throw new Error("Could not extract schema from query");
      }
      const schema = schemaMatch[1];

      return this.adapter.getDocument(docId, schema) as Promise<ReturnType>;
    }

    const result = await queryGraphQL<ReturnType>(
      this.driveEndpointUrl,
      query,
      variables,
    );

    if (result.errors) {
      throw new Error(`GraphQL error when querying ${this.endpointUrl}`, {
        cause: result.errors,
      });
    }

    return result as ReturnType;
  }

  public async getDriveIds(): Promise<string[]> {
    if (this.adapter) {
      return this.adapter.getDriveIds();
    }

    const result = await queryGraphQL<DriveIdsResult>(
      this.systemEndpointUrl,
      gql`
        query getDriveIds {
          drives
        }
      `,
    );

    if (!result.drives) {
      if (result.errors) {
        throw new Error(
          `GraphQL error when querying ${this.systemEndpointUrl}`,
          { cause: result.errors },
        );
      } else {
        throw new Error(
          `Failed to fetch drive ids from ${this.systemEndpointUrl}`,
        );
      }
    }

    return result.drives;
  }

  public async getDocumentDriveNodes(driveId: string): Promise<DriveNodes> {
    if (this.adapter) {
      return this.adapter.getDocumentDriveNodes(driveId);
    }

    const result = await queryGraphQL<DocumentDriveResult>(
      this.driveEndpointUrl,
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
      { driveId },
    );

    if (!result.document) {
      if (result.errors) {
        throw new Error(`GraphQL error when querying ${this.endpointUrl}`, {
          cause: result.errors,
        });
      } else {
        throw new Error(`Failed to fetch drive info from ${this.endpointUrl}`);
      }
    }

    const mappedResult: DriveNodes = {
      id: result.document.id,
      slug: result.document.id,
      icon: result.document.state.icon,
      name: result.document.state.name,
      nodes: result.document.state.nodes,
    };

    return mappedResult;
  }
}
