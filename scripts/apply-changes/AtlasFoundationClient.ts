import {
  type AtlasFoundationState,
  type FDocumentLink,
  type FStatus,
  type Maybe,
  type SetContentInput,
  type SetDocNumberInput,
  type SetFoundationNameInput,
  type SetParentInput,
} from "document-models/atlas-foundation/index.js";
import { gql } from "graphql-request";
import {
  getNodeDocNo,
  getNodeName,
  getNodeTitle,
} from "../../document-models/utils.js";
import { graphqlClient as writeClient } from "../clients/index.js";
import { AtlasBaseClient, mutationArg } from "./atlas-base/AtlasBaseClient.js";
import {
  findAtlasParentInCache,
} from "./atlas-base/utils.js";
import { type DocumentsCache } from "./common/DocumentsCache.js";
import { type ReactorClient } from "./common/ReactorClient.js";
import { ViewNode } from "@powerhousedao/sky-atlas-notion-data";
import { NotionConverter } from 'notion-to-md';

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

  protected createDocumentFromInput(documentNode: ViewNode) {
    return this.writeClient.mutations.AtlasFoundation_createDocument({
      __args: { driveId: this.driveId, name: getNodeTitle(documentNode) },
    });
  }

  protected getTargetState(
    input: ViewNode,
    currentState: AtlasFoundationState,
  ): AtlasFoundationState {
    // @ts-expect-error
    const parent: Maybe<FDocumentLink> = findAtlasParentInCache(
      input,
      this.documentsCache,
    );
    
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
      notionId: input.id,
      parent,
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
        throw new Error("globalTags patcher is not implemented yet.");
        break;
      case "originalContextData":
        throw new Error("originalContextData patcher is not implemented yet.");
        break;
      case "parent":
        if (!target) {
          throw new Error("Parent is not found");
        }
        const parsedTarget = target as FDocumentLink;
        await patch.AtlasFoundation_setParent(
          arg<SetParentInput>(parsedTarget),
        );
        break;
      default:
        throw new Error(`Patcher for field ${fieldName} not implemented`);
    }
  }
}
