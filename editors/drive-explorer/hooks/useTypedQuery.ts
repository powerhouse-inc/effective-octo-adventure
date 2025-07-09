import { type DB } from "../../../processors/search-indexer/schema.js";
import { createTypedQuery } from "@powerhousedao/reactor-browser/operational";

export const useTypedQuery = createTypedQuery<DB>();
