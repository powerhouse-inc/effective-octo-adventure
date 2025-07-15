import { type ProcessorRecord } from "document-drive/processors/types";
import {
  type IProcessorHostModule,
  type IOperationalStore,
} from "document-drive/processors/types";
import { SearchIndexerProcessor } from "./index.js";
import { type DB } from "./schema.js";

export const searchIndexerProcessorFactory =
  (module: IProcessorHostModule) =>
  (driveId: string): ProcessorRecord[] => {
    const processor = new SearchIndexerProcessor(
      driveId,
      module.operationalStore as IOperationalStore<DB>,
    );
    return [
      {
        processor,
        filter: processor.filter,
      },
    ];
  };
