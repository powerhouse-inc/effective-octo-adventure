/**
 * Import previously downloaded Atlas data to a reactor.
 * This script reads data from the local file system (data/atlas-data-extended.json)
 * and synchronizes it to the specified reactor drive.
 *
 * Usage:
 *   tsx scripts/import-data.ts
 *
 * Prerequisites:
 *   - Data must be downloaded first using: tsx scripts/download-data.ts
 *   - Reactor must be running (default: http://localhost:4001)
 *
 * Configuration:
 *   Edit the constants below to customize the import behavior
 */

import { syncDocuments } from "./apply-changes/syncDocuments.js";
import { getAtlasDataFromFile } from "../document-models/utils.js";
import { MockReactorAdapter } from "./apply-changes/adapters/MockReactorAdapter.js";
import { exit } from "process";

/**
 * ADAPTER CONFIGURATION
 *
 * To use a mock/in-memory reactor instead of sending data to a remote reactor:
 * 1. Uncomment the line below to create a MockReactorAdapter
 * 2. Pass it in the syncDocuments config as reactorAdapter
 *
 * The mock adapter will:
 * - Log all operations (queries and mutations) without sending them over HTTP
 * - Track document creates and updates
 * - Print a summary at the end showing what would have been sent
 *
 * This is useful for:
 * - Testing the import flow without affecting a real reactor
 * - Understanding what operations the import performs
 * - Developing/debugging import logic
 */

// Uncomment to use mock adapter:
// const mockAdapter = new MockReactorAdapter({ verbose: true });

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
  "422bae2b-2aec-4324-ae40-33c544820db3": false, // The Governance Scope
  "eca5e587-79e3-480b-b70d-dd25697c9e1f": true, // The Support Scope
  "cde3202c-9073-43db-8405-4094624c57ea": true, // The Stability Scope
  "0ba1b2bd-9513-487d-974c-0d08fb04b341": true, // The Protocol Scope
  "9e3f76e6-3343-4e70-af0b-c914be2e8d5a": true, // The Accessibility Scope
  "4281ab93-ef4f-4974-988d-7dad149a693d": true, // Atlas Preamble
  "1b3f2ff0-8d73-80e6-86b0-c28bf9a97896": true, // The agent scope
};

// Set to true in order to update the index.json file with
// auto-complete values of the parent document field.
const SAVE_CACHE_FILE = false;

async function main() {
  console.log("=".repeat(60));
  console.log("Atlas Data Import");
  console.log("=".repeat(60));
  console.log(`Target: ${GQL_ENDPOINT}`);
  console.log(`Drive: ${DRIVE_NAME}`);
  console.log("=".repeat(60));

  // Load atlas data from file (will throw error if not found)
  const atlasData = getAtlasDataFromFile();

  await syncDocuments({
    driveName: DRIVE_NAME,
    gqlEndpoint: GQL_ENDPOINT,
    preferredEditor: PREFERRED_EDITOR,
    processLimit: PROCESS_LIMIT,
    skipNodes: SKIP_NODES,
    saveToFile: SAVE_CACHE_FILE
      ? "./scripts/apply-changes/data/index.json"
      : undefined,
    atlasData, // Use pre-loaded data
    // reactorAdapter: mockAdapter, // Uncomment to use mock adapter
  });

  console.log("\n" + "=".repeat(60));
  console.log("Import complete!");
  console.log("=".repeat(60));
}

await main();
exit(0);
