import { cn } from "@powerhousedao/document-engineering/scalars";

interface FakeInputProps {
  children: React.ReactNode;
  className?: string;
  ellipsis?: boolean;
  multiline?: boolean;
  rows?: number;
}

export const FakeInput = ({
  children,
  className,
  ellipsis = true,
  multiline = false,
  rows = 3,
}: FakeInputProps) => {
  return (
    <div
      className={cn(
        "flex w-full rounded-md font-sans text-sm leading-5 font-normal text-gray-600",
        "cursor-not-allowed border border-gray-300 bg-transparent px-3 py-[7px]",
        !multiline && ellipsis && "truncate [&>span]:truncate",
        multiline && "overflow-x-hidden overflow-y-auto whitespace-pre-wrap",
        className,
      )}
      style={{
        minHeight: multiline ? `${rows * 1.5}rem` : "2.25rem",
        maxHeight: multiline ? `${rows * 1.5}rem` : "2.25rem",
        ...(multiline && {
          wordBreak: "break-word",
        }),
      }}
    >
      {children}
    </div>
  );
};
