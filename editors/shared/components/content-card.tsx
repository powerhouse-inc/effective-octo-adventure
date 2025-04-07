import type { PropsWithChildren } from "react";
import TagStatus from "./tags-status.js";
interface AtlasCardProps extends PropsWithChildren {
  tagText?: string;
  variant?: "gray" | "green";
  className?: string;
}

const ContentCard = ({
  tagText = "Official Atlas",
  variant = "gray",
  children,
  className,
}: AtlasCardProps) => {
  return (
    <div
      className={`flex flex-col w-full border border-gray-200 rounded-md  bg-gray-50 ${className}`}
    >
      <div className="relative">
        <div className="absolute -top-3 left-4">
          <TagStatus text={tagText} variant={variant} />
        </div>
        <div className="flex flex-col gap-4 pt-6 px-4 pb-4">{children}</div>
      </div>
    </div>
  );
};

export default ContentCard;
