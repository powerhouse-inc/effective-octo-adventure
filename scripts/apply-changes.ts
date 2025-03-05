import {
  getPNDTitle,
  documentIndex as notionDocsIndex,
} from "../document-models/utils";
import { DocumentsCache } from "./apply-changes/common/DocumentsCache";
import { AtlasScopeClient } from "./apply-changes/AtlasScopeClient";
import { ParsedNotionDocument } from "./apply-changes/atlas-base/NotionTypes";
import { ReactorClient } from "./apply-changes/common/ReactorClient";
import { AtlasFoundationClient } from "./apply-changes/AtlasFoundationClient";
import { SystemGraphClient } from "./apply-changes/SystemGraphClient";

const GQL_ENDPOINT = "http://localhost:4001/";
const DRIVE_NAME = "atlas_" + new Date().toISOString().substring(0, 16).replaceAll(/[\-:]/g, '').replace('T', '_');
const PREFERRED_EDITOR = "AtlasDriveExplorer";
const PROCESS_LIMIT = 10;

const skipNodes: { [id: string]: boolean } = {
  "422bae2b-2aec-4324-ae40-33c544820db3": false,
  "eca5e587-79e3-480b-b70d-dd25697c9e1f": false,
  "cde3202c-9073-43db-8405-4094624c57ea": false,
  "0ba1b2bd-9513-487d-974c-0d08fb04b341": false,
  "9e3f76e6-3343-4e70-af0b-c914be2e8d5a": false,
};



async function main() {
  const readClient = new ReactorClient(GQL_ENDPOINT, DRIVE_NAME);
  const driveIds = await readClient.getDriveIds();

  if (driveIds.includes(DRIVE_NAME)) {
    console.log(`Drive ${DRIVE_NAME} already exists.`);
  } else {
    const systemClient = new SystemGraphClient(new URL("/system", GQL_ENDPOINT).href);
    console.log(`Creating drive ${DRIVE_NAME}...`); 
    const newDriveResult = await systemClient.createDrive(DRIVE_NAME, PREFERRED_EDITOR, DRIVE_NAME, DRIVE_NAME);
    console.log(newDriveResult);
  }

  console.log("Loading drive documents cache...");
  const driveNodes = await readClient.getDriveNodes();
  const documentsCache = new DocumentsCache(driveNodes);

  const clients = {
    scopes: new AtlasScopeClient(
      new URL("/atlas-scope", GQL_ENDPOINT).href,
      documentsCache,
      readClient,
      DRIVE_NAME,
    ),
    foundation: new AtlasFoundationClient(
      new URL("/atlas-foundation", GQL_ENDPOINT).href,
      documentsCache,
      readClient,
      DRIVE_NAME,
    ),
  };

  for (const client of Object.values(clients)) {
    await client.loadDriveDocumentCache();
  }
  console.log(documentsCache.getDocumentsCount());

  console.log("\nProcessing Notion documents...");

  const queue = Object.values(notionDocsIndex)
    .filter((pnd) => pnd!.type == "scope")
    .sort((a, b) => (a!.docNo < b!.docNo ? -1 : 1));

  let processed = 0,
    skipped = 0,
    notionDoc: ParsedNotionDocument | undefined;

  while ((notionDoc = queue.shift())) {
    if (processed >= PROCESS_LIMIT) {
      console.log(`\nProcess limit reached.`);
      break;
    }

    if (skipNodes[notionDoc.id]) {
      console.log(
        `SKIP [${notionDoc.id}]: ${getPNDTitle(notionDoc)} (${notionDoc.type})`,
      );
      skipped++;
      continue;
    }

    console.log(
      `>> ${processed + 1} [${notionDoc.id}]: ${getPNDTitle(notionDoc)} (${notionDoc.type})`,
    );

    try {
      if (notionDoc.type === "scope") {
        const newDocumentId = await clients.scopes.update(notionDoc);
      } else if (
        ["article", "section", "core", "activeDataController"].includes(
          notionDoc.type,
        )
      ) {
        const newDocumentId = await clients.foundation.update(notionDoc);
      } else {
        console.log(`Update for type ${notionDoc.type} not implemented yet.`);
      }
    } catch (e) {
      console.error(e);
    }

    notionDoc.children.forEach((childNotionId) => {
      if (!notionDocsIndex[childNotionId]) {
        //console.warn(`Cannot find notion document ${childNotionId} (child ref of scope ${notionDoc?.name})`);
      } else {
        const item = { ...notionDocsIndex[childNotionId] };
        if (!item.parents || item.parents.indexOf(notionDoc.id) < 0) {
          item.parents = [...(item.parents || []), notionDoc.id];
        }
        queue.push(item);
      }
    });

    processed++;
  }

  console.log(
    `Processed: ${processed}. Skipped: ${skipped}. Queued: ${queue.length}.`,
  );

  documentsCache.saveToFile("./editors/index.json");
  console.log(`Document cache saved to file.`);

  const driveUrl = new URL(`/d/${DRIVE_NAME}`, GQL_ENDPOINT);
  console.log(`Documents loaded in drive: ${driveUrl}`);
}

await main();
