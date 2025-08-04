"use client";
import { cn } from "@powerhousedao/document-engineering/scalars";
import { useState } from "react";
interface ToggleProps {
  options: string[];
  defaultSelected?: number;
  onChange?: (selectedIndex: number) => void;
  className?: string;
}

export default function ToggleSwitch({
  options = [],
  defaultSelected = 1,
  onChange,
  className,
}: ToggleProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected);
  if (options.length === 0) {
    return null;
  }

  const handleOptionClick = (index: number) => {
    setSelectedIndex(index);
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <div
      className={cn(
        "flex w-fit items-center rounded-[6px] border-[1px] border-gray-200 bg-slate-50 p-[2px]",
        className,
      )}
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionClick(index)}
          className={`flex h-8 min-w-fit cursor-pointer items-center justify-center rounded-md px-3 text-sm font-medium whitespace-nowrap transition-all duration-200 outline-none ${
            selectedIndex === index
              ? "bg-white text-gray-900 shadow-sm"
              : "bg-transparent text-gray-400"
          } `}
        >
          {option}
        </button>
      ))}
    </div>
  );
}
