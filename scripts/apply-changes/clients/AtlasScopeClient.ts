import { gql } from "graphql-request";
import { graphqlClient as writeClient } from "../../clients/index.js";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";

import {
  AtlasScopeState,
  type SetContentInput,
  type SetDocNumberInput,
  type SetScopeNameInput,
} from "../../../document-models/atlas-scope/index.js";
import {
  getNodeDocNo,
  getNodeName,
  getNodeTitle,
} from "../../../document-models/utils.js";
import { AtlasBaseClient, mutationArg } from "../atlas-base/AtlasBaseClient.js";
import { ViewNode } from "@powerhousedao/sky-atlas-notion-data";

const DOCUMENT_TYPE = "sky/atlas-scope";

const statusStringToEnum = (status: string): string => {
  switch (status.toUpperCase()) {
    case "PLACEHOLDER":
      return "PLACEHOLDER";
    case "PROVISIONAL":
      return "PROVISIONAL";
    case "APPROVED":
      return "APPROVED";
    case "DEFERRED":
      return "DEFERRED";
    case "ARCHIVED":
      return "ARCHIVED";
    default:
      throw new Error("Unknown scope status: " + status);
  }
};

export class AtlasScopeClient extends AtlasBaseClient<
  AtlasScopeState,
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
      AtlasScope {
        id
        name
        state {
          docNo
          name
          masterStatus
          content
          globalTags
          notionId
        }
        revision
      }
    `);
  }

  protected createDocumentFromInput(documentNode: ViewNode) {
    return this.writeClient.mutations.AtlasScope_createDocument({
      __args: { driveId: this.driveId, name: getNodeTitle(documentNode) },
    });
  }

  protected getTargetState(
    input: ViewNode,
    currentState: AtlasScopeState,
  ): AtlasScopeState {
    return {
      ...currentState,
      docNo: getNodeDocNo(input),
      name: getNodeName(input),
      // TODO: extract masterStatus from the view node
      // masterStatus: statusStringToEnum(
      //   input.masterStatusNames[0] || "PLACEHOLDER",
      // ),
      // TODO: implement content converting the notion content to markdown
      content: "",
      // content: input.content
      //   .map((c) => pndContentToString(c))
      //   .join("\n")
      //   .trim(),
      notionId: input.id,
      //globalTags: [],
    };
  }

  protected async patchField<K extends keyof AtlasScopeState>(
    id: string,
    fieldName: K,
    current: AtlasScopeState[K],
    target: AtlasScopeState[K],
  ) {
    console.log(` > ${fieldName}: ${current ? current + " " : ""}> ${target}`);
    const patch = this.writeClient.mutations,
      arg = mutationArg(this.driveId, id);

    switch (fieldName) {
      case "docNo":
        await patch.AtlasScope_setDocNumber(
          arg<SetDocNumberInput>({ docNo: target as string }),
        );
        break;
      case "name":
        await patch.AtlasScope_setScopeName(
          arg<SetScopeNameInput>({ name: target as string }),
        );
        break;
      case "masterStatus":
        await patch.AtlasScope_setMasterStatus(
          arg<any>({ masterStatus: target as string }),
        );
        break;
      case "content":
        await patch.AtlasScope_setContent(
          arg<SetContentInput>({ content: target as string }),
        );
        break;
      case "notionId":
        await patch.AtlasScope_setNotionId(
          arg<any>({ notionID: target || undefined }),
        );
        break;
      case "globalTags":
        throw new Error("globalTags patcher is not implemented yet.");
        break;
      case "originalContextData":
        throw new Error("originalContextData patcher is not implemented yet.");
        break;
    }
  }

  public canHandle(node: ViewNode): boolean {
    return node.type === "scope";
  }
}
