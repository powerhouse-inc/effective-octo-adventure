import type { ReactNode } from "react";

interface SplitViewProps {
  left: ReactNode;
  right: ReactNode;
}

export function SplitView({ left, right }: SplitViewProps) {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1 w-1/2 min-w-1/2">{left}</div>
      <div className="flex-1 w-1/2 min-w-1/2">{right}</div>
    </div>
  );
}
