import type {
  AtlasExploratoryState,
  DocumentInfo,
  EAtlasType,
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
} from "../atlas-base/utils.js";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";
import { ViewNode } from "@powerhousedao/sky-atlas-notion-data";
import { NotionConverter } from 'notion-to-md';

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

  protected createDocumentFromInput(documentNode: ViewNode) {
    return this.writeClient.mutations.AtlasExploratory_createDocument({
      __args: { driveId: this.driveId, name: getNodeTitle(documentNode) },
    });
  }

  protected getTargetState(
    input: ViewNode,
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
      // TODO: extract masterStatus from the view node
      // masterStatus: input.masterStatusNames[0]?.toUpperCase() || "PLACEHOLDER",
      // TODO: implement content converting the notion content to markdown
      // content: input.content
      //   .map((c) => pndContentToString(c))
      //   .join("\n")
      //   .trim(),
      atlasType,
      notionId: input.id,
      parent: parent?.id || "",
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
        throw new Error("globalTags patcher is not implemented yet.");
        break;
      case "originalContextData":
        throw new Error("originalContextData patcher is not implemented yet.");
        break;
      case "parent":
        if (!target) {
          throw new Error("Parent is not found");
        }
        const parsedTarget = target as string;
        await patch.AtlasExploratory_setParent(
          arg<SetParentInput>({ parent: parsedTarget }),
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

  public canHandle(node: ViewNode): boolean {
    return ["scenario", "scenarioVariation"].includes(node.type);
  }
}
