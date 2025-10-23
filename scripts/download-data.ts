/**
 * Download Atlas data from the API and save it to disk.
 * This script fetches data from the Atlas API and stores it locally
 * in the data/ directory for later import.
 *
 * Usage:
 *   tsx scripts/download-data.ts
 *
 * Environment variables:
 *   ATLAS_DATA_URL - URL of the Atlas API (default: https://sky-atlas.powerhouse.io)
 *   OUTPUT_PATH - Path to save data files (default: ./data)
 */

import { fetchAllData } from "./fetch-data/fetch.js";

async function main() {
  console.log("=".repeat(60));
  console.log("Atlas Data Download");
  console.log("=".repeat(60));

  await fetchAllData();

  console.log("\n" + "=".repeat(60));
  console.log("Download complete!");
  console.log("To import this data to a reactor, run:");
  console.log("  tsx scripts/import-data.ts");
  console.log("=".repeat(60));
}

await main();
