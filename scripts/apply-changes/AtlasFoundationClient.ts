import {
  type AtlasFoundationState,
  type FDocumentLink,
  type FStatus,
  type Maybe,
  type SetContentInput,
  type SetDocNumberInput,
  type SetFoundationNameInput,
  type SetParentInput,
  type SetProvenanceInput,
} from "document-models/atlas-foundation/index.js";
import { gql } from "graphql-request";
import {
  getPNDTitle,
  pndContentToString,
} from "../../document-models/utils.js";
import { graphqlClient as writeClient } from "../clients/index.js";
import { AtlasBaseClient, mutationArg } from "./atlas-base/AtlasBaseClient.js";
import { type ParsedNotionDocument } from "./atlas-base/NotionTypes.js";
import {
  extractDocNoAndTitle,
  findAtlasParentInCache,
} from "./atlas-base/utils.js";
import { type DocumentsCache } from "./common/DocumentsCache.js";
import { type ReactorClient } from "./common/ReactorClient.js";

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
            name
            docNo
          }
          masterStatus
          atlasType
          content
          globalTags
          notionId
          references {
            id
            name
            docNo
          }
          originalContextData {
            id
            name
            docNo
          }
          provenance
        }
        revision
      }
    `);
  }

  protected createDocumentFromInput(notionDoc: ParsedNotionDocument) {
    return this.writeClient.mutations.AtlasFoundation_createDocument({
      __args: { driveId: this.driveId, name: getPNDTitle(notionDoc) },
    });
  }

  protected getTargetState(
    input: ParsedNotionDocument,
    currentState: AtlasFoundationState,
  ): AtlasFoundationState {
    const [docNo, title] = extractDocNoAndTitle(input.docNo, input.name);
    // @ts-expect-error
    const parent: Maybe<FDocumentLink> = findAtlasParentInCache(
      input,
      this.documentsCache,
    );

    return {
      ...currentState,
      docNo,
      name: title,
      /* @ts-expect-error */
      masterStatus: input.masterStatusNames[0]?.toUpperCase() || "PLACEHOLDER",
      content: input.content
        .map((c) => pndContentToString(c))
        .join("\n")
        .trim(),
      notionId: input.id,
      provenance: input.hubUrls,
      parent,
    };
  }

  protected async patchField<K extends keyof AtlasFoundationState>(
    id: string,
    fieldName: K,
    current: AtlasFoundationState[K],
    target: AtlasFoundationState[K],
  ) {
    console.log(` > ${fieldName}: ${current ? current + " " : ""}> ${target}`);
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
      case "provenance":
        await patch.AtlasFoundation_setProvenance(
          /* @ts-expect-error */
          arg<SetProvenanceInput>({ provenance: target }),
        );
        break;
      case "parent":
        await patch.AtlasFoundation_setParent(
          /* @ts-expect-error */
          arg<SetParentInput>({ ...target }),
        );
        break;
      default:
        throw new Error(`Patcher for field ${fieldName} not implemented`);
    }
  }
}
