import { type NodeStatus } from "@powerhousedao/document-engineering/ui";
import {
  AnalyticsGranularity,
  AnalyticsPath,
  DateTime,
  useAnalyticsQuery,
} from "@powerhousedao/reactor-browser";
import { useRef } from "react";

export const useNodeStatusFromDocumentAnalytics = (
  from?: string,
  to?: string,
  driveId?: string,
  logAnalytics = false,
) => {
  const statusMapRef = useRef<Record<string, NodeStatus>>({});

  const start = from ? DateTime.fromISO(from) : DateTime.now().startOf("day");
  const end = to ? DateTime.fromISO(to) : DateTime.now().endOf("day");

  const driveSelect = driveId
    ? AnalyticsPath.fromString(`drive/${driveId}`)
    : AnalyticsPath.fromString("drive");

  const source = driveId
    ? AnalyticsPath.fromString(`ph/doc/${driveId}`)
    : AnalyticsPath.fromString("ph/doc");

  const result = useAnalyticsQuery(
    {
      start,
      end,
      metrics: ["DocumentOperations"],
      granularity: AnalyticsGranularity.Daily,
      lod: {
        target: 6,
      },
      select: {
        target: [AnalyticsPath.fromString(`ph/doc/target/${driveId}/NODE`)],
      },
    },
    {
      sources: [source],
    },
  );

  if (!result.data) {
    return statusMapRef.current;
  }

  const rows = result.data.flatMap((item) => item.rows);
  const statusMap = rows?.reduce<Record<string, NodeStatus>>((acc, row) => {
    const [, , , , , nodeId] = row.dimensions.target.path.toString().split("/");

    if (row.value > 0) {
      acc[nodeId] = "MODIFIED" as NodeStatus;
    }

    return acc;
  }, {});

  statusMapRef.current = { ...statusMap };

  return statusMapRef.current;
};
