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
        "flex flex-col w-full mt-2 border border-gray-200 rounded-md bg-gray-50",
        className,
      )}
    >
      <div className="relative">
        {showTag && (
          <div className="absolute -top-3 left-4">
            <TagStatus text={tagText} variant={variant} />
          </div>
        )}
        <div className="flex flex-col gap-4 pt-6 px-4 pb-4">{children}</div>
      </div>
    </div>
  );
};

export default ContentCard;
