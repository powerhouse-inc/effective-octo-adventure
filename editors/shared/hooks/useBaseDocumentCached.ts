import { useState, useEffect, useContext } from "react";
import { getRevisionFromDate } from "@powerhousedao/common";
import {
  getBaseDocumentTimestamp,
  type AtlasDocument,
} from "../utils/utils.js";
import type { EditorContext } from "document-model";
import { BaseDocumentCacheContext } from "../providers/BaseDocumentCacheProvider.js";

const loadBaseDocument = async <T extends AtlasDocument>(
  document: T,
  getDocumentRevision: EditorContext["getDocumentRevision"],
): Promise<T | null> => {
  if (!getDocumentRevision) {
    return null;
  }

  try {
    const baseDocumentTimestamp = getBaseDocumentTimestamp(document);
    const endDate = new Date(baseDocumentTimestamp);
    endDate.setUTCSeconds(endDate.getUTCSeconds() + 30);

    const operations = document.operations.global.sort(
      (a, b) => b.index - a.index,
    );

    const revision = getRevisionFromDate(
      new Date(baseDocumentTimestamp),
      endDate,
      operations,
    );

    const baseDocument = await getDocumentRevision({
      revisions: { global: revision },
    });

    return baseDocument as T;
  } catch (error) {
    console.error("Error loading base document: ", error);
    return null;
  }
};

export function useBaseDocumentCached<T extends AtlasDocument>(
  document: T,
  context: EditorContext,
): T | null {
  const cacheContext = useContext(BaseDocumentCacheContext);
  if (!cacheContext) {
    throw new Error(
      "useBaseDocumentCached must be used within BaseDocumentCacheProvider",
    );
  }

  const { getFromBaseDocumentCache, setInBaseDocumentCache } = cacheContext;
  const { getDocumentRevision } = context;

  const cachedBaseDocument = getFromBaseDocumentCache(document.id);
  const [baseDocument, setBaseDocument] = useState<T | null>(
    cachedBaseDocument ? (cachedBaseDocument as T) : null,
  );

  useEffect(() => {
    if (cachedBaseDocument) {
      setBaseDocument(cachedBaseDocument as T);
      return;
    }

    const getBaseDocument = async () => {
      const loadedBaseDocument = await loadBaseDocument(
        document,
        getDocumentRevision,
      );

      try {
        if (loadedBaseDocument) {
          setInBaseDocumentCache(document.id, loadedBaseDocument);
          setBaseDocument(loadedBaseDocument);
        }
      } catch (error) {
        console.error("Error saving base document in cache: ", error);
      }
    };

    getBaseDocument();
  }, [cachedBaseDocument, document.id]);

  return baseDocument;
}
