import { useNodeStatusFromDiffAnalytics } from "./useNodeStatusFromDiffAnalytics.js";
import { useNodeStatusFromDriveAnalytics } from "./useNodeStatusFromDriveAnalytics.js";

export const useNodeStatusMap = (from?: string, driveId?: string) => {
  const diffStatusMap = useNodeStatusFromDiffAnalytics(from, driveId);
  const driveStatusMap = useNodeStatusFromDriveAnalytics(from, driveId);

  return {
    ...driveStatusMap,
    ...diffStatusMap,
  };
};
