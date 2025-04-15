import { createContext, useContext, type ReactNode, useState } from "react";

// context type
export type ViewModeContextType = {
  isSplitMode: boolean;
  setIsSplitMode: (value: boolean) => void;
  isEditMode: boolean;
  setIsEditMode: (value: boolean) => void;
};

// context
export const ViewModeContext = createContext<ViewModeContextType | null>(null);

// context hook
export const useViewMode = () => {
  const context = useContext(ViewModeContext);
  if (!context) {
    throw new Error("useViewMode must be used within ViewModeProvider");
  }
  return context;
};

// provider props
interface ViewModeProviderProps {
  children: ReactNode;
}

export const ViewModeProvider = ({ children }: ViewModeProviderProps) => {
  // provider states
  const [isSplitMode, setIsSplitMode] = useState(false);
  const [isEditMode, setIsEditMode] = useState(true);

  // provider value
  const value = {
    isSplitMode,
    setIsSplitMode,
    isEditMode,
    setIsEditMode,
  };

  // provider
  return (
    <ViewModeContext.Provider value={value}>
      {children}
    </ViewModeContext.Provider>
  );
};
