import type { ReactNode } from "react";

interface SplitViewProps {
  left: ReactNode;
  right: ReactNode;
}

export function SplitView({ left, right }: SplitViewProps) {
  return (
    <div className="flex flex-row gap-4">
      <div className="w-1/2 min-w-1/2 flex-1">{left}</div>
      <div className="w-1/2 min-w-1/2 flex-1">{right}</div>
    </div>
  );
}
