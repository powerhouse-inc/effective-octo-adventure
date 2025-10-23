/**
 * Record Atlas data import operations to a file for later replay.
 * This script reads data from the local file system (data/atlas-data-extended.json)
 * and records all operations that would be performed, without actually executing them.
 *
 * Usage:
 *   tsx scripts/record-operations.ts
 *
 * Prerequisites:
 *   - Data must be downloaded first using: tsx scripts/download-data.ts
 *
 * Output:
 *   - Creates a JSON file with all operations that can be replayed later
 *
 * Configuration:
 *   Edit the constants below to customize the recording behavior
 */

import { syncDocuments } from "./apply-changes/syncDocuments.js";
import { getAtlasDataFromFile } from "../document-models/utils.js";
import { WriteReactorAdapter } from "./apply-changes/adapters/WriteReactorAdapter.js";

// Output file where operations will be recorded
const OUTPUT_FILE = "./recorded-operations.json";

// Mock GraphQL endpoint (not actually used since we're just recording)
const GQL_ENDPOINT = "http://localhost:4001/";

// Drive name to use in recorded operations
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

async function main() {
  console.log("=".repeat(60));
  console.log("Atlas Operations Recording");
  console.log("=".repeat(60));
  console.log(`Output file: ${OUTPUT_FILE}`);
  console.log(`Drive: ${DRIVE_NAME}`);
  console.log("=".repeat(60));

  // Create write adapter
  const writeAdapter = new WriteReactorAdapter(OUTPUT_FILE);

  // Load atlas data from file (will throw error if not found)
  const atlasData = getAtlasDataFromFile();

  await syncDocuments({
    driveName: DRIVE_NAME,
    gqlEndpoint: GQL_ENDPOINT,
    preferredEditor: PREFERRED_EDITOR,
    processLimit: PROCESS_LIMIT,
    skipNodes: SKIP_NODES,
    atlasData, // Use pre-loaded data
    reactorAdapter: writeAdapter, // Use write adapter to record operations
  });

  // Print summary before flushing
  writeAdapter.printSummary();

  // Flush operations to disk
  await writeAdapter.flush();

  console.log("\n" + "=".repeat(60));
  console.log("Recording complete!");
  console.log(`Operations written to: ${OUTPUT_FILE}`);
  console.log("=".repeat(60));
}

await main();
