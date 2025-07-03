import { useState, useEffect } from "react";
import { getRevisionFromDate } from "@powerhousedao/common";
import {
  getBaseDocumentTimestamp,
  type AtlasDocument,
} from "../utils/utils.js";
import type { EditorContext } from "document-model";

export function useBaseDocument<T extends AtlasDocument>(
  document: T,
  context: EditorContext,
): T | null {
  const [baseDocument, setBaseDocument] = useState<T | null>(null);

  const { getDocumentRevision } = context;

  useEffect(() => {
    const loadBaseDocument = async () => {
      if (getDocumentRevision === undefined) {
        return;
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

        setBaseDocument(baseDocument as T);
      } catch (error) {
        console.error("Error loading base document: ", error);
      }
    };

    loadBaseDocument();
  }, []);

  return baseDocument;
}
