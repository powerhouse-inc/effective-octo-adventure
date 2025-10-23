/**
 * Example: Import data using a mock reactor adapter
 *
 * This script demonstrates how to use the MockReactorAdapter to simulate
 * importing data without actually sending it to a remote reactor.
 *
 * Usage:
 *   tsx scripts/import-data-mock-example.ts
 *
 * The mock adapter will:
 * - Log all GraphQL operations (queries and mutations)
 * - Track what would be created/updated
 * - Print a summary of operations at the end
 * - NOT send any actual HTTP requests to a reactor
 */

import { syncDocuments } from "./apply-changes/syncDocuments.js";
import { getAtlasDataFromFile } from "../document-models/utils.js";
import { MockReactorAdapter } from "./apply-changes/adapters/MockReactorAdapter.js";

// Create a mock adapter with verbose logging
const mockAdapter = new MockReactorAdapter({ verbose: true });

const DRIVE_NAME = "atlas_mock_test";
const PREFERRED_EDITOR = "AtlasDriveExplorer";
const PROCESS_LIMIT = 10; // Process only 10 documents for this example
const SKIP_NODES: { [id: string]: boolean } = {
  "422bae2b-2aec-4324-ae40-33c544820db3": false, // The Governance Scope
  "eca5e587-79e3-480b-b70d-dd25697c9e1f": true, // The Support Scope (skip)
  "cde3202c-9073-43db-8405-4094624c57ea": true, // The Stability Scope (skip)
  "0ba1b2bd-9513-487d-974c-0d08fb04b341": true, // The Protocol Scope (skip)
  "9e3f76e6-3343-4e70-af0b-c914be2e8d5a": true, // The Accessibility Scope (skip)
  "4281ab93-ef4f-4974-988d-7dad149a693d": true, // Atlas Preamble (skip)
  "1b3f2ff0-8d73-80e6-86b0-c28bf9a97896": true, // The agent scope (skip)
};

async function main() {
  console.log("=".repeat(60));
  console.log("Mock Reactor Import Example");
  console.log("=".repeat(60));
  console.log("This will simulate importing data without sending to a reactor.");
  console.log("All operations will be logged and summarized.\n");

  // Load atlas data from file (will throw error if not found)
  const atlasData = getAtlasDataFromFile();

  await syncDocuments({
    driveName: DRIVE_NAME,
    gqlEndpoint: "http://mock-reactor:4001/", // This URL won't be used
    preferredEditor: PREFERRED_EDITOR,
    processLimit: PROCESS_LIMIT,
    skipNodes: SKIP_NODES,
    atlasData,
    reactorAdapter: mockAdapter, // Use mock adapter instead of HTTP
  });

  console.log("\n" + "=".repeat(60));
  console.log("Mock import complete!");
  console.log("Review the summary above to see what would have been sent.");
  console.log("=".repeat(60));
}

await main();
