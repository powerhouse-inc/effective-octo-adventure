import { type ViewNodeExtended } from "@powerhousedao/sky-atlas-notion-data";
import {
  getAtlasData,
  getNodeTitle,
} from "../../document-models/utils.js";
import { DocumentsCache } from "./common/DocumentsCache.js";
import { ReactorClient } from "./common/ReactorClient.js";
import { SystemGraphClient } from "./SystemGraphClient.js";
import { createClientRegistry } from "./clients/AtlasClientRegistry.js";

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

  const clientRegistry = createClientRegistry(config, documentsCache, readClient);
  await clientRegistry.loadDriveDocumentCache();

  console.log(documentsCache.getDocumentsCount());
  console.log("\nProcessing Notion documents...");

  const atlasData = await getAtlasData();
  const queue: ViewNodeExtended[] = [...atlasData];

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
      // update/create the document in the drive
      await clientRegistry.update(documentNode);
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
