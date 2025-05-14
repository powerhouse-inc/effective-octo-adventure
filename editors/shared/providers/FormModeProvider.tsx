import type React from "react";
import { createContext, useContext } from "react";
import { type ViewMode } from "@powerhousedao/document-engineering/scalars";

interface FormModeContextType {
  mode: ViewMode;
}
const FormModeContext = createContext<FormModeContextType>({
  mode: "edition",
});

interface FormModeProviderProps {
  children: React.ReactNode;
  mode: ViewMode;
}

/**
 * Provides the form mode to the form components.
 * @param children - The children components.
 * @param mode - The form mode.
 */
const FormModeProvider = ({ children, mode }: FormModeProviderProps) => {
  return (
    <FormModeContext.Provider value={{ mode }}>
      {children}
    </FormModeContext.Provider>
  );
};

/**
 * Returns the form mode.
 * @returns The form mode.
 */
const useFormMode = () => {
  const { mode } = useContext(FormModeContext);
  return mode;
};

export { FormModeProvider, useFormMode };
