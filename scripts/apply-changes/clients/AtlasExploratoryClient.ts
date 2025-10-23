import type {
  AtlasExploratoryState,
  EAtlasType,
  EDocumentLink,
  EStatus,
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
  contextDataIdToUrl,
  findAtlasParentInCache,
  Link,
  processMarkdownContent,
  statusStringToEnum,
} from "../atlas-base/utils.js";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";
import type { ReactorAdapter } from "../adapters/ReactorAdapter.js";
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

  protected async createDocumentFromInput(documentNode: ViewNodeExtended) {
    return this.executeMutationViaAdapter<string>(
      "AtlasExploratory_createDocument",
      { __args: { driveId: this.driveId, name: getNodeTitle(documentNode) } }
    );
  }

  protected getTargetState(
    input: ViewNodeExtended,
    currentState: AtlasExploratoryState,
  ): AtlasExploratoryState {
    const parent = findAtlasParentInCache(
      input,
      this.documentsCache,
    )!;

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
        id: parent.id,
        title: parent.title ?? "",
        docNo: parent.docNo ?? "",
        documentType: parent.documentType ?? "",
        icon: parent.icon ?? "",
      },
      globalTags: input.globalTags,
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
    const arg = mutationArg(this.driveId, id);

    switch (fieldName) {
      case "docNo":
        await this.executeMutationViaAdapter("AtlasExploratory_setDocNumber", arg<SetDocNumberInput>({ docNo: target as string }));
        break;
      case "name":
        await this.executeMutationViaAdapter("AtlasExploratory_setExploratoryName", arg<SetExploratoryNameInput>({ name: target as string }));
        break;
      case "masterStatus":
        await this.executeMutationViaAdapter("AtlasExploratory_setMasterStatus", arg<any>({ masterStatus: target as EStatus }));
        break;
      case "content":
        await this.executeMutationViaAdapter("AtlasExploratory_setContent", arg<SetContentInput>({ content: target as string }));
        break;
      case "notionId":
        await this.executeMutationViaAdapter("AtlasExploratory_setNotionId", arg<any>({ notionID: target || undefined }));
        break;
      case "globalTags":
        await this.executeMutationViaAdapter("AtlasExploratory_addTags", arg<any>({ newTags: target }));
        break;
      case "originalContextData":
        if (target && Array.isArray(target) && target.length > 0) {
          await Promise.all(
            target.map(async (contextData) => {
              await this.executeMutationViaAdapter("AtlasExploratory_addContextData", arg<any>({ id: contextDataIdToUrl(contextData) }));
            })
          );
        }
        break;
      case "parent":
        if (!target || !("id" in target)) {
          throw new Error("Parent is not found");
        }
        await this.executeMutationViaAdapter("AtlasExploratory_setParent", arg<SetParentInput>(target as EDocumentLink));
        break;
      case "atlasType":
        await this.executeMutationViaAdapter("AtlasExploratory_setAtlasType", arg<any>({ atlasType: target as EAtlasType }));
        break;
      default:
        throw new Error(`Patcher for field ${fieldName} not implemented`);
    }
  }

  public canHandle(node: ViewNodeExtended): boolean {
    return ["scenario", "scenarioVariation"].includes(node.type);
  }
}
