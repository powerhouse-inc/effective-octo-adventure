import React from "react";
import { cn } from "@powerhousedao/document-engineering/scalars";

const Skeleton = React.forwardRef<
  HTMLDivElement,
  React.ComponentPropsWithoutRef<"div">
>(({ className, ...props }, ref) => (
  <div
    ref={ref}
    className={cn("w-full h-9 animate-pulse rounded-md bg-gray-200", className)}
    {...props}
  />
));

Skeleton.displayName = "Skeleton";

export { Skeleton };
