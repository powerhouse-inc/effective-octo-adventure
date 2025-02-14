import { getPNDTitle, documentIndex as index } from "../document-models/utils";
import { AtlasScopeClient } from "./apply-changes/AtlasScopeClient";
import { ParsedNotionDocument } from "./apply-changes/NotionTypes";

const GQL_ENDPOINT = 'http://localhost:4001/'
const PROCESS_LIMIT = 6;

const skipNodes: {[id: string]: boolean} = {
    '422bae2b-2aec-4324-ae40-33c544820db3': false,
    'eca5e587-79e3-480b-b70d-dd25697c9e1f': false,
    'cde3202c-9073-43db-8405-4094624c57ea': false,
    '0ba1b2bd-9513-487d-974c-0d08fb04b341': false,
    '9e3f76e6-3343-4e70-af0b-c914be2e8d5a': false,
};

const clients = {
    scopes: new AtlasScopeClient(GQL_ENDPOINT),
};

async function main() {
    console.log("Processing input documents...");

    const queue = Object.values(index)
        .filter(pnd => pnd!.type == 'scope')
        .sort((a, b) => a!.docNo < b!.docNo ? -1 : 1);

    let processed = 0, skipped = 0, notionDoc: ParsedNotionDocument | undefined;

    while(notionDoc = queue.shift()) {
        if (processed >= PROCESS_LIMIT) {
            console.log(`Process limit reached.`);
            break;
        }

        if (skipNodes[notionDoc.id]) {
            console.log(`SKIP [${notionDoc.id}]: ${getPNDTitle(notionDoc)} (${notionDoc.type})`);
            skipped++;
            continue;
        }

        console.log(`>> ${processed+1} [${notionDoc.id}]: ${getPNDTitle(notionDoc)} (${notionDoc.type})`);

        if (notionDoc.type === 'scope') {
            await clients.scopes.update(notionDoc);
        }

        processed++;
    };

    console.log(`Processed: ${processed}. Skipped: ${skipped}. Remaining: ${queue.length}.`);
}

await main();