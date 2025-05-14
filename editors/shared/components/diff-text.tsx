import { useMemo } from "react";
import { diffSentences, diffWords } from "diff";
import { cn, type ViewMode } from "@powerhousedao/document-engineering/scalars";

interface DiffTextProps {
  baseline: string;
  value: string;
  mode: ViewMode;
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
          mode === "addition" || mode === "mixed" ? (
            <span
              className="bg-green-600/30 mr-1 text-gray-700"
              key={`${word.value}-${index}`}
            >
              {word.value}
            </span>
          ) : null
        ) : word.removed ? (
          mode === "removal" || mode === "mixed" ? (
            <span
              className="bg-red-600/30 text-gray-700 mr-1"
              key={`${word.value}-${index}`}
            >
              {word.value}
            </span>
          ) : null
        ) : (
          <span className="mr-1" key={`${word.value}-${index}`}>
            {word.value}
          </span>
        );
      })}
    </span>
  );
};
