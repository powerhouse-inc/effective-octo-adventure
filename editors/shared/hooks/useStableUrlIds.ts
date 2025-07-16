import { useMemo } from "react";
import { transformUrl } from "../utils/utils.js";

interface StableUrlItem {
  id: string;
  value: string;
  baselineIndex: number | null;
}

export const useStableUrlIds = (
  currentUrls: string[],
  baselineUrls: string[],
): StableUrlItem[] => {
  const usedBaselineIndices = new Set<number>();

  return useMemo(() => {
    return currentUrls.map((url, index) => {
      // 1. Coincide con baseline en la misma posición
      if (index < baselineUrls.length && url === baselineUrls[index]) {
        usedBaselineIndices.add(index);
        return {
          id: `baseline-${index}`,
          value: url,
          baselineIndex: index,
        };
      }

      // 2. ¿Existe en baseline y no ha sido usado?
      const baselineIndex = baselineUrls.findIndex(
        (b, i) => b === url && !usedBaselineIndices.has(i),
      );
      if (baselineIndex !== -1) {
        usedBaselineIndices.add(baselineIndex);
        return {
          id: `baseline-${baselineIndex}`,
          value: url,
          baselineIndex,
        };
      }

      // 3. Es nuevo
      return {
        id: transformUrl(url),
        value: url,
        baselineIndex: null,
      };
    });
  }, [currentUrls, baselineUrls]);
};
