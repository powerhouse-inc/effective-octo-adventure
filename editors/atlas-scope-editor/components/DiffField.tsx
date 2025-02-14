import { diffSentences, diffWords } from "diff";
import { ReactNode } from "react";

type Props = {
  readonly value: string;
  readonly original: string;
  readonly diffSentences?: boolean;
  readonly hideAdditions?: boolean;
};

const wrapStrikeThrough = (inner: ReactNode, key: number) => (
  <span className="diff-strike" key={key}>
    {inner}
  </span>
);

export function DiffField(props: Props) {
  const wordsDiff = props.diffSentences
    ? diffSentences(props.original, props.value)
    : diffWords(props.original, props.value);

  const children = () => {
    let i = 0;
    return wordsDiff
      .filter((part) => !props.hideAdditions || !part.added)
      .map((part) => {
        const element = (
          <span
            className={
              part.added ? "diff-add" : part.removed ? "diff-del" : "diff-same"
            }
            key={i++}
          >
            {part.value}
          </span>
        );

        return part.removed ? wrapStrikeThrough(element, i++) : element;
      });
  };

  return <div className="diff-field">{children()}</div>;
}
