import { type Maybe } from "document-model";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";
import { DocumentClient } from "../common/DocumentClient.js";
// import { type ParsedNotionDocument } from "./NotionTypes.js";
import { getNodeTitle, getPNDTitle } from "../../../document-models/utils.js";
import _ from "lodash";
import { ViewNodeExtended } from "@powerhousedao/sky-atlas-notion-data";

type WriteClientBase = {
  setUrl(url: string): void;
};

type AtlasStateType = {
  name: Maybe<string>;
  notionId: Maybe<string>;
};

export const mutationArg = (driveId: string, docId: string) => {
  return <InputType>(input: InputType) => {
    return {
      __args: {
        driveId,
        docId,
        input,
      },
    };
  };
};

export abstract class AtlasBaseClient<
  ScopeType extends AtlasStateType,
  WriteClientType extends WriteClientBase,
> extends DocumentClient<ScopeType, ViewNodeExtended> {
  protected readonly writeClient: WriteClientType;

  constructor(
    documentType: string,
    mutationsSubgraphUrl: string,
    documentsCache: DocumentsCache,
    readClient: ReactorClient,
    writeClient: WriteClientType,
  ) {
    super(documentType, documentsCache, readClient);
    this.writeClient = writeClient;
    this.writeClient.setUrl(mutationsSubgraphUrl);
  }

  protected getInputIdFromState(state: ScopeType): Maybe<string> {
    return state.notionId;
  }

  protected getNameFromState(state: ScopeType): Maybe<string> {
    return state.name;
  }

  protected getNameFromInput(documentNode: ViewNodeExtended): Maybe<string> {
    return getNodeTitle(documentNode);
  }

  protected getInputIdFromInput(documentNode: ViewNodeExtended): Maybe<string> {
    return documentNode.id;
  }

  protected async patchDocumentState(
    id: string,
    current: AtlasStateType,
    target: AtlasStateType,
  ): Promise<boolean> {
    let result = true;
    const stateFields = Object.keys(target) as (keyof AtlasStateType)[];

    for (const key of stateFields) {
      if (!_.isEqual(target[key], current[key])) {
        try {
          await this.patchField(id, key, current[key], target[key]);
        } catch (e) {
          console.log(e);
          result = false;
        }
      }
    }

    return result;
  }

  protected abstract patchField<K extends keyof AtlasStateType>(
    id: string,
    fieldName: K,
    current: AtlasStateType[K],
    target: AtlasStateType[K],
  ): Promise<void>;
  
  public abstract canHandle(node: ViewNodeExtended): boolean;
}
