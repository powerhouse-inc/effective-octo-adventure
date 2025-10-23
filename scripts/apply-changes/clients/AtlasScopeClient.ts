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
  actions,
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
    return this.createDocumentViaAdapter(this.driveId, getNodeTitle(documentNode));
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

    switch (fieldName) {
      case "docNo":
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setDocNumber({ docNo: target as string })
        );
        break;
      case "name":
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setScopeName({ name: target as string })
        );
        break;
      case "masterStatus":
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setMasterStatus({ masterStatus: target as Status })
        );
        break;
      case "content":
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setContent({ content: target as string })
        );
        break;
      case "notionId":
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setNotionId({ notionID: target || undefined })
        );
        break;
      case "globalTags":
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.addTags({ newTags: target as string[] })
        );
        break;
      case "originalContextData":
        if (target && Array.isArray(target) && target.length > 0) {
          await Promise.all(
            target.map(async (contextData) => {
              await this.addActionViaAdapter(
                this.driveId,
                id,
                actions.addContextData({ id: contextDataIdToUrl(contextData) })
              );
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
