import { type NodeStatus } from "@powerhousedao/document-engineering/ui";
import {
  AnalyticsGranularity,
  AnalyticsPath,
  DateTime,
  useAnalyticsQuery,
} from "@powerhousedao/reactor-browser/analytics";
import { useRef } from "react";

export const useNodeStatusFromDriveAnalytics = (
  from?: string,
  to?: string,
  driveId?: string,
) => {
  const statusMapRef = useRef<Record<string, NodeStatus>>({});

  const start = from ? DateTime.fromISO(from) : DateTime.now().startOf("day");
  const end = to ? DateTime.fromISO(to) : DateTime.now().endOf("day");

  const driveSelect = driveId
    ? AnalyticsPath.fromString(`ph/drive/${driveId}`)
    : AnalyticsPath.fromString("ph/drive");

  const result = useAnalyticsQuery(
    {
      start,
      end,
      metrics: ["DriveOperations"],
      granularity: AnalyticsGranularity.Daily,
      lod: {
        target: 4,
        actionType: 5,
      },
      select: {
        drive: [driveSelect],
        target: [AnalyticsPath.fromString("ph/drive/target/NODE")],
        actionType: [
          AnalyticsPath.fromString("ph/drive/actionType/CREATED"),
          AnalyticsPath.fromString("ph/drive/actionType/DUPLICATED"),
          AnalyticsPath.fromString("ph/drive/actionType/REMOVED"),
          AnalyticsPath.fromString("ph/drive/actionType/MOVED"),
        ],
      },
    },
    {
      sources: [driveSelect],
    },
  );

  const rows = result.data?.flatMap((item) => item.rows);
  const statusMap = rows?.reduce<Record<string, NodeStatus>>((acc, row) => {
    if (row.value > 0) {
      const [, , , actionType, nodeId] = row.dimensions.actionType.path
        .toString()
        .split("/");

      acc[nodeId] = actionType as NodeStatus;
    }

    return acc;
  }, {});

  statusMapRef.current = {
    ...statusMap,
  };

  return statusMapRef.current;
};
