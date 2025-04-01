"use client"
import { useState } from "react"
interface ToggleProps {
  options: string[]
  defaultSelected?: number
  onChange?: (selectedIndex: number) => void

}

export default function ToggleSwitch({ options = [], defaultSelected = 1, onChange }: ToggleProps) {
  if (options.length === 0) {
    return null
  }
  const [selectedIndex, setSelectedIndex] = useState(defaultSelected)

  const handleOptionClick = (index: number) => {
    setSelectedIndex(index)
    if (onChange) {
      onChange(index)
    }
  }

  return (
    <div className="flex items-center p-0.5 bg-slate-50 w-fit h-9 rounded-[6px] border-[1px] border-slate-200 box-border"
    >
      {options.map((option, index) => (

        <button
          key={index}
          onClick={() => handleOptionClick(index)}
          className={`
            flex items-center justify-center h-8 px-3 rounded-md whitespace-nowrap min-w-fit
            font-medium text-sm cursor-pointer transition-all duration-200 outline-none
            ${selectedIndex === index 
              ? 'bg-white text-gray-900 shadow-sm' 
              : 'bg-transparent text-gray-400'
            }
          `}
        >
          {option}
        </button>
      )
      )}
    </div>
  )
}


