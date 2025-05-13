import type {
  AtlasMultiParentState,
  MStatus,
  SetContentInput,
  AddParentInput,
  SetExploratoryNameInput,
  MDocumentLink,
  MAtlasType,
  MGlobalTag,
} from "../../../document-models/atlas-multi-parent/index.js";
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
import { Maybe } from "document-model";

const DOCUMENT_TYPE = "sky/atlas-multiparent";

export class AtlasMultiParentClient extends AtlasBaseClient<
  AtlasMultiParentState,
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
      AtlasMultiParent {
        id
        name
        state {
          name
          parents {
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
    return this.writeClient.mutations.AtlasMultiParent_createDocument({
      __args: { driveId: this.driveId, name: getNodeTitle(documentNode) },
    });
  }

  protected getTargetState(
    input: ViewNodeExtended,
    currentState: AtlasMultiParentState
  ): AtlasMultiParentState {
    // @ts-expect-error
    const parent: Maybe<MDocumentLink> = findAtlasParentInCache(
      input,
      this.documentsCache,
    );

    let atlasType: MAtlasType;
    switch (input.type) {
      case "annotation":
        atlasType = "ANNOTATION";
        break;
      case "neededResearch":
        atlasType = "NEEDED_RESEARCH";
        break;
      default:
        throw new Error(`Unsupported atlas type: ${input.type}`);
    }

    return {
      ...currentState,
      name: getNodeName(input),
      masterStatus: statusStringToEnum(
        input.masterStatus || "Placeholder"
      ) as MStatus,
      content: contentToMarkdown(input.markdownContent),
      atlasType,
      notionId: input.id,
      globalTags: input.globalTags as MGlobalTag[],
      originalContextData: input.originalContextData.map((contextData) => ({
        id: contextData,
        // TODO: add correct title and docNo
        title: "",
        docNo: "",
        documentType: "",
      })),
      parents: parent ? [parent]: [] ,
    };
  }

  protected async patchField<K extends keyof AtlasMultiParentState>(
    id: string,
    fieldName: K,
    current: AtlasMultiParentState[K],
    target: AtlasMultiParentState[K]
  ) {
    console.log(
      ` > ${fieldName}: ${current ? JSON.stringify(current) : ""} > ${target ? JSON.stringify(target) : ""}`
    );
    const patch = this.writeClient.mutations,
      arg = mutationArg(this.driveId, id);

    switch (fieldName) {
      case "name":
        await patch.AtlasMultiParent_setExploratoryName(
          arg<SetExploratoryNameInput>({ name: target as string })
        );
        break;
      case "masterStatus":
        await patch.AtlasMultiParent_setMasterStatus(
          arg<any>({ masterStatus: target as MStatus })
        );
        break;
      case "content":
        await patch.AtlasMultiParent_setContent(
          arg<SetContentInput>({ content: target as string })
        );
        break;
      case "notionId":
        await patch.AtlasMultiParent_setNotionId(
          arg<any>({ notionId: target || undefined })
        );
        break;
      case "globalTags":
        await patch.AtlasMultiParent_addTags(
          arg<any>({ newTags: target as MGlobalTag[] })
        );
        break;
      case "originalContextData": {
        if (target && Array.isArray(target) && target.length > 0) {
          await Promise.all(
            (target as MDocumentLink[]).map(async (contextData) => {
              await patch.AtlasMultiParent_addContextData(
                arg<any>({ id: contextData.id })
              );
            })
          );
        }
        break;
      }
      case "parents":
        if (!target || target.length === 0) {
          throw new Error("Parent is not found");
        }
        const parsedTarget = target as unknown as MDocumentLink[];
        await patch.AtlasMultiParent_addParent(
          arg<AddParentInput>(parsedTarget[0])
        );
        break;
      case "atlasType":
        await patch.AtlasMultiParent_setAtlasType(
          arg<any>({ atlasType: target as MAtlasType })
        );
        break;
      default:
        throw new Error(`Patcher for field ${fieldName} not implemented`);
    }
  }

  public canHandle(node: ViewNodeExtended): boolean {
    return ["annotation", "neededResearch"].includes(node.type);
  }
}
