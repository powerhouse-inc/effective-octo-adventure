import { cn } from "@powerhousedao/design-system/scalars";

interface FakeInputProps {
  children: React.ReactNode;
  className?: string;
  ellipsis?: boolean;
}

export const FakeInput = ({ children, className, ellipsis = true }: FakeInputProps) => {
  return (
    <div
      className={cn(
        "flex h-9 w-full font-sans rounded-md text-sm font-normal leading-5 text-gray-600",
        "border border-gray-300 bg-transparent px-3 py-2 cursor-not-allowed",
        ellipsis && "truncate [&>span]:truncate",
        className
      )}
    >
      {children}
    </div>
  );
};
