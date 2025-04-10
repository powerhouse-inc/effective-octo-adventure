import { cn } from "@powerhousedao/design-system/scalars";
import { PropsWithChildren, ReactNode } from "react";

interface PositionedWrapperProps extends PropsWithChildren {
  isSplitMode?: boolean;
  className?: string;
  height?: number;
}

export function PositionedWrapper({
  children,
  isSplitMode,
  className,
  height=65,
}: PositionedWrapperProps) {
  return (
    isSplitMode ? (
      <div
        className={cn(
          "relative",
          isSplitMode ? `w-full h-[${height}px]` : "w-1/2",
          className
        )}
      >
        <div className="absolute inset-0 overflow-hidden">
          {children}
        </div>
      </div>
    ) : (
      <div className={cn(isSplitMode ? "w-full" : "w-1/2", className)}>
        {children}
      </div>
    )
  );
} 