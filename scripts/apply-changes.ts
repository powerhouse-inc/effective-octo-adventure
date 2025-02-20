import { getPNDTitle, documentIndex as notionDocsIndex } from "../document-models/utils";
import { DocumentsCache } from "./apply-changes/common/DocumentsCache";
import { AtlasScopeClient } from "./apply-changes/AtlasScopeClient";
import { ParsedNotionDocument } from "./apply-changes/atlas-base/NotionTypes";
import { ReactorClient } from "./apply-changes/common/ReactorClient";
import { AtlasFoundationClient } from "./apply-changes/AtlasFoundationClient";

const GQL_ENDPOINT = 'http://localhost:4001/';
const DRIVE_NAME = 'powerhouse';
const PROCESS_LIMIT = 5000;

const skipNodes: { [id: string]: boolean } = {
  '422bae2b-2aec-4324-ae40-33c544820db3': false,
  'eca5e587-79e3-480b-b70d-dd25697c9e1f': false,
  'cde3202c-9073-43db-8405-4094624c57ea': false,
  '0ba1b2bd-9513-487d-974c-0d08fb04b341': false,
  '9e3f76e6-3343-4e70-af0b-c914be2e8d5a': false,
};

const readClient = new ReactorClient(GQL_ENDPOINT, DRIVE_NAME);

async function main() {
  console.log("Loading drive documents cache...");
  const driveNodes = await readClient.getDriveNodes();
  const documentsCache = new DocumentsCache(driveNodes);

  const clients = {
    scopes: new AtlasScopeClient(new URL('/atlas-scope', GQL_ENDPOINT).href, documentsCache, readClient),
    foundation: new AtlasFoundationClient(new URL('/atlas-foundation', GQL_ENDPOINT).href, documentsCache, readClient),
  };

  for (const client of Object.values(clients)) {
    await client.loadDriveDocumentCache();
  }
  console.log(documentsCache.getDocumentsCount());

  console.log("\nProcessing Notion documents...");

  const queue = Object.values(notionDocsIndex)
    .filter(pnd => pnd!.type == 'scope')
    .sort((a, b) => a!.docNo < b!.docNo ? -1 : 1);

  let processed = 0, skipped = 0, notionDoc: ParsedNotionDocument | undefined;

  while (notionDoc = queue.shift()) {
    if (processed >= PROCESS_LIMIT) {
      console.log(`\nProcess limit reached.`);
      break;
    }

    if (skipNodes[notionDoc.id]) {
      console.log(`SKIP [${notionDoc.id}]: ${getPNDTitle(notionDoc)} (${notionDoc.type})`);
      skipped++;
      continue;
    }

    console.log(`>> ${processed + 1} [${notionDoc.id}]: ${getPNDTitle(notionDoc)} (${notionDoc.type})`);

    try {
      if (notionDoc.type === 'scope') {
        const newDocumentId = await clients.scopes.update(notionDoc);
      } else if(['article', 'section', 'core', 'activeDataController'].includes(notionDoc.type)) {
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
        queue.push(notionDocsIndex[childNotionId]);
      }
    });

    processed++;
  };

  console.log(`Processed: ${processed}. Skipped: ${skipped}. Queued: ${queue.length}.`);
}

await main();