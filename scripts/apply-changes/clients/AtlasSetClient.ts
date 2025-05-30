import type {
  SetSetNameInput,
  SetNotionIdInput,
  AtlasSetState,
  SetSetParentInput,
  SetDocumentLink,
} from "../../../document-models/atlas-set/index.js";
import { AtlasBaseClient, mutationArg } from "../atlas-base/AtlasBaseClient.js";
import { graphqlClient as writeClient } from "../../clients/index.js";
import { gql } from "graphql-request";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { ReactorClient } from "../common/ReactorClient.js";
import { ViewNodeExtended } from "@powerhousedao/sky-atlas-notion-data";
import { getNodeName } from "../../../document-models/utils.js";
import { findAtlasParentInCache, Link } from "../atlas-base/utils.js";
import { Maybe } from "document-model";

const DOCUMENT_TYPE = "sky/atlas-set";

export class AtlasSetClient extends AtlasBaseClient<
  AtlasSetState,
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
      AtlasSet {
        id
        name
        state {
          name
          parent {
            id
            title
            documentType
            icon
          }
          notionId
        }
        revision
      }
    `);
  }

  protected createDocumentFromInput(documentNode: ViewNodeExtended) {
    return this.writeClient.mutations.AtlasSet_createDocument({
      __args: { driveId: this.driveId, name: getNodeName(documentNode) },
    });
  }

  protected getTargetState(
    input: ViewNodeExtended,
    currentState: AtlasSetState
  ): AtlasSetState {
    const parentLink = findAtlasParentInCache(
      input,
      this.documentsCache
    )!;

    const parent: Maybe<SetDocumentLink> = parentLink
      ? {
          id: parentLink.id,
          title: parentLink.title ?? "",
          documentType: parentLink.documentType ?? "",
          icon: parentLink.icon ?? "",
        }
      : null;

    return {
      ...currentState,
      name: getNodeName(input),
      notionId: input.id,
      parent,
    };
  }

  protected async patchField<K extends keyof AtlasSetState>(
    id: string,
    fieldName: K,
    current: AtlasSetState[K],
    target: AtlasSetState[K]
  ) {
    console.log(` > ${fieldName}: ${current ? current + " " : ""}> ${target}`);
    const patch = this.writeClient.mutations,
      arg = mutationArg(this.driveId, id);

    switch (fieldName) {
      case "name":
        await patch.AtlasSet_setSetName(
          arg<SetSetNameInput>({ name: target as string })
        );
        break;
      case "parent":
        if (!target) {
          throw new Error("Parent is not found");
        }
        await patch.AtlasSet_setSetParent(arg<SetSetParentInput>(target as SetDocumentLink));
        break;
      case "notionId":
        await patch.AtlasSet_setNotionId(
          arg<SetNotionIdInput>({ notionId: target as string })
        );
        break;
    }
  }

  public canHandle(node: ViewNodeExtended): boolean {
    return node.type === "category";
  }
}
