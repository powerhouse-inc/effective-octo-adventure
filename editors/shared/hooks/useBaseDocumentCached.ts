import { useState, useEffect, useContext } from "react";
import {
  getBaseDocumentTimestamp,
  type AtlasDocument,
} from "../utils/utils.js";
import { type Operation } from "document-model";
import { BaseDocumentCacheContext } from "../providers/BaseDocumentCacheProvider.js";

// Replacement for getRevisionFromDate from @powerhousedao/common
const getRevisionFromDate = (
  startDate: Date,
  endDate: Date,
  operations: Operation[],
): number => {
  const startTimestamp = startDate.getTime();
  const endTimestamp = endDate.getTime();

  // Find the last operation within the time range
  for (let i = operations.length - 1; i >= 0; i--) {
    const opTimestamp = new Date(operations[i].timestampUtcMs).getTime();
    if (opTimestamp >= startTimestamp && opTimestamp <= endTimestamp) {
      return operations[i].index;
    }
  }

  // If no operation found in range, return the first operation's index or 0
  return operations.length > 0 ? operations[0].index : 0;
};

const loadBaseDocument = async <T extends AtlasDocument>(
  document: T,
  getDocumentRevision: ((options: { revisions: { global: number } }) => Promise<unknown>) | undefined,
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
  context: { getDocumentRevision?: (options: { revisions: { global: number } }) => Promise<unknown> },
): T | null {
  const cacheContext = useContext(BaseDocumentCacheContext);
  if (!cacheContext) {
    throw new Error(
      "useBaseDocumentCached must be used within BaseDocumentCacheProvider",
    );
  }

  const { getFromBaseDocumentCache, setInBaseDocumentCache } = cacheContext;
  const { getDocumentRevision } = context;

  const cachedBaseDocument = getFromBaseDocumentCache(document.header.id);
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
          setInBaseDocumentCache(document.header.id, loadedBaseDocument);
          setBaseDocument(loadedBaseDocument);
        }
      } catch (error) {
        console.error("Error saving base document in cache: ", error);
      }
    };

    getBaseDocument();
  }, [cachedBaseDocument, document.header.id]);

  return baseDocument;
}
