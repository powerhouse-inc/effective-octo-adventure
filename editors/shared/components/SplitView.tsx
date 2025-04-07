import type { ReactNode } from "react";

interface SplitViewProps {
  left: ReactNode;
  right: ReactNode;
}

export function SplitView({ left, right }: SplitViewProps) {
  return (
    <div className="flex flex-row gap-4">
      <div className="flex-1">{left}</div>
      <div className="flex-1">{right}</div>
    </div>
  );
}
