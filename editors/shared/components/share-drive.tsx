import { Button, Icon, toast } from "@powerhousedao/design-system";
import { useCallback } from "react";
import { Link2 } from "lucide-react";
import { cn } from "@powerhousedao/design-system/scalars";

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
            className="text-blue-500 font-medium"
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
        "flex h-8 items-center gap-x-2 rounded bg-gray-200 border border-gray-300 px-3 text-sm font-semibold text-gray-900 active:opacity-50 hover:opacity-75 cursor-pointer",
        classnamme,
      )}
    >
      Share Drive
      <Link2 size={16} />
    </button>
  );
}
