import {
  AtlasGroundingState,
  GAtlasType,
  GDocumentLink,
  GGlobalTag,
  GStatus,
  SetContentInput,
  SetDocNumberInput,
  SetGroundingNameInput,
  SetParentInput,
} from "../../../document-models/atlas-grounding/index.js";
import { gql } from "graphql-request";
import {
  getNodeDocNo,
  getNodeName,
  getNodeTitle,
} from "../../../document-models/utils.js";
import { graphqlClient as writeClient } from "../../clients/index.js";
import { AtlasBaseClient, mutationArg } from "../atlas-base/AtlasBaseClient.js";
import { contentToMarkdown, findAtlasParentInCache, statusStringToEnum } from "../atlas-base/utils.js";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";
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
    driveId: string
  ) {
    super(
      DOCUMENT_TYPE,
      mutationsSubgraphUrl,
      documentsCache,
      readClient,
      writeClient
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
          }
          masterStatus
          atlasType
          content
          globalTags
          notionId
          originalContextData {
            id
            title
            docNo
          }
        }
        revision
      }
    `);
  }

  protected createDocumentFromInput(documentNode: ViewNodeExtended) {
    return this.writeClient.mutations.AtlasGrounding_createDocument({
      __args: { driveId: this.driveId, name: getNodeTitle(documentNode) },
    });
  }

  protected getTargetState(
    input: ViewNodeExtended,
    currentState: AtlasGroundingState
  ): AtlasGroundingState {
    // @ts-expect-error
    const parent: Maybe<GDocumentLink> = findAtlasParentInCache(
      input,
      this.documentsCache
    );

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
      content: contentToMarkdown(input.markdownContent),
      atlasType,
      notionId: input.id,
      parent,
      globalTags: input.globalTags as GGlobalTag[],
      originalContextData: input.originalContextData.map((contextData) => ({
        id: contextData,
        // TODO: add correct title and docNo
        title: "",
        docNo: "",
        documentType: "",
      })),
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
    const patch = this.writeClient.mutations,
      arg = mutationArg(this.driveId, id);

    switch (fieldName) {
      case "docNo":
        await patch.AtlasGrounding_setDocNumber(
          arg<SetDocNumberInput>({ docNo: target as string })
        );
        break;
      case "name":
        await patch.AtlasGrounding_setGroundingName(
          arg<SetGroundingNameInput>({ name: target as string })
        );
        break;
      case "masterStatus":
        await patch.AtlasGrounding_setMasterStatus(
          arg<any>({ masterStatus: target as GStatus })
        );
        break;
      case "content":
        await patch.AtlasGrounding_setContent(
          arg<SetContentInput>({ content: target as string })
        );
        break;
      case "notionId":
        await patch.AtlasGrounding_setNotionId(
          arg<any>({ notionID: target || undefined })
        );
        break;
      case "globalTags":
        await patch.AtlasGrounding_addTags(
          arg<any>({ newTags: target as GGlobalTag[] })
        );
        break;
      case "originalContextData": {
        if (target && Array.isArray(target) && target.length > 0) {
          await Promise.all(
            (target as GDocumentLink[]).map(async (contextData) => {
              await patch.AtlasGrounding_addContextData(
                arg<any>({ id: contextData.id })
              );
            })
          );
        }
        break;
      }
      case "parent":
        if (!target) {
          throw new Error("Parent is not found");
        }
        const parsedTarget = target as GDocumentLink;
        await patch.AtlasGrounding_setParent(arg<SetParentInput>(parsedTarget));
        break;
      case "atlasType":
        await patch.AtlasGrounding_setAtlasType(
          arg<any>({ atlasType: target as GAtlasType }),
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
