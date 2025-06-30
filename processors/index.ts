import { type ProcessorRecord } from "document-drive/processors/types";
import { SearchIndexerProcessor } from "./search-indexer/index.js";
import { type Db } from "@powerhousedao/reactor-api";

export const processorFactory =
  (module: { db: Db }) =>
  (driveId: string): ProcessorRecord[] => {
    return [
      {
        processor: new SearchIndexerProcessor(module.db),
        filter: {
          branch: ["main"],
          documentId: ["*"],
          scope: ["global"],
          documentType: ["sky/atlas-scope", "sky/atlas-foundation"],
        },
      },
    ];
  };
