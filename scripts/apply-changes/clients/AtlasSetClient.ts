import type { SetSetNameInput, AtlasSetState } from "../../../document-models/atlas-set/index.js";
import { AtlasBaseClient, mutationArg } from "../atlas-base/AtlasBaseClient.js";
import { graphqlClient as writeClient } from "../../clients/index.js";
import { gql } from "graphql-request";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { ReactorClient } from "../common/ReactorClient.js";
import { ViewNode } from "@powerhousedao/sky-atlas-notion-data";
import { getNodeName } from "../../../document-models/utils.js";
import { AtlasScopeState } from "../../../document-models/atlas-scope/index.js";

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
      __args: { driveId: this.driveId, name: getNodeName(documentNode) },
    });
  }

  protected getTargetState(
    input: ViewNode,
    currentState: AtlasScopeState,
  ): AtlasScopeState {
    return {
        ...currentState,
        name: getNodeName(input),
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
      case "name":
        await patch.AtlasScope_setName(arg<SetSetNameInput>({ name: target as string }));
        break;
    }
  }
}
