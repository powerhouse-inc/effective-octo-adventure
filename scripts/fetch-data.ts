import { writeFile } from "fs/promises";

async function fetchData (url: string, outputPath: string) {
    const response = await fetch(url);
    const data = await response.json();
    await writeFile(outputPath, JSON.stringify(data, null, 2));
}


async function main () {
    const atlasDataUrl = process.env.ATLAS_DATA_URL ?? "https://sky-atlas-local.vercel.app";
    const outputPath = process.env.OUTPUT_PATH ?? "data";

    console.log("Fetching Atlas Data");
    try {
        await fetchData(`${atlasDataUrl}/api/atlas-data-json`, `${outputPath}/atlas-data.json`);
        console.log("Atlas Data fetched successfully");
    } catch (error) {
        console.error("Error fetching Atlas Data", error);
    }

    console.log("Fetching Node Map");
    try {
        await fetchData(`${atlasDataUrl}/api/view-node-map`, `${outputPath}/view-node-map.json`);
        console.log("Node Map fetched successfully");
    } catch (error) {
        console.error("Error fetching Node Map", error);
    }

    console.log("Fetching Extended Data");
    try {
        await fetchData(`${atlasDataUrl}/api/atlas-data-extended`, `${outputPath}/atlas-data-extended.json`);
        console.log("Extended Data fetched successfully");
    } catch (error) {
        console.error("Error fetching Extended Data", error);
    }

    console.log("Fetching global tags")
    try {
        await fetchData(`${atlasDataUrl}/api/global-tags`, `${outputPath}/global-tags.json`);
        console.log("Global tags fetched successfully");
    } catch (error) {
        console.error("Error fetching Global tags", error);
    }
}

main();