import {
  AtlasGroundingState,
  GDocumentLink,
  GStatus,
  SetContentInput,
  SetDocNumberInput,
  SetGroundingNameInput,
  SetParentInput,
} from "document-models/atlas-grounding/index.js";
import { gql } from "graphql-request";
import {
  getNodeDocNo,
  getNodeName,
  getNodeTitle,
} from "../../../document-models/utils.js";
import { graphqlClient as writeClient } from "../../clients/index.js";
import { AtlasBaseClient, mutationArg } from "../atlas-base/AtlasBaseClient.js";
import { findAtlasParentInCache } from "../atlas-base/utils.js";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";
import { ViewNode } from "@powerhousedao/sky-atlas-notion-data";

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

  protected createDocumentFromInput(documentNode: ViewNode) {
    return this.writeClient.mutations.AtlasGrounding_createDocument({
      __args: { driveId: this.driveId, name: getNodeTitle(documentNode) },
    });
  }

  protected getTargetState(
    input: ViewNode,
    currentState: AtlasGroundingState
  ): AtlasGroundingState {
    // @ts-expect-error
    const parent: Maybe<GDocumentLink> = findAtlasParentInCache(
      input,
      this.documentsCache
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
        throw new Error("globalTags patcher is not implemented yet.");
        break;
      case "originalContextData":
        throw new Error("originalContextData patcher is not implemented yet.");
        break;
      case "parent":
        if (!target) {
          throw new Error("Parent is not found");
        }
        const parsedTarget = target as GDocumentLink;
        await patch.AtlasGrounding_setParent(arg<SetParentInput>(parsedTarget));
        break;
      default:
        throw new Error(`Patcher for field ${fieldName} not implemented`);
    }
  }
}
