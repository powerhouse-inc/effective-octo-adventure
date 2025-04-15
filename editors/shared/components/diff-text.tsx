import { Fragment, useMemo } from "react";
import { diffSentences, diffWords } from "diff";
import type { EditorMode } from "../types.js";
import { cn } from "@powerhousedao/design-system/scalars";

interface DiffTextProps {
  baseline: string;
  value: string;
  mode: EditorMode;
  diffMode: "words" | "sentences";
  className?: string;
}

export const DiffText = ({
  baseline,
  value,
  mode,
  diffMode = "words",
  className,
}: DiffTextProps) => {
  const wordsDiff = useMemo(() => {
    return diffMode === "words"
      ? diffWords(baseline, value)
      : diffSentences(baseline, value);
  }, [baseline, value, diffMode]);

  return (
    <span className={cn("leading-[18px]", className)}>
      {wordsDiff.map((word, index) => {
        return word.added ? (
          mode === "DiffAdditions" || mode === "DiffMixed" ? (
            <span
              className="bg-green-600/30 mr-0.5 text-gray-700"
              key={`${word.value}-${index}`}
            >
              {word.value}
            </span>
          ) : null
        ) : word.removed ? (
          mode === "DiffRemoved" || mode === "DiffMixed" ? (
            <span
              className="bg-red-600/30 text-gray-700 mr-0.5"
              key={`${word.value}-${index}`}
            >
              {word.value}
            </span>
          ) : null
        ) : (
          <Fragment key={`${word.value}-${index}`}>{word.value}</Fragment>
        );
      })}
    </span>
  );
};
