import { type ViewNodeExtended } from "@powerhousedao/sky-atlas-notion-data";
import {
  getAtlasData,
  getNodeTitle,
} from "../../document-models/utils.js";
import { DocumentsCache } from "./common/DocumentsCache.js";
import { ReactorClient } from "./common/ReactorClient.js";
import { createClientRegistry } from "./clients/AtlasClientRegistry.js";
import type { ReactorAdapter } from "./adapters/ReactorAdapter.js";
import { HttpReactorAdapter } from "./adapters/HttpReactorAdapter.js";

export type DocumentSyncConfig = {
  gqlEndpoint: string;
  driveName: string;
  preferredEditor: string;
  processLimit: number;
  skipNodes: { [id: string]: boolean };
  saveToFile?: string;
  atlasData?: ViewNodeExtended[]; // Optional: provide pre-loaded data instead of fetching
  reactorAdapter?: ReactorAdapter; // Optional: use custom reactor adapter (e.g., mock)
};

export const syncDocuments = async (config: DocumentSyncConfig) => {
  const adapter = config.reactorAdapter ??
    new HttpReactorAdapter(config.gqlEndpoint, config.driveName);
  const readClient = new ReactorClient(adapter);
  const driveIds = await readClient.getDriveIds();

  if (driveIds.includes(config.driveName)) {
    console.log(`Drive ${config.driveName} already exists.`);
  } else {
    console.log(`Creating drive ${config.driveName}...`);

    const driveArgs = {
      id: config.driveName,
      name: config.driveName,
      slug: config.driveName,
      preferredEditor: config.preferredEditor,
    };

    const newDriveResult = await adapter.createDrive(driveArgs);
    console.log(newDriveResult);
  }

  console.log("Loading drive documents cache...");
  const driveNodes = await readClient.getDocumentDriveNodes(config.driveName);

  const documentsCache = new DocumentsCache(driveNodes);

  const clientRegistry = createClientRegistry(config, documentsCache, readClient);
  await clientRegistry.loadDriveDocumentCache();

  console.log(documentsCache.getDocumentsCount());
  console.log("\nProcessing Notion documents...");

  const atlasData = config.atlasData ?? await getAtlasData();
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

  // Print adapter summary
  const adapterAny = adapter as any;
  if (typeof adapterAny.printSummary === "function") {
    adapterAny.printSummary();
  } else {
    const summary = adapter.getSummary();
    console.log("\n" + "=".repeat(60));
    console.log("Reactor Operations Summary");
    console.log("=".repeat(60));
    console.log(`Queries: ${summary.queriesExecuted}`);
    console.log(`Mutations: ${summary.mutationsExecuted}`);
    console.log(`Drives Created: ${summary.drivesCreated}`);
    console.log(`Documents Created: ${summary.documentsCreated}`);
    console.log(`Documents Updated: ${summary.documentsUpdated}`);
    console.log("=".repeat(60));
  }

  const driveUrl = new URL(`./d/${config.driveName}`, config.gqlEndpoint).href;
  console.log(`Documents loaded in drive: ${driveUrl}`);
};
