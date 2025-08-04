import type { PropsWithChildren } from "react";
import TagStatus from "./tags-status.js";
import { cn } from "@powerhousedao/document-engineering/scalars";
interface AtlasCardProps extends PropsWithChildren {
  tagText?: string;
  variant?: "gray" | "green" | "blue";
  className?: string;
  showTag?: boolean;
}

const ContentCard = ({
  tagText = "Official Atlas",
  variant = "gray",
  children,
  className,
  showTag = false,
}: AtlasCardProps) => {
  return (
    <div
      className={cn(
        "flex w-full flex-col rounded-md border border-gray-200 bg-gray-50",
        className,
      )}
    >
      <div className="relative">
        {showTag && (
          <div className="absolute -top-3 left-4">
            <TagStatus text={tagText} variant={variant} />
          </div>
        )}
        <div className="flex flex-col gap-4 px-4 pt-6 pb-4">{children}</div>
      </div>
    </div>
  );
};

export default ContentCard;
