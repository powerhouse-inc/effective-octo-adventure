import { Skeleton } from "./ui/skeleton.js";
import { cn } from "@powerhousedao/document-engineering/scalars";

interface FieldSkeletonProps {
  className?: string;
}

export const FieldSkeleton = ({ className }: FieldSkeletonProps) => (
  <div className={cn("w-full flex flex-col gap-2")}>
    <Skeleton className={cn("max-w-40 h-4 mb-[3px]")} />
    <Skeleton className={className} />
  </div>
);
