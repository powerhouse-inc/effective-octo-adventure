import type { ReactorAdapter } from "../adapters/ReactorAdapter.js";
import type { GqlResult } from "./DocumentClient.js";

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
  private adapter: ReactorAdapter;

  constructor(adapter: ReactorAdapter) {
    this.adapter = adapter;
  }

  public async getDriveIds(): Promise<string[]> {
    return this.adapter.getDriveIds();
  }

  public async getDocumentDriveNodes(driveId: string): Promise<DriveNodes> {
    return this.adapter.getDocumentDriveNodes(driveId);
  }

  public async getDocument<StateType>(
    id: string,
    schema: string,
  ): Promise<GqlResult<StateType>> {
    return this.adapter.getDocument(id, schema) as Promise<GqlResult<StateType>>;
  }
}
