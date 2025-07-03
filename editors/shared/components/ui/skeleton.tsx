import React from "react";
import { cn } from "@powerhousedao/document-engineering/scalars";

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div"> & {
    label?: string;
  }
>(({ className, label, ...props }, ref) => (
  <div className="w-full flex flex-col gap-2">
    {label && (
      <label className="mb-[3px] text-sm font-medium leading-4 text-gray-700 cursor-not-allowed">
        {label}
      </label>
    )}
    <div
      ref={ref}
      className={cn(
        "w-full h-9 animate-pulse rounded-md bg-gray-200",
        className,
      )}
      {...props}
    />
  </div>
));

Skeleton.displayName = "Skeleton";

export { Skeleton };
