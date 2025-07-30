import fs from "fs";
import path from "path";

export async function fetchData(url: string, outputPath: string) {
  const response = await fetch(url);
  const data = await response.json();
  fs.writeFileSync(outputPath, JSON.stringify(data, null, 2));
}

export async function fetchAllData() {
  const atlasDataUrl =
    process.env.ATLAS_DATA_URL ?? "https://sky-atlas.powerhouse.io";
  const __dirname = path.dirname(new URL(import.meta.url).pathname);
  const outputPath = process.env.OUTPUT_PATH ?? path.resolve(__dirname, "../../data");

  if (!fs.existsSync(outputPath)) {
    fs.mkdirSync(outputPath, { recursive: true });
  }

  console.log(`Data will be saved to ${outputPath}`);

  console.log("Fetching Extended Data");
  try {
    await fetchData(
      `${atlasDataUrl}/api/atlas-data-extended`,
      `${outputPath}/atlas-data-extended.json`
    );
    console.log("Extended Data fetched successfully");
  } catch (error) {
    console.error("Error fetching Extended Data", error);
  }

  console.log("Fetching global tags");
  try {
    await fetchData(
      `${atlasDataUrl}/api/global-tags`,
      `${outputPath}/global-tags.json`
    );
    console.log("Global tags fetched successfully");
  } catch (error) {
    console.error("Error fetching Global tags", error);
  }
}
