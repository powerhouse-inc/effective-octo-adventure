import { gql } from "graphql-request";
import { graphqlClient as writeClient } from "../../clients/index.js";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";

import {
  AtlasScopeState,
  GlobalTag,
  Status,
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
import { ViewNodeExtended } from "@powerhousedao/sky-atlas-notion-data";
import { statusStringToEnum } from "../atlas-base/utils.js";

const DOCUMENT_TYPE = "sky/atlas-scope";

export class AtlasScopeClient extends AtlasBaseClient<
  AtlasScopeState,
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
          originalContextData
        }
        revision
      }
    `);
  }

  protected createDocumentFromInput(documentNode: ViewNodeExtended) {
    return this.writeClient.mutations.AtlasScope_createDocument({
      __args: { driveId: this.driveId, name: getNodeTitle(documentNode) },
    });
  }

  protected getTargetState(
    input: ViewNodeExtended,
    currentState: AtlasScopeState
  ): AtlasScopeState {
    return {
      ...currentState,
      docNo: getNodeDocNo(input),
      name: getNodeName(input),
      masterStatus: statusStringToEnum(
        input.masterStatus || "Placeholder"
      ) as Status,
      content: input.markdownContent,
      notionId: input.id,
      globalTags: input.globalTags as GlobalTag[],
      originalContextData: input.originalContextData,
    };
  }

  protected async patchField<K extends keyof AtlasScopeState>(
    id: string,
    fieldName: K,
    current: AtlasScopeState[K],
    target: AtlasScopeState[K]
  ) {
    console.log(` > ${fieldName}: ${current ? current + " " : ""}> ${target}`);
    const patch = this.writeClient.mutations,
      arg = mutationArg(this.driveId, id);

    switch (fieldName) {
      case "docNo":
        await patch.AtlasScope_setDocNumber(
          arg<SetDocNumberInput>({ docNo: target as string })
        );
        break;
      case "name":
        await patch.AtlasScope_setScopeName(
          arg<SetScopeNameInput>({ name: target as string })
        );
        break;
      case "masterStatus":
        await patch.AtlasScope_setMasterStatus(
          arg<any>({ masterStatus: target as string })
        );
        break;
      case "content":
        await patch.AtlasScope_setContent(
          arg<SetContentInput>({ content: target as string })
        );
        break;
      case "notionId":
        await patch.AtlasScope_setNotionId(
          arg<any>({ notionID: target || undefined })
        );
        break;
      case "globalTags":
        await patch.AtlasScope_addTags(
          arg<any>({ newTags: target as GlobalTag[] })
        );
        break;
      case "originalContextData": {
        if (target && Array.isArray(target) && target.length > 0) {
          await Promise.all(
            target.map(async (contextData) => {
              await patch.AtlasScope_addContextData(
                arg<any>({ id: contextData })
              );
            })
          );
        }
        break;
      }
    }
  }

  public canHandle(node: ViewNodeExtended): boolean {
    return node.type === "scope";
  }
}
