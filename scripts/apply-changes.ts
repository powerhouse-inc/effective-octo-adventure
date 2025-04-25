import { syncDocuments } from "./apply-changes/syncDocuments.js";

const PORT = process.env.PORT || 4001;
// Reactor where the documents will be synchronized to
const GQL_ENDPOINT = `http://localhost:${PORT}/`;

// Drive that the documents will be added/updated to. Will be created if it does not yet exist
const DRIVE_NAME =
  "atlas_" +
  new Date()
    .toISOString()
    .substring(0, 16)
    .replaceAll(/[\-:]/g, "")
    .replace("T", "_");

// Preferred editor for the drive when it's created
const PREFERRED_EDITOR = "AtlasDriveExplorer";

// Max. number of document to process
const PROCESS_LIMIT = 200;

// Which scope documents to skip or include
const SKIP_NODES: { [id: string]: boolean } = {
  "422bae2b-2aec-4324-ae40-33c544820db3": false,
  "eca5e587-79e3-480b-b70d-dd25697c9e1f": true,
  "cde3202c-9073-43db-8405-4094624c57ea": true,
  "0ba1b2bd-9513-487d-974c-0d08fb04b341": true,
  "9e3f76e6-3343-4e70-af0b-c914be2e8d5a": true,
  "4281ab93-ef4f-4974-988d-7dad149a693d": true,
};

// Set to true in order to update the index.json file with
// auto-complete values of the parent document field.
const SAVE_CACHE_FILE = false;

async function main() {
  await syncDocuments({
    driveName: DRIVE_NAME,
    gqlEndpoint: GQL_ENDPOINT,
    preferredEditor: PREFERRED_EDITOR,
    processLimit: PROCESS_LIMIT,
    skipNodes: SKIP_NODES,
    saveToFile: SAVE_CACHE_FILE
      ? "./scripts/apply-changes/data/index.json"
      : undefined,
  });
}

await main();
