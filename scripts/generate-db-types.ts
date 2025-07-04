#!/usr/bin/env node

import { writeDatabaseTypes } from "../utils/schema-generator.js";
import path from "node:path";
import { fileURLToPath } from "node:url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function main() {
  try {
    const outputPath = path.join(__dirname, "../utils/generated/database-types.ts");
    
    // Ensure the generated directory exists
    const generatedDir = path.dirname(outputPath);
    const fs = await import("node:fs");
    if (!fs.existsSync(generatedDir)) {
      fs.mkdirSync(generatedDir, { recursive: true });
    }
    
    await writeDatabaseTypes(outputPath);
    console.log("✅ Database types generated successfully!");
    console.log(`📁 Output: ${outputPath}`);
  } catch (error) {
    console.error("❌ Error generating database types:", error);
    process.exit(1);
  }
}

main(); 