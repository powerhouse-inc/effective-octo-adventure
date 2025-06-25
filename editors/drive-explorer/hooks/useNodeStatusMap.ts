import { useNodeStatusFromDiffAnalytics } from "./useNodeStatusFromDiffAnalytics.js";
import { useNodeStatusFromDriveAnalytics } from "./useNodeStatusFromDriveAnalytics.js";

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
  const diffStatusMap = useNodeStatusFromDiffAnalytics(
    from,
    to,
    driveId,
    logAnalytics.diff,
  );
  const driveStatusMap = useNodeStatusFromDriveAnalytics(
    from,
    to,
    driveId,
    logAnalytics.drive,
  );

  if (logAnalytics.diffStatusMap) {
    console.log(">>> diffStatusMap", diffStatusMap);
  }

  if (logAnalytics.driveStatusMap) {
    console.log(">>> driveStatusMap", driveStatusMap);
  }

  if (logAnalytics.nodeStatusMap) {
    console.log(">>> nodeStatusMap", {
      ...driveStatusMap,
      ...diffStatusMap,
    });
  }

  return {
    ...driveStatusMap,
    ...diffStatusMap,
  };
};
