import { useState, useEffect, useMemo } from "react";
import { getRevisionFromDate } from "@powerhousedao/common";
import { getBaseDocumentTimestamp } from "../utils/utils.js";
import type { EditorContext } from "document-model";
import { type AtlasExploratoryDocument } from "../../../document-models/atlas-exploratory/index.js";
import { type AtlasFoundationDocument } from "../../../document-models/atlas-foundation/index.js";
import { type AtlasGroundingDocument } from "../../../document-models/atlas-grounding/index.js";
import { type AtlasMultiParentDocument } from "../../../document-models/atlas-multi-parent/index.js";
import { type AtlasScopeDocument } from "../../../document-models/atlas-scope/index.js";
import { type AtlasSetDocument } from "../../../document-models/atlas-set/index.js";

type AtlasDocument =
  | AtlasExploratoryDocument
  | AtlasFoundationDocument
  | AtlasGroundingDocument
  | AtlasMultiParentDocument
  | AtlasScopeDocument
  | AtlasSetDocument;

export function useBaseDocument<T extends AtlasDocument>(
  document: T,
  context: EditorContext,
): T {
  const [baseDocument, setBaseDocument] = useState<T>(document);

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
