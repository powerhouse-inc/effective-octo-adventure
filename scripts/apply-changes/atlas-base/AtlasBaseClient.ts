import { type Maybe, type BaseAction } from "document-model";
import { addFile } from "document-drive";
import { randomUUID } from "crypto";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";
import { DocumentClient } from "../common/DocumentClient.js";
// import { type ParsedNotionDocument } from "./NotionTypes.js";
import { getNodeTitle, getPNDTitle } from "../../../document-models/utils.js";
import _ from "lodash";
import { ViewNodeExtended } from "@powerhousedao/sky-atlas-notion-data";

// Helper to generate IDs (equivalent to document-model's generateId)
const generateId = (): string => randomUUID();

type WriteClientBase = {
  setUrl(url: string): void;
  mutations: any;
};

type AtlasStateType = {
  name: Maybe<string>;
  notionId: Maybe<string>;
};

export const mutationArg = (driveId: string, docId: string) => {
  return <InputType>(input: InputType) => {
    return {
      __args: {
        driveId,
        docId,
        input,
      },
    };
  };
};

export abstract class AtlasBaseClient<
  ScopeType extends AtlasStateType,
  WriteClientType extends WriteClientBase,
> extends DocumentClient<ScopeType, ViewNodeExtended> {
  protected readonly writeClient: WriteClientType;

  constructor(
    documentType: string,
    mutationsSubgraphUrl: string,
    documentsCache: DocumentsCache,
    readClient: ReactorClient,
    writeClient: WriteClientType,
    adapter?: import("../adapters/ReactorAdapter.js").ReactorAdapter,
  ) {
    super(documentType, documentsCache, readClient, adapter);
    this.writeClient = writeClient;
    this.writeClient.setUrl(mutationsSubgraphUrl);
  }

  protected getInputIdFromState(state: ScopeType): Maybe<string> {
    return state.notionId;
  }

  protected getNameFromState(state: ScopeType): Maybe<string> {
    return state.name;
  }

  protected getNameFromInput(documentNode: ViewNodeExtended): Maybe<string> {
    return getNodeTitle(documentNode);
  }

  protected getInputIdFromInput(documentNode: ViewNodeExtended): Maybe<string> {
    return documentNode.id;
  }

  protected async patchDocumentState(
    id: string,
    current: AtlasStateType,
    target: AtlasStateType,
  ): Promise<boolean> {
    let result = true;
    const stateFields = Object.keys(target) as (keyof AtlasStateType)[];

    for (const key of stateFields) {
      if (!_.isEqual(target[key], current[key])) {
        try {
          await this.patchField(id, key, current[key], target[key]);
        } catch (e) {
          console.log(e);
          result = false;
        }
      }
    }

    return result;
  }

  /**
   * Execute a mutation through the adapter or the write client.
   * Use this helper to avoid duplication in subclasses.
   */
  protected async executeMutationViaAdapter<T = any>(
    mutationName: string,
    args: any
  ): Promise<T> {
    if (this.adapter) {
      return this.adapter.executeMutation<T>("drive", mutationName, args);
    }

    // Call the actual write client mutation
    const mutationFn = (this.writeClient.mutations as any)[mutationName];
    if (!mutationFn) {
      throw new Error(`Mutation ${mutationName} not found on write client`);
    }
    return mutationFn(args);
  }

  /**
   * Add an action through the adapter or fall back to GraphQL mutation.
   * This is the document-model-level abstraction for applying changes.
   */
  protected async addActionViaAdapter(
    driveId: string,
    docId: string,
    action: BaseAction
  ): Promise<any> {
    if (this.adapter) {
      return this.adapter.addAction(driveId, docId, this.documentType, action);
    }

    // Fall back to GraphQL mutation approach
    // Convert action to mutation call (same logic as HttpReactorAdapter)
    const typePrefix = this.documentTypeToPrefix(this.documentType);
    const methodName = this.actionTypeToMethodName(action.type);
    const mutationName = `${typePrefix}_${methodName}`;

    const mutationFn = (this.writeClient.mutations as any)[mutationName];
    if (!mutationFn) {
      throw new Error(`Mutation ${mutationName} not found on write client`);
    }

    return mutationFn({
      __args: {
        driveId,
        docId,
        input: action.input,
      },
    });
  }

  /**
   * Convert document type to GraphQL type prefix.
   * E.g., "sky/atlas-scope" -> "AtlasScope"
   */
  private documentTypeToPrefix(documentType: string): string {
    const parts = documentType.split("/");
    const typeName = parts[parts.length - 1];
    return typeName
      .split("-")
      .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
      .join("");
  }

  /**
   * Convert action type to GraphQL method name.
   * E.g., "SET_SCOPE_NAME" -> "setScopeName"
   */
  private actionTypeToMethodName(actionType: string): string {
    const parts = actionType.toLowerCase().split("_");
    return parts
      .map((part, index) =>
        index === 0 ? part : part.charAt(0).toUpperCase() + part.slice(1)
      )
      .join("");
  }

  /**
   * Add a drive-level action through the adapter or fall back to GraphQL mutation.
   */
  protected async addDriveActionViaAdapter(
    driveId: string,
    driveAction: BaseAction
  ): Promise<any> {
    if (this.adapter) {
      return this.adapter.addDriveAction(driveId, driveAction);
    }

    // Fall back to GraphQL mutation for drive actions
    if (driveAction.type === "ADD_FILE") {
      const mutationFn = (this.writeClient.mutations as any).addFile;
      if (!mutationFn) {
        throw new Error("Mutation addFile not found on write client");
      }
      return mutationFn({
        __args: {
          driveId,
          ...(driveAction.input as any),
        },
      });
    }

    throw new Error(`Unsupported drive action type: ${driveAction.type}`);
  }

  /**
   * Create a new document using addFile action.
   * Returns the generated document ID.
   */
  protected async createDocumentViaAdapter(
    driveId: string,
    name: string
  ): Promise<string> {
    const docId = generateId();

    await this.addDriveActionViaAdapter(
      driveId,
      addFile({
        id: docId,
        name,
        documentType: this.documentType,
        synchronizationUnits: [
          {
            branch: "main",
            scope: "global",
            syncId: generateId(),
          },
          {
            branch: "main",
            scope: "local",
            syncId: generateId(),
          },
        ],
      })
    );

    return docId;
  }

  protected abstract patchField<K extends keyof AtlasStateType>(
    id: string,
    fieldName: K,
    current: AtlasStateType[K],
    target: AtlasStateType[K],
  ): Promise<void>;

  public abstract canHandle(node: ViewNodeExtended): boolean;
}
