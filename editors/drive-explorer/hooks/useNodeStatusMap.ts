import { type NodeStatus } from "@powerhousedao/document-engineering/ui";
// import { useNodeStatusFromDiffAnalytics } from "./useNodeStatusFromDiffAnalytics.js";
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
  // const diffStatusMap = useNodeStatusFromDiffAnalytics(
  //   from,
  //   to,
  //   driveId,
  //   logAnalytics.diff,
  // );
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

  if (logAnalytics.diffStatusMap) {
    console.log(">>> documentStatusMap", documentStatusMap);
  }

  if (logAnalytics.driveStatusMap) {
    console.log(">>> driveStatusMap", driveStatusMap);
    console.log(">>> deletedDriveStatusMap", deletedDriveStatusMap);
  }

  const nodeStatusMap = {
    ...driveStatusMap,
    ...documentStatusMap,
    ...deletedDriveStatusMap,
  };

  if (logAnalytics.nodeStatusMap) {
    console.log(">>> nodeStatusMap", nodeStatusMap);
  }

  return nodeStatusMap;
};
