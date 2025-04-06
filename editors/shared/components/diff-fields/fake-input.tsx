import { cn } from "@powerhousedao/design-system/scalars";

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
        "flex w-full font-sans rounded-md text-sm font-normal leading-5 text-gray-600",
        "border border-gray-300 bg-transparent px-3 py-2 cursor-not-allowed",
        !multiline && ellipsis && "truncate [&>span]:truncate",
        className,
      )}
      style={{
        minHeight: multiline ? `${rows * 1.5}rem` : "2.25rem",
      }}
    >
      {children}
    </div>
  );
};
