import { useMemo } from "react";
import type { ViewMode } from "@powerhousedao/document-engineering/scalars";
import { shouldShowLastElement } from "../utils/utils.js";

interface UseFormUIProps {
  mode: ViewMode;
  isSplitMode?: boolean;
  contextDataLength: number;
}

interface UseFormUIResult {
  preserveSpace: boolean;
  showLastElement: boolean;
}

export function useElementVisibility({
  mode,
  isSplitMode,
  contextDataLength,
}: UseFormUIProps): UseFormUIResult {
  const result = useMemo(() => {
    const preserveSpace = mode === "mixed" && !!isSplitMode;

    const showLastElement = shouldShowLastElement({
      mode,
      isSplitMode,
      contextDataLength,
    });

    return { preserveSpace, showLastElement };
  }, [mode, isSplitMode, contextDataLength]);

  return result;
}
