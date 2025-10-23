import { gql } from "graphql-request";
import { graphqlClient as writeClient } from "../../clients/index.js";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";

import {
  AtlasScopeState,
  Status,
  type SetContentInput,
  type SetDocNumberInput,
  type SetScopeNameInput,
} from "../../../document-models/atlas-scope/index.js";
import {
  getNodeDocNo,
  getNodeName,
  getNodeTitle,
} from "../../../document-models/utils.js";
import { AtlasBaseClient, mutationArg } from "../atlas-base/AtlasBaseClient.js";
import { ViewNodeExtended } from "@powerhousedao/sky-atlas-notion-data";
import { contextDataIdToUrl, processMarkdownContent, statusStringToEnum } from "../atlas-base/utils.js";

const DOCUMENT_TYPE = "sky/atlas-scope";

export class AtlasScopeClient extends AtlasBaseClient<
  AtlasScopeState,
  typeof writeClient
> {
  private readonly driveId: string;

  constructor(
    mutationsSubgraphUrl: string,
    documentsCache: DocumentsCache,
    readClient: ReactorClient,
    driveId: string,
    adapter?: import("../adapters/ReactorAdapter.js").ReactorAdapter,
  ) {
    super(
      DOCUMENT_TYPE,
      mutationsSubgraphUrl,
      documentsCache,
      readClient,
      writeClient,
      adapter,
    );
    this.driveId = driveId;
    this.setDocumentSchema(gql`
      AtlasScope {
        id
        name
        state {
          docNo
          name
          masterStatus
          content
          globalTags
          notionId
          originalContextData
        }
        revision
      }
    `);
  }

  protected async createDocumentFromInput(documentNode: ViewNodeExtended) {
    return this.executeMutationViaAdapter<string>(
      "AtlasScope_createDocument",
      { __args: { driveId: this.driveId, name: getNodeTitle(documentNode) } }
    );
  }

  protected getTargetState(
    input: ViewNodeExtended,
    currentState: AtlasScopeState
  ): AtlasScopeState {
    return {
      ...currentState,
      docNo: getNodeDocNo(input),
      name: getNodeName(input),
      masterStatus: statusStringToEnum(
        input.masterStatus || "Placeholder"
      ) as Status,
      content: processMarkdownContent(input.markdownContent),
      notionId: input.id,
      globalTags: input.globalTags,
      originalContextData: input.originalContextData,
    };
  }

  protected async patchField<K extends keyof AtlasScopeState>(
    id: string,
    fieldName: K,
    current: AtlasScopeState[K],
    target: AtlasScopeState[K]
  ) {
    console.log(` > ${fieldName}: ${current ? current + " " : ""}> ${target}`);
    const arg = mutationArg(this.driveId, id);

    switch (fieldName) {
      case "docNo":
        await this.executeMutationViaAdapter("AtlasScope_setDocNumber", arg<SetDocNumberInput>({ docNo: target as string }));
        break;
      case "name":
        await this.executeMutationViaAdapter("AtlasScope_setScopeName", arg<SetScopeNameInput>({ name: target as string }));
        break;
      case "masterStatus":
        await this.executeMutationViaAdapter("AtlasScope_setMasterStatus", arg<any>({ masterStatus: target as string }));
        break;
      case "content":
        await this.executeMutationViaAdapter("AtlasScope_setContent", arg<SetContentInput>({ content: target as string }));
        break;
      case "notionId":
        await this.executeMutationViaAdapter("AtlasScope_setNotionId", arg<any>({ notionID: target || undefined }));
        break;
      case "globalTags":
        await this.executeMutationViaAdapter("AtlasScope_addTags", arg<any>({ newTags: target }));
        break;
      case "originalContextData":
        if (target && Array.isArray(target) && target.length > 0) {
          await Promise.all(
            target.map(async (contextData) => {
              await this.executeMutationViaAdapter("AtlasScope_addContextData", arg<any>({ id: contextDataIdToUrl(contextData) }));
            })
          );
        }
        break;
    }
  }

  public canHandle(node: ViewNodeExtended): boolean {
    return node.type === "scope";
  }
}
