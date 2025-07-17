import {
  type ProcessorRecord,
  type IProcessorHostModule,
} from "document-drive/processors/types";
import { type RelationalDbProcessorFilter } from "document-drive/processors/relational";
import { SearchIndexerProcessor } from "./index.js";

export const searchIndexerProcessorFactory =
  (module: IProcessorHostModule) =>
  async (driveId: string): Promise<ProcessorRecord[]> => {
    // Create a namespace for the processor and the provided drive id
    const namespace = SearchIndexerProcessor.getNamespace(driveId);

    // Create a namespaced db for the processor
    const store =
      await module.relationalDb.createNamespace<SearchIndexerProcessor>(
        namespace,
      );

    // Create a filter for the processor
    const filter: RelationalDbProcessorFilter = {
      branch: ["main"],
      documentId: ["*"],
      documentType: ["sky/atlas-scope", "sky/atlas-foundation"],
      scope: ["global"],
    };

    // Create the processor
    const processor = new SearchIndexerProcessor(namespace, filter, store);
    return [
      {
        processor,
        filter,
      },
    ];
  };
