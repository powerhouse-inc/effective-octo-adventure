import { Maybe } from "document-model/document";
import { DocumentsCache } from "../common/DocumentsCache";
import { ReactorClient } from "../common/ReactorClient";
import { DocumentClient } from "../common/DocumentClient";
import { ParsedNotionDocument } from "./NotionTypes";
import { getPNDTitle } from "document-models/utils";

type WriteClientBase = {
  setUrl(url: string): void;
};

type AtlasStateType = {
  name: Maybe<string>;
  notionId: Maybe<string>;
}

export abstract class AtlasBaseClient<ScopeType extends AtlasStateType, WriteClientType extends WriteClientBase> extends DocumentClient<ScopeType, ParsedNotionDocument> {
  protected readonly writeClient: WriteClientType;

  constructor(documentType:string, mutationsSubgraphUrl:string, documentsCache:DocumentsCache, readClient:ReactorClient, writeClient:WriteClientType) {
    super(documentType, documentsCache, readClient);
    this.writeClient = writeClient;
    this.writeClient.setUrl(mutationsSubgraphUrl);
  }

  protected getInputIdFromState(state: ScopeType): Maybe<string> {
    return state.notionId;
  }
  
  protected getNameFromState(state: ScopeType): Maybe<string> {
    return state.name
  }

  protected getNameFromInput(notionDoc: ParsedNotionDocument): Maybe<string> {
    return getPNDTitle(notionDoc);
  }
  
  protected getInputIdFromInput(notionDoc: ParsedNotionDocument): Maybe<string> {
    return notionDoc.id;
  }
}