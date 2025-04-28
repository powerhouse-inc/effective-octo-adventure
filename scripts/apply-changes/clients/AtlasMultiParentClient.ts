import type {
  AtlasMultiParentState,
  MStatus,
  SetContentInput,
  AddParentInput,
  SetExploratoryNameInput,
  MDocumentLink
} from "document-models/atlas-multi-parent/index.js";
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
} from "../atlas-base/utils.js";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";
import { ViewNode } from "@powerhousedao/sky-atlas-notion-data";

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

  protected createDocumentFromInput(documentNode: ViewNode) {
    return this.writeClient.mutations.AtlasMultiParent_createDocument({
      __args: { driveId: this.driveId, name: getNodeTitle(documentNode) },
    });
  }

  protected getTargetState(
    input: ViewNode,
    currentState: AtlasMultiParentState,
  ): AtlasMultiParentState {
    // const parent: Maybe<MDocumentLink> = findAtlasParentInCache(
    //   input,
    //   this.documentsCache,
    // );
    
    return {
      ...currentState,
      name: getNodeName(input),
      // TODO: extract masterStatus from the view node
      // masterStatus: input.masterStatusNames[0]?.toUpperCase() || "PLACEHOLDER",
      // TODO: implement content converting the notion content to markdown
      // content: input.content
      //   .map((c) => pndContentToString(c))
      //   .join("\n")
      //   .trim(),
      notionId: input.id,
      // parents: [parent],
    };
  }

  protected async patchField<K extends keyof AtlasMultiParentState>(
    id: string,
    fieldName: K,
    current: AtlasMultiParentState[K],
    target: AtlasMultiParentState[K],
  ) {
    console.log(` > ${fieldName}: ${current ? JSON.stringify(current) : ""} > ${target ? JSON.stringify(target) : ""}`);
    const patch = this.writeClient.mutations,
      arg = mutationArg(this.driveId, id);

    switch (fieldName) {
      case "name":
        await patch.AtlasMultiParent_setExploratoryName(
          arg<SetExploratoryNameInput>({ name: target as string }),
        );
        break;
      case "masterStatus":
        await patch.AtlasMultiParent_setMasterStatus(
          arg<any>({ masterStatus: target as MStatus }),
        );
        break;
      case "content":
        await patch.AtlasMultiParent_setContent(
          arg<SetContentInput>({ content: target as string }),
        );
        break;
      case "notionId":
        await patch.AtlasMultiParent_setNotionId(
          arg<any>({ notionId: target || undefined }),
        );
        break;
      case "globalTags":
        throw new Error("globalTags patcher is not implemented yet.");
        break;
      case "originalContextData":
        throw new Error("originalContextData patcher is not implemented yet.");
        break;
      case "parents":
        if (!target) {
          throw new Error("Parent is not found");
        }
        const parsedTarget = target as unknown as MDocumentLink;
        await patch.AtlasMultiParent_addParent(
          arg<AddParentInput>(parsedTarget),
        );
        throw new Error("parents patcher is not implemented yet.");
        break;
      default:
        throw new Error(`Patcher for field ${fieldName} not implemented`);
    }
  }

  public canHandle(node: ViewNode): boolean {
    return ["annotation", "neededResearch"].includes(node.type);
  }
}
