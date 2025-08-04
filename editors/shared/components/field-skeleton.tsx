import { Skeleton } from "./ui/skeleton.js";
import { cn } from "@powerhousedao/document-engineering/scalars";

interface FieldSkeletonProps {
  className?: string;
}

export const FieldSkeleton = ({ className }: FieldSkeletonProps) => (
  <div className={cn("flex w-full flex-col gap-2")}>
    <Skeleton className={cn("mb-[3px] h-4 max-w-40")} />
    <Skeleton className={className} />
  </div>
);
