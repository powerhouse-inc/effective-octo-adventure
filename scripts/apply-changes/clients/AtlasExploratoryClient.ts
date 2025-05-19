import type {
  AtlasExploratoryState,
  EAtlasType,
  EGlobalTag,
  EStatus,
  Maybe,
  SetContentInput,
  SetDocNumberInput,
  SetExploratoryNameInput,
  SetParentInput,
} from "document-models/atlas-exploratory/index.js";
import { gql } from "graphql-request";
import {
  getNodeDocNo,
  getNodeName,
  getNodeTitle,
} from "../../../document-models/utils.js";
import { graphqlClient as writeClient } from "../../clients/index.js";
import { AtlasBaseClient, mutationArg } from "../atlas-base/AtlasBaseClient.js";
import {
  findAtlasParentInCache,
  Link,
  processMarkdownContent,
  statusStringToEnum,
} from "../atlas-base/utils.js";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";
import { ViewNodeExtended } from "@powerhousedao/sky-atlas-notion-data";

const DOCUMENT_TYPE = "sky/atlas-exploratory";

export class AtlasExploratoryClient extends AtlasBaseClient<
  AtlasExploratoryState,
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
      AtlasExploratory {
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

  protected createDocumentFromInput(documentNode: ViewNodeExtended) {
    return this.writeClient.mutations.AtlasExploratory_createDocument({
      __args: { driveId: this.driveId, name: getNodeTitle(documentNode) },
    });
  }

  protected getTargetState(
    input: ViewNodeExtended,
    currentState: AtlasExploratoryState,
  ): AtlasExploratoryState {
    const parent: Maybe<Link> = findAtlasParentInCache(
      input,
      this.documentsCache,
    );

    let atlasType: EAtlasType;
    switch (input.type) {
      case "scenario":
        atlasType = "SCENARIO";
        break;
      case "scenarioVariation":
        atlasType = "SCENARIO_VARIATION";
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
      ) as EStatus,
      content: processMarkdownContent(input.markdownContent),
      atlasType,
      notionId: input.id,
      parent: {
        id: parent?.id || "",
        title: parent?.title || "",
        docNo: parent?.docNo || "",
        documentType: "",
        icon: "",
      },
      globalTags: input.globalTags as EGlobalTag[],
      originalContextData: input.originalContextData
    };
  }

  protected async patchField<K extends keyof AtlasExploratoryState>(
    id: string,
    fieldName: K,
    current: AtlasExploratoryState[K],
    target: AtlasExploratoryState[K],
  ) {
    console.log(` > ${fieldName}: ${current ? JSON.stringify(current) : ""} > ${target ? JSON.stringify(target) : ""}`);
    const patch = this.writeClient.mutations,
      arg = mutationArg(this.driveId, id);

    switch (fieldName) {
      case "docNo":
        await patch.AtlasExploratory_setDocNumber(
          arg<SetDocNumberInput>({ docNo: target as string }),
        );
        break;
      case "name":
        await patch.AtlasExploratory_setExploratoryName(
          arg<SetExploratoryNameInput>({ name: target as string }),
        );
        break;
      case "masterStatus":
        await patch.AtlasExploratory_setMasterStatus(
          arg<any>({ masterStatus: target as EStatus }),
        );
        break;
      case "content":
        await patch.AtlasExploratory_setContent(
          arg<SetContentInput>({ content: target as string }),
        );
        break;
      case "notionId":
        await patch.AtlasExploratory_setNotionId(
          arg<any>({ notionID: target || undefined }),
        );
        break;
      case "globalTags":
        await patch.AtlasExploratory_addTags(
          arg<any>({ newTags: target as EGlobalTag[] }),
        );
        break;
      case "originalContextData": {
        if (target && Array.isArray(target) && target.length > 0) {
          await Promise.all(
            target.map(async (contextData) => {
              await patch.AtlasExploratory_addContextData(
                arg<any>({ id: contextData }),
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
        const parsedTarget = target as string;
        await patch.AtlasExploratory_setParent(
          arg<SetParentInput>({ 
            id: parsedTarget,
            title: parsedTarget,
            docNo: parsedTarget,
           }),
        );
        break;
      case "atlasType":
        await patch.AtlasExploratory_setAtlasType(
          arg<any>({ atlasType: target as EAtlasType }),
        );
        break;
      default:
        throw new Error(`Patcher for field ${fieldName} not implemented`);
    }
  }

  public canHandle(node: ViewNodeExtended): boolean {
    return ["scenario", "scenarioVariation"].includes(node.type);
  }
}
