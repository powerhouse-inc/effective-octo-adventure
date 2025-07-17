import { createProcessorQuery } from "@powerhousedao/reactor-browser/relational";
import { SearchIndexerProcessor } from "../../../processors/search-indexer/index.js";

export const useTypedQuery = createProcessorQuery(SearchIndexerProcessor);
