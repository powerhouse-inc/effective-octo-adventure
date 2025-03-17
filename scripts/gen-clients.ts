import { generateTypescriptClient } from "graphql-ts-client";
import path from "node:path";

async function generateClient(endpointBase: string, subgraphName: string) {
  const endpoint =
    endpointBase + (endpointBase.endsWith("/") ? "" : "/") + subgraphName;
  const clientFile = path.join(
    __dirname,
    `./clients/${subgraphName.replaceAll("/", "_")}.ts`,
  );
  console.log(
    "Generating GraphQL client at " + clientFile + " for " + endpoint,
  );

  await generateTypescriptClient({
    output: clientFile,
    endpoint: endpointBase + subgraphName,
    verbose: process.env.NODE_ENV === "development", // when true, log requests to the console
    headers: {},
  });
}

async function main() {
  const endpointBase = process.argv[2] || "http://localhost:4001/";

  if (!endpointBase.startsWith("http")) {
    console.error("Args: ", process.argv);
    throw new Error("Invalid endpoint URL: " + endpointBase);
  }

  const subgraphs = [
    "atlas-scope",
    "atlas-foundation",
    "atlas-grounding",
    "atlas-multiparent",
    "atlas-exploratory",
    "system",
  ];

  for (const subgraph of subgraphs) {
    await generateClient(endpointBase, subgraph);
  }
}

await main();
