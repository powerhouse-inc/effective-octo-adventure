import { type ProcessorRecord } from "document-drive/processors/types";
import { SearchIndexerProcessor } from "./search-indexer/index.js";

export const processorFactory =
  (module: any) =>
  (driveId: string): ProcessorRecord[] => {
    console.log(module);
    return [
      {
        processor: new SearchIndexerProcessor(module.operationalStore as Db),
        filter: {
          branch: ["main"],
          documentId: ["*"],
          scope: ["global"],
          documentType: ["sky/atlas-scope", "sky/atlas-foundation"],
        },
      },
    ];
  };
