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
import { actions } from "document-models/atlas-exploratory/index.js";
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
    adapter: ReactorAdapter,
    driveId: string,
  ) {
    super(
      DOCUMENT_TYPE,
      mutationsSubgraphUrl,
      documentsCache,
      adapter,
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

  protected async createDocumentFromInput(documentNode: ViewNodeExtended) {
    return this.createDocumentViaAdapter(this.driveId, getNodeTitle(documentNode));
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
          actions.setExploratoryName({ name: target as string })
        );
        break;
      case "masterStatus":
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setMasterStatus({ masterStatus: target as EStatus })
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
          actions.setNotionId({ notionID: typeof target === 'string' ? target : undefined })
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
      case "parent":
        if (!target || !("id" in target)) {
          throw new Error("Parent is not found");
        }
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setParent(target as EDocumentLink)
        );
        break;
      case "atlasType":
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setAtlasType({ atlasType: target as EAtlasType })
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
