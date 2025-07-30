import { createContext, type ReactNode, useState } from "react";
import { type AtlasDocument } from "../utils/utils.js";

type BaseDocumentCacheContextType = {
  getFromBaseDocumentCache: (documentId: string) => AtlasDocument | undefined;
  setInBaseDocumentCache: (documentId: string, document: AtlasDocument) => void;
};

export const BaseDocumentCacheContext =
  createContext<BaseDocumentCacheContextType | null>(null);

interface BaseDocumentCacheProviderProps {
  children: ReactNode;
}

export const BaseDocumentCacheProvider = ({
  children,
}: BaseDocumentCacheProviderProps) => {
  const [baseDocumentCache] = useState(() => new Map<string, AtlasDocument>());

  const value = {
    getFromBaseDocumentCache: (documentId: string) =>
      baseDocumentCache.get(documentId),
    setInBaseDocumentCache: (documentId: string, document: AtlasDocument) => {
      baseDocumentCache.set(documentId, document);
    },
  };

  return (
    <BaseDocumentCacheContext.Provider value={value}>
      {children}
    </BaseDocumentCacheContext.Provider>
  );
};
