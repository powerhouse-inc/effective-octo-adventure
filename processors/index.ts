/**
 * This is a scaffold file meant for customization.
 * Delete the file and run the code generator again to have it reset
 */

import { type ProcessorRecord } from "document-drive/processors/types";
import { DriveAnalyticsProcessor } from "./drive-analytics/index.js";
import { type IAnalyticsStore } from "@powerhousedao/reactor-api";

export const processorFactory =
  (module: { analyticsStore: IAnalyticsStore }) =>
  (driveId: string): ProcessorRecord[] => {
    return [
      {
        processor: new DriveAnalyticsProcessor(module.analyticsStore),
        filter: {
          branch: ["main"],
          documentId: ["*"],
          scope: ["*"],
          documentType: ["powerhouse/document-drive"],
        },
      },
    ];
  };
