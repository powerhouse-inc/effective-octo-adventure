import { queryGraphQL } from "scripts/apply-changes/gql-utils";
import { request, gql } from "graphql-request";

export type DriveResultNode = {
  id: string,
  parentFolder: string,
  name: string,
  documentType?: string,
}

export type DriveResult = {
  drive: DriveNodes
};

export type DriveNodes = {
  id: string,
  slug: string,
  name: string,
  icon: string,
  nodes: DriveResultNode[],
}

export class ReactorClient {
  private endpointUrl: string;
  private driveEndpointUrl: string;

  constructor(endpointUrl:string, driveName:string) {
    this.endpointUrl = endpointUrl;
    this.driveEndpointUrl = new URL('d/' + driveName, endpointUrl).href;
  }

  public async queryReactor<ReturnType>(query: string, variables?: Object): Promise<ReturnType> {
    const result = await queryGraphQL<ReturnType>(
      this.driveEndpointUrl,
      query, 
      variables
    );

    if (result.errors) {
      throw new Error(`GraphQL error when querying ${this.endpointUrl}`, { cause: result.errors });
    }

    return result as ReturnType;
  }

  public async getDriveNodes(): Promise<DriveNodes> {
    const result = await queryGraphQL<DriveResult>(
      this.driveEndpointUrl,
      gql`
        query getDriveNodes {
          drive {
            id
            slug
            name
            icon
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
      `,
    );

    if (!result.drive) {
      if (result.errors) {
        throw new Error(`GraphQL error when querying ${this.endpointUrl}`, { cause: result.errors });
      } else {
        throw new Error(`Failed to fetch drive info from ${this.endpointUrl}`);
      }
    }

    return result.drive;
  }
}