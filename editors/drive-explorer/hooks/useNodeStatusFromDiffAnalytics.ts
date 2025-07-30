import {
  AnalyticsGranularity,
  AnalyticsPath,
  DateTime,
  useAnalyticsQuery,
} from "@powerhousedao/reactor-browser/analytics";
import { type NodeStatus } from "@powerhousedao/document-engineering/ui";
import { useRef } from "react";

export const useNodeStatusFromDiffAnalytics = (
  from?: string,
  to?: string,
  driveId?: string,
  logAnalytics = false,
) => {
  const statusMapRef = useRef<Record<string, NodeStatus>>({});

  const start = from ? DateTime.fromISO(from) : DateTime.now().startOf("day");
  const end = to ? DateTime.fromISO(to) : DateTime.now().endOf("day");

  const driveSelect = driveId
    ? AnalyticsPath.fromString(`ph/diff/drive/${driveId}`)
    : AnalyticsPath.fromString("ph/diff/drive");

  const result = useAnalyticsQuery(
    {
      start,
      end,
      granularity: AnalyticsGranularity.Daily,
      metrics: ["Count"],
      lod: {
        drive: 5,
      },
      select: {
        drive: [driveSelect],
      },
    },
    {
      sources: [AnalyticsPath.fromString(`ph/diff/${driveId}`)],
    },
  );

  const rows = result.data?.flatMap((item) => item.rows);
  const statusMap = rows?.reduce<Record<string, NodeStatus>>((acc, row) => {
    const nodeId = row.dimensions.drive.path.toString().split("/").at(-1);
    if (!nodeId) return acc;
    acc[nodeId] = "MODIFIED" as NodeStatus;
    return acc;
  }, {});

  statusMapRef.current = {
    ...statusMapRef.current,
    ...statusMap,
  };

  return statusMapRef.current;
};
