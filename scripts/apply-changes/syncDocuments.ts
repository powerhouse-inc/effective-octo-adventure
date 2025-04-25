import { ViewNode } from "@powerhousedao/sky-atlas-notion-data";
import {
  getNodeTitle,
  atlasData,
  isScope,
  isFoundation,
  getNodeDocNo
} from "../../document-models/utils.js";
import { AtlasFoundationClient } from "./AtlasFoundationClient.js";
import { AtlasScopeClient } from "./AtlasScopeClient.js";
import { DocumentsCache } from "./common/DocumentsCache.js";
import { ReactorClient } from "./common/ReactorClient.js";
import { SystemGraphClient } from "./SystemGraphClient.js";

export type DocumentSyncConfig = {
  gqlEndpoint: string;
  driveName: string;
  preferredEditor: string;
  processLimit: number;
  skipNodes: { [id: string]: boolean };
  saveToFile?: string;
};

export const syncDocuments = async (config: DocumentSyncConfig) => {
  const readClient = new ReactorClient(config.gqlEndpoint, config.driveName);
  const driveIds = await readClient.getDriveIds();

  if (driveIds.includes(config.driveName)) {
    console.log(`Drive ${config.driveName} already exists.`);
  } else {
    const systemClient = new SystemGraphClient(
      new URL("./graphql/system", config.gqlEndpoint).href
    );
    console.log(`Creating drive ${config.driveName}...`);
    const newDriveResult = await systemClient.createDrive(
      config.driveName,
      config.preferredEditor,
      config.driveName,
      config.driveName,
    );
    console.log(newDriveResult);
  }

  console.log("Loading drive documents cache...");
  const driveNodes = await readClient.getDriveNodes();
  const documentsCache = new DocumentsCache(driveNodes);

  const clients = {
    scopes: new AtlasScopeClient(
      new URL("./graphql", config.gqlEndpoint).href,
      documentsCache,
      readClient,
      config.driveName,
    ),
    foundation: new AtlasFoundationClient(
      new URL("./graphql", config.gqlEndpoint).href,
      documentsCache,
      readClient,
      config.driveName,
    ),
  };

  for (const client of Object.values(clients)) {
    await client.loadDriveDocumentCache();
  }

  console.log(documentsCache.getDocumentsCount());
  console.log("\nProcessing Notion documents...");

  // const queue = Object.values(notionDocsIndex)
  //   .filter((pnd) => pnd!.type == "scope")
  //   .sort((a, b) => (a!.docNo < b!.docNo ? -1 : 1));

  // the queue is initialized with the scopes (first level of the atlas)
  const queue: ViewNode[] = [...atlasData]

  let processed = 0;
  let skipped = 0;

  while (queue.length > 0) {
    let documentNode = queue.shift()!;
    if (processed >= config.processLimit) {
      console.log(`\nProcess limit reached.`);
      break;
    }

    if (config.skipNodes[documentNode.id]) {
      console.log(
        `SKIP [${documentNode.id}]: ${getNodeTitle(documentNode)} (${documentNode.type})`,
      );
      skipped++;
      continue;
    }

    console.log(
      `>> ${processed + 1} [${documentNode.id}]: ${getNodeTitle(documentNode)} (${documentNode.type})`,
    );

    try {
      if (isScope(documentNode)) {
        const newDocumentId = await clients.scopes.update(documentNode);
      } else if (isFoundation(documentNode)) {
        const newDocumentId = await clients.foundation.update(documentNode);
      } else {
        console.log(`Update for type ${documentNode.type} not implemented yet.`);
      }
    } catch (e) {
      console.error(e);
    }

    // add all the sub documents to the queue
    if (documentNode.subDocuments.length > 0) {
      queue.push(...documentNode.subDocuments);
    }

    processed++;
  }

  console.log(
    `Processed: ${processed}. Skipped: ${skipped}. Queued: ${queue.length}.`,
  );

  if (config.saveToFile) {
    documentsCache.saveToFile(config.saveToFile);
    console.log(`Document cache saved to file.`);
  }

  const driveUrl = new URL(`./d/${config.driveName}`, config.gqlEndpoint).href;
  console.log(`Documents loaded in drive: ${driveUrl}`);
};
