import {
  fetchPagesAndWriteTree,
} from "@powerhousedao/mips-parser";

async function main() {
  if (!process.env.API_KEY) {
    throw new Error("API_KEY environment variable not set");
  }

  if (!process.env.IMPORT_API_KEY) {
    throw new Error("IMPORT_API_KEY environment variable not set");
  }

  if (!process.env.IMPORT_API_URL) {
    throw new Error("IMPORT_API_URL environment variable not set");
  }

  const apiKey = process.env.API_KEY;
  const importApiKey = process.env.IMPORT_API_KEY;
  const importApiUrl = process.env.IMPORT_API_URL;
  const outputPath = "data";
  const shouldUseExistingData = process.env.SHOULD_USE_EXISTING_DATA === "true";
  const shouldRefetchPages = !shouldUseExistingData;
  const shouldFetchWithoutFilter =
    process.env.SHOULD_FETCH_WITHOUT_FILTER === "true";
  const shouldFilterByStatus = !shouldFetchWithoutFilter;
  const shouldPostToImportApi = process.env.POST_TO_IMPORT_API !== "false";
  const fetchOnePage = undefined;
  const overridePageIds = JSON.parse(process.env.OVERRIDE_PAGE_IDS ?? "[]") as {
    pageName: string;
    pageId: string;
  }[];

  await fetchPagesAndWriteTree({
    outputPath,
    apiKey,
    importApiKey,
    importApiUrl,
    shouldRefetchPages,
    shouldFilterByStatus,
    shouldPostToImportApi,
    fetchOnePage,
    overridePageIds,
  });
}

await main();
