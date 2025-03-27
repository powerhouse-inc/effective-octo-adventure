"use client"

import { useState } from "react"

interface ToggleProps {
  options: string[]
  defaultSelected?: number
  onChange?: (selectedOption: string, selectedIndex: number) => void
}

export default function ToggleSwitch({ options = ["Split", "Unified"], defaultSelected = 1, onChange }: ToggleProps) {
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected)

  const handleOptionClick = (index: number) => {
    setSelectedIndex(index)
    if (onChange) {
      onChange(options[index], index)
    }
  }

  return (
    <div
      style={{
        display: "flex",
        borderRadius: "8px",
        backgroundColor: "#f0f0f0",
        padding: "3px",
        width: "fit-content",
        boxShadow: "0 1px 3px rgba(0, 0, 0, 0.05)",
      }}
    >
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => handleOptionClick(index)}
          style={{
            padding: "6px 16px",
            border: "none",
            borderRadius: "6px",
            backgroundColor: selectedIndex === index ? "white" : "transparent",
            color: selectedIndex === index ? "#000000" : "#9ca3af",
            fontWeight: selectedIndex === index ? "500" : "400",
            cursor: "pointer",
            transition: "all 0.2s ease",
            fontSize: "14px",
            boxShadow: selectedIndex === index ? "0 1px 2px rgba(0, 0, 0, 0.05)" : "none",
            outline: "none",
            height: "30px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {option}
        </button>
      ))}
    </div>
  )
}


