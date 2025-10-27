import type {
  SetSetNameInput,
  SetNotionIdInput,
  AtlasSetState,
  SetSetParentInput,
  SetDocumentLink,
} from "../../../document-models/atlas-set/index.js";
import { actions } from "../../../document-models/atlas-set/index.js";
import { AtlasBaseClient, mutationArg } from "../atlas-base/AtlasBaseClient.js";
import { graphqlClient as writeClient } from "../../clients/index.js";
import { gql } from "graphql-request";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import type { ReactorAdapter } from "../adapters/ReactorAdapter.js";
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

  protected async createDocumentFromInput(documentNode: ViewNodeExtended) {
    return this.createDocumentViaAdapter(this.driveId, getNodeName(documentNode));
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

    switch (fieldName) {
      case "name":
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setSetName({ name: target as string })
        );
        break;
      case "parent":
        if (!target) {
          throw new Error("Parent is not found");
        }
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setSetParent(target as SetDocumentLink)
        );
        break;
      case "notionId":
        await this.addActionViaAdapter(
          this.driveId,
          id,
          actions.setNotionId({ notionId: target as string })
        );
        break;
    }
  }

  public canHandle(node: ViewNodeExtended): boolean {
    return node.type === "category";
  }
}
