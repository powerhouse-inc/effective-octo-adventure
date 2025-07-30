import { type NodeStatus } from "@powerhousedao/document-engineering/ui";
import { useNodeStatusFromDriveAnalytics } from "./useNodeStatusFromDriveAnalytics.js";
import { useNodeStatusFromDocumentAnalytics } from "./useNodeStatusFromDocumentAnalytics.js";

export const useNodeStatusMap = (
  from?: string,
  to?: string,
  driveId?: string,
  logAnalytics: {
    diff?: boolean;
    drive?: boolean;
    diffStatusMap?: boolean;
    driveStatusMap?: boolean;
    nodeStatusMap?: boolean;
  } = {},
) => {
  const originalDriveStatusMap = useNodeStatusFromDriveAnalytics(
    from,
    to,
    driveId,
    logAnalytics.drive,
  );

  const documentStatusMap = useNodeStatusFromDocumentAnalytics(
    from,
    to,
    driveId,
    logAnalytics.diff,
  );

  // Split driveStatusMap into two objects
  const driveStatusMap: Record<string, any> = {};
  const deletedDriveStatusMap: Record<string, any> = {};
  Object.entries(originalDriveStatusMap).forEach(([key, value]) => {
    if (value === ("REMOVED" as NodeStatus)) {
      deletedDriveStatusMap[key] = value;
    } else {
      driveStatusMap[key] = value;
    }
  });

  const nodeStatusMap = {
    ...driveStatusMap,
    ...documentStatusMap,
    ...deletedDriveStatusMap,
  };

  return nodeStatusMap;
};
