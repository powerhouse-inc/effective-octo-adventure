import { cn } from "@powerhousedao/document-engineering/scalars";

export const getFlexLayoutClassName = (
  isSplitMode: boolean,
  ...additionalClasses: string[]
) => {
  return cn(
    "flex gap-2",
    isSplitMode ? "flex-col" : "flex-row",
    ...additionalClasses,
  );
};

export const getWidthClassName = (
  isSplitMode: boolean,
  ...additionalClasses: string[]
) => {
  return cn(isSplitMode ? "w-full" : "w-1/2", ...additionalClasses);
};
