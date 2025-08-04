import { toast } from "@powerhousedao/design-system";
import { useCallback } from "react";
import { Link2 } from "lucide-react";
import { cn } from "@powerhousedao/document-engineering/scalars";

interface IProps {
  driveUrl: string;
  classnamme?: string;
}

export function ShareDrive({ driveUrl, classnamme }: IProps) {
  const onClick = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(driveUrl);
      toast("Drive link copied", {
        type: "connect-success",
      });
    } catch (err) {
      console.error("Failed to copy drive link: ", err);
      toast(
        <div>
          <p className="font-semibold">
            Could not copy the link. Please copy it manually:
          </p>
          <a
            className="font-medium text-blue-500"
            href={driveUrl}
            target="_blank"
            rel="noopener noreferrer"
            // block navgation but allow right click
            onClick={(e) => e.button === 0 && e.preventDefault()}
          >
            {driveUrl}
          </a>
        </div>,
        {
          type: "error",
        },
      );
    }
  }, [driveUrl]);

  return (
    <button
      onClick={onClick}
      className={cn(
        "flex h-8 cursor-pointer items-center gap-x-2 rounded border border-gray-300 bg-gray-200 px-3 text-sm font-semibold text-gray-900 hover:opacity-75 active:opacity-50",
        classnamme,
      )}
    >
      Share Drive
      <Link2 size={16} />
    </button>
  );
}
