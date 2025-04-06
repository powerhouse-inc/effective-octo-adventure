import { Fragment, useMemo } from "react";
import { diffSentences, diffWords } from "diff";
import type { EditorMode } from "../types.js";

interface DiffTextProps {
  baseline: string;
  value: string;
  mode: EditorMode;
  diffMode: "words" | "sentences";
}

export const DiffText = ({
  baseline,
  value,
  mode,
  diffMode = "words",
}: DiffTextProps) => {
  const wordsDiff = useMemo(() => {
    return diffMode === "words"
      ? diffWords(baseline, value)
      : diffSentences(baseline, value);
  }, [baseline, value, diffMode]);

  return (
    <span className="leading-normal">
      {wordsDiff.map((word, index) => {
        return word.added ? (
          mode === "DiffAdditions" || mode === "DiffMixed" ? (
            <span
              className="bg-green-600/30 mr-0.5"
              key={`${word.value}-${index}`}
            >
              {word.value}
            </span>
          ) : null
        ) : word.removed ? (
          mode === "DiffRemoved" || mode === "DiffMixed" ? (
            <span
              className="bg-red-600/30 mr-0.5"
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
