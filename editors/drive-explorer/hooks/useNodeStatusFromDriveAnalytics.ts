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
  driveId?: string,
) => {
  const statusMapRef = useRef<Record<string, NodeStatus>>({});

  const start = from ? DateTime.fromISO(from) : DateTime.now().startOf("day");
  const end = DateTime.now().endOf("day");

  const driveSelect = driveId
    ? AnalyticsPath.fromString(`drive/${driveId}`)
    : AnalyticsPath.fromString("drive");

  const result = useAnalyticsQuery({
    start,
    end,
    metrics: ["DriveOperations"],
    granularity: AnalyticsGranularity.Daily,
    lod: {
      target: 2,
      actionType: 3,
    },
    select: {
      drive: [driveSelect],
      target: [AnalyticsPath.fromString("target/NODE")],
      actionType: [
        AnalyticsPath.fromString("actionType/CREATED"),
        AnalyticsPath.fromString("actionType/DUPLICATED"),
        AnalyticsPath.fromString("actionType/REMOVED"),
        AnalyticsPath.fromString("actionType/MOVED"),
      ],
    },
  });

  const rows = result.data?.flatMap((item) => item.rows);
  const statusMap = rows?.reduce<Record<string, NodeStatus>>((acc, row) => {
    const [, actionType, nodeId] = row.dimensions.actionType.path
      .toString()
      .split("/");

    acc[nodeId] = actionType as NodeStatus;

    return acc;
  }, {});

  statusMapRef.current = {
    ...statusMapRef.current,
    ...statusMap,
  };

  return statusMapRef.current;
};
