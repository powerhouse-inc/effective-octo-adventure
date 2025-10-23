import { type ViewNodeExtended } from "@powerhousedao/sky-atlas-notion-data";
import { type AtlasBaseClient } from "../atlas-base/AtlasBaseClient.js";
import { type DocumentSyncConfig } from "../syncDocuments.js";
import { type DocumentsCache } from "../common/DocumentsCache.js";
import { type ReactorClient } from "../common/ReactorClient.js";
import { AtlasScopeClient } from "./AtlasScopeClient.js";
import { AtlasFoundationClient } from "./AtlasFoundationClient.js";
import { AtlasGroundingClient } from "./AtlasGroundingClient.js";
import { AtlasExploratoryClient } from "./AtlasExploratoryClient.js";
import { AtlasSetClient } from "./AtlasSetClient.js";
import { AtlasMultiParentClient } from "./AtlasMultiParentClient.js";

/**
 * List of all the clients classes that are available to be used.
 *
 * Adding a new client to this list will automatically register the client
 */
const CLIENTS = [
  AtlasScopeClient,
  AtlasFoundationClient,
  AtlasGroundingClient,
  AtlasExploratoryClient,
  AtlasSetClient,
  AtlasMultiParentClient,
];

export class AtlasClientRegistry {
  private clients: AtlasBaseClient<any, any>[] = [];

  /**
   * Register a new client to the registry.
   * @param client - The client to register.
   * @returns The registry itself.
   */
  register(client: AtlasBaseClient<any, any>): this {
    this.clients.push(client);
    return this;
  }

  /**
   * Find the appropriate client for a given node.
   * @param node - The node to find a client for.
   * @returns The client that can handle the node, or null if no client is found.
   */
  private findClientFor(node: ViewNodeExtended): AtlasBaseClient<any, any> | null {
    for (const client of this.clients) {
      if (client.canHandle(node)) {
        return client;
      }
    }
    return null;
  }

  /**
   * Invokes the update method from the appropriate client.
   * @param node - The node to update.
   */
  public async update(node: ViewNodeExtended): Promise<void> {
    const client = this.findClientFor(node);
    if (client) {
      await client.update(node);
    } else {
      console.error(`Update for type ${node.type} not implemented yet.`);
    }
  }

  /**
   * Loads the drive document cache for all the clients.
   */
  public async loadDriveDocumentCache(): Promise<void> {
    for (const client of this.clients) {
      await client.loadDriveDocumentCache();
    }
  }
}

/**
 * Creates a new client registry instance.
 * @param config - The configuration for all the clients.
 * @param documentCache - The document cache for all the clients.
 * @param readClient - The read client for all the clients.
 *
 * @returns The new client registry.
 */
export const createClientRegistry = (
  config: DocumentSyncConfig,
  documentCache: DocumentsCache,
  readClient: ReactorClient
): AtlasClientRegistry => {
  const mutationsSubgraphUrl = new URL("./graphql", config.gqlEndpoint).href;

  const registry = new AtlasClientRegistry();
  CLIENTS.forEach((client) => {
    registry.register(
      new client(
        mutationsSubgraphUrl,
        documentCache,
        readClient,
        config.driveName,
        config.reactorAdapter
      )
    );
  });

  return registry;
};
