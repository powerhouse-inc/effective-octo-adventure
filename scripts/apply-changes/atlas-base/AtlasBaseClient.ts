import { Maybe } from "document-model";
import { DocumentsCache } from "../common/DocumentsCache";
import { ReactorClient } from "../common/ReactorClient";
import { DocumentClient } from "../common/DocumentClient";
import { ParsedNotionDocument } from "./NotionTypes";
import { getPNDTitle } from "../../../document-models/utils";
import _ from "lodash";

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
> extends DocumentClient<ScopeType, ParsedNotionDocument> {
  protected readonly writeClient: WriteClientType;

  constructor(
    documentType: string,
    mutationsSubgraphUrl: string,
    documentsCache: DocumentsCache,
    readClient: ReactorClient,
    writeClient: WriteClientType,
  ) {
    super(documentType, documentsCache, readClient);
    // @ts-expect-error weird commonjs thing
    this.writeClient = writeClient.client ?? writeClient;
    this.writeClient.setUrl(mutationsSubgraphUrl);
  }

  protected getInputIdFromState(state: ScopeType): Maybe<string> {
    return state.notionId;
  }

  protected getNameFromState(state: ScopeType): Maybe<string> {
    return state.name;
  }

  protected getNameFromInput(notionDoc: ParsedNotionDocument): Maybe<string> {
    return getPNDTitle(notionDoc);
  }

  protected getInputIdFromInput(
    notionDoc: ParsedNotionDocument,
  ): Maybe<string> {
    return notionDoc.id;
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
}
