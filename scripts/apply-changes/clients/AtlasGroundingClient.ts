import {
  AtlasGroundingState,
  GAtlasType,
  GDocumentLink,
  GStatus,
  SetContentInput,
  SetDocNumberInput,
  SetGroundingNameInput,
  SetParentInput,
  actions,
} from "document-models/atlas-grounding/index.js";
import { gql } from "graphql-request";
import {
  getNodeDocNo,
  getNodeName,
  getNodeTitle,
} from "../../../document-models/utils.js";
import { graphqlClient as writeClient } from "../../clients/index.js";
import { AtlasBaseClient, mutationArg } from "../atlas-base/AtlasBaseClient.js";
import { contextDataIdToUrl, findAtlasParentInCache, processMarkdownContent, statusStringToEnum } from "../atlas-base/utils.js";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";
import type { ReactorAdapter } from "../adapters/ReactorAdapter.js";
import { ViewNodeExtended } from "@powerhousedao/sky-atlas-notion-data";

const DOCUMENT_TYPE = "sky/atlas-grounding";

export class AtlasGroundingClient extends AtlasBaseClient<
  AtlasGroundingState,
  typeof writeClient
> {
  private readonly driveId: string;

  constructor(
    mutationsSubgraphUrl: string,
    documentsCache: DocumentsCache,
    readClient: ReactorClient,
    driveId: string,
    adapter?: ReactorAdapter,
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
      AtlasGrounding {
        id
        name
        state {
          docNo
          name
          parent {
            id
            title
            docNo
            documentType
            icon
          }
          masterStatus
          atlasType
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
    currentState: AtlasGroundingState
  ): AtlasGroundingState {
    const parent = findAtlasParentInCache(
      input,
      this.documentsCache
    )!;

    let atlasType: GAtlasType;
    switch (input.type) {
      case "activeData":
        atlasType = "ACTIVE_DATA";
        break;
      case "originalContextData":
        atlasType = "ORIGINAL_CONTEXT_DATA";
        break;
      case "tenet":
        atlasType = "TENET";
        break;
      default:
        throw new Error(`Unsupported atlas type: ${input.type}`);
    }

    return {
      ...currentState,
      docNo: getNodeDocNo(input),
      name: getNodeName(input),      
      masterStatus: statusStringToEnum(
        input.masterStatus || "Placeholder",
      ) as GStatus,
      content: processMarkdownContent(input.markdownContent),
      atlasType,
      notionId: input.id,
      parent: {
        id: parent.id,
        title: parent.title ?? "",
        docNo: parent.docNo ?? "",
        documentType: parent.documentType ?? "",
        icon: parent.icon ?? "",
      },
      globalTags: input.globalTags,
      originalContextData: input.originalContextData,
    };
  }

  protected async patchField<K extends keyof AtlasGroundingState>(
    id: string,
    fieldName: K,
    current: AtlasGroundingState[K],
    target: AtlasGroundingState[K]
  ) {
    console.log(
      ` > ${fieldName}: ${current ? JSON.stringify(current) : ""} > ${target ? JSON.stringify(target) : ""}`
    );

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
          actions.setGroundingName({ name: target as string })
        );
        break;
      case "masterStatus":
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setMasterStatus({ masterStatus: target as GStatus })
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
          actions.addTags({ tags: target as string[] })
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
      case "parent":
        if (!target) {
          throw new Error("Parent is not found");
        }
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setParent(target as GDocumentLink)
        );
        break;
      case "atlasType":
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setAtlasType({ atlasType: target as GAtlasType })
        );
        break;
      default:
        throw new Error(`Patcher for field ${fieldName} not implemented`);
    }
  }

  public canHandle(node: ViewNodeExtended): boolean {
    return ["tenet", "originalContextData", "activeData"].includes(node.type);
  }
}
