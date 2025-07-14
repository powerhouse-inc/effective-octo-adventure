import { createContext, type ReactNode, useContext, useState } from "react";
export type MarkdownEditorMode = "preview" | "edit" | "live";

interface MarkdownEditorContextType {
  viewMarkdownMode: MarkdownEditorMode;
  setViewMarkdownMode: (mode: MarkdownEditorMode) => void;
}

const MarkdownEditorContext = createContext<
  MarkdownEditorContextType | undefined
>(undefined);

// Provider component
export function MarkdownEditorProvider({ children }: { children: ReactNode }) {
  const [viewMarkdownMode, setViewMarkdownMode] =
    useState<MarkdownEditorMode>("live");

  return (
    <MarkdownEditorContext.Provider
      value={{ viewMarkdownMode, setViewMarkdownMode }}
    >
      {children}
    </MarkdownEditorContext.Provider>
  );
}

// Hook to use the context
export function useMarkdownEditorMode() {
  const context = useContext(MarkdownEditorContext);
  if (context === undefined) {
    throw new Error(
      "useMarkdownEditorMode must be used within a MarkdownEditorProvider",
    );
  }
  return context;
}
