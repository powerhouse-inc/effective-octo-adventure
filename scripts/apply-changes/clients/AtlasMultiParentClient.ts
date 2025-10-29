import type {
  AtlasMultiParentState,
  MStatus,
  SetContentInput,
  AddParentInput,
  SetExploratoryNameInput,
  MDocumentLink,
  MAtlasType,
} from "document-models/atlas-multi-parent/index.js";
import { actions } from "document-models/atlas-multi-parent/index.js";
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
  processMarkdownContent,
  statusStringToEnum,
} from "../atlas-base/utils.js";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import type { ReactorAdapter } from "../adapters/ReactorAdapter.js";
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
      AtlasMultiParent {
        id
        name
        state {
          name
          parents {
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
    currentState: AtlasMultiParentState
  ): AtlasMultiParentState {
    const parent = findAtlasParentInCache(
      input,
      this.documentsCache,
    )! as MDocumentLink;

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
      content: processMarkdownContent(input.markdownContent),
      atlasType,
      notionId: input.id,
      globalTags: input.globalTags,
      originalContextData: input.originalContextData,
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

    switch (fieldName) {
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
          actions.setMasterStatus({ masterStatus: target as MStatus })
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
        if (typeof target === 'string') {
          await this.addActionViaAdapter(
            this.driveId,
            id,
            actions.setNotionId({ notionId: target })
          );
        }
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
                actions.addContextData({ id: contextDataIdToUrl(contextData as string) })
              );
            })
          );
        }
        break;
      case "parents":
        if (!target || target.length === 0) {
          throw new Error("Parent is not found");
        }
        const parsedTarget = target as unknown as MDocumentLink[];
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.addParent(parsedTarget[0])
        );
        break;
      case "atlasType":
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setAtlasType({ atlasType: target as MAtlasType })
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
