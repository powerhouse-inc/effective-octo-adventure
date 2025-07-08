import { type ProcessorRecord } from "document-drive/processors/types";
import { type IProcessorHostModule } from "document-drive/processors/types";
import { SearchIndexerProcessor } from "./index.js";

export const searchIndexerProcessorFactory =
  (module: IProcessorHostModule) =>
  (driveId: string): ProcessorRecord[] => {
    const processor = new SearchIndexerProcessor(
      driveId,
      module.operationalStore,
    );
    return [
      {
        processor,
        filter: processor.filter,
      },
    ];
  };
