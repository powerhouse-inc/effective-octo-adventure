import {
  FAtlasType,
  FGlobalTag,
  type AtlasFoundationState,
  type FDocumentLink,
  type FStatus,
  type Maybe,
  type SetContentInput,
  type SetDocNumberInput,
  type SetFoundationNameInput,
  type SetParentInput,
} from "../../../document-models/atlas-foundation/index.js";
import { gql } from "graphql-request";
import {
  getNodeDocNo,
  getNodeName,
  getNodeTitle,
} from "../../../document-models/utils.js";
import { graphqlClient as writeClient } from "../../clients/index.js";
import { AtlasBaseClient, mutationArg } from "../atlas-base/AtlasBaseClient.js";
import {
  contentToMarkdown,
  findAtlasParentInCache,
  statusStringToEnum,
} from "../atlas-base/utils.js";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";
import { ViewNodeExtended } from "@powerhousedao/sky-atlas-notion-data";

const DOCUMENT_TYPE = "sky/atlas-foundation";

export class AtlasFoundationClient extends AtlasBaseClient<
  AtlasFoundationState,
  typeof writeClient
> {
  private readonly driveId: string;

  constructor(
    mutationsSubgraphUrl: string,
    documentsCache: DocumentsCache,
    readClient: ReactorClient,
    driveId: string,
  ) {
    super(
      DOCUMENT_TYPE,
      mutationsSubgraphUrl,
      documentsCache,
      readClient,
      writeClient,
    );
    this.driveId = driveId;
    this.setDocumentSchema(gql`
      AtlasFoundation {
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
    return this.writeClient.mutations.AtlasFoundation_createDocument({
      __args: { driveId: this.driveId, name: getNodeTitle(documentNode) },
    });
  }

  protected getTargetState(
    input: ViewNodeExtended,
    currentState: AtlasFoundationState,
  ): AtlasFoundationState {
    // @ts-expect-error
    const parent: Maybe<FDocumentLink> = findAtlasParentInCache(
      input,
      this.documentsCache,
    );

    let atlasType: FAtlasType;
    switch (input.type) {
      case "activeDataController":
        atlasType = "ACTIVE_DATA_CONTROLLER";
        break;
      case "article":
        atlasType = "ARTICLE";
        break;
      case "core":
        atlasType = "CORE";
        break;
      case "section":
        atlasType = "SECTION";
        break;
      default:
        throw new Error(`Unsupported atlas type: ${input.type}`);
    }
    return {
      ...currentState,
      ...currentState,
      docNo: getNodeDocNo(input),
      name: getNodeName(input),
      masterStatus: statusStringToEnum(
        input.masterStatus || "Placeholder",
      ) as FStatus,
      content: contentToMarkdown(input.markdownContent),
      atlasType,
      notionId: input.id,
      parent,
      globalTags: input.globalTags as FGlobalTag[],
      originalContextData: input.originalContextData.map((contextData) => ({
        id: contextData,
        // TODO: add correct title and docNo
        title: "",
        docNo: "",
        documentType: "",
      })),
    };
  }

  protected async patchField<K extends keyof AtlasFoundationState>(
    id: string,
    fieldName: K,
    current: AtlasFoundationState[K],
    target: AtlasFoundationState[K],
  ) {
    console.log(` > ${fieldName}: ${current ? JSON.stringify(current) : ""} > ${target ? JSON.stringify(target) : ""}`);
    const patch = this.writeClient.mutations,
      arg = mutationArg(this.driveId, id);

    switch (fieldName) {
      case "docNo":
        await patch.AtlasFoundation_setDocNumber(
          arg<SetDocNumberInput>({ docNo: target as string }),
        );
        break;
      case "name":
        await patch.AtlasFoundation_setFoundationName(
          arg<SetFoundationNameInput>({ name: target as string }),
        );
        break;
      case "masterStatus":
        await patch.AtlasFoundation_setMasterStatus(
          arg<any>({ masterStatus: target as FStatus }),
        );
        break;
      case "content":
        await patch.AtlasFoundation_setContent(
          arg<SetContentInput>({ content: target as string }),
        );
        break;
      case "notionId":
        await patch.AtlasFoundation_setNotionId(
          arg<any>({ notionID: target || undefined }),
        );
        break;
      case "globalTags":
        await patch.AtlasFoundation_addTags(
          arg<any>({ newTags: target as FGlobalTag[] }),
        );
        break;
      case "originalContextData": {
        if (target && Array.isArray(target) && target.length > 0) {
          await Promise.all(
            (target as FDocumentLink[]).map(async (contextData) => {
              await patch.AtlasFoundation_addContextData(
                arg<any>({ id: contextData.id }),
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
        const parsedTarget = target as FDocumentLink;
        await patch.AtlasFoundation_setParent(
          arg<SetParentInput>(parsedTarget),
        );
        break;
      case "atlasType":
        await patch.AtlasFoundation_setAtlasType(
          arg<any>({ atlasType: target }),
        );
        break;
      default:
        throw new Error(`Patcher for field ${fieldName} not implemented`);
    }
  }

  public canHandle(node: ViewNodeExtended): boolean {
    return ["article", "section", "core", "activeDataController"].includes(
      node.type,
    );
  }
}
