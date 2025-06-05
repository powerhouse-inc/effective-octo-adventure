import { useCallback } from "react";
import {
  type DocumentLink,
  type FilterFn,
  useDocumentsLink,
} from "./useDocumentsLink.js";
import { documentLinksToPHIDOptions } from "../utils/phids.js";

type AllowedDocumentType =
  | "sky/atlas-foundation"
  | "sky/atlas-grounding"
  | "sky/atlas-exploratory"
  | "sky/atlas-multiparent"
  | "sky/atlas-set";

function foundationFilterFn(doc: DocumentLink): boolean {
  return ["sky/atlas-scope", "sky/atlas-foundation", "sky/atlas-set"].includes(
    doc.documentType,
  );
}

function groundingFilterFn(doc: DocumentLink): boolean {
  return (
    ["sky/atlas-foundation"].includes(doc.documentType) &&
    ["CORE", "ACTIVE_DATA_CONTROLLER"].includes(doc.atlasType ?? "")
  );
}

function exploratoryFilterFn(doc: DocumentLink): boolean {
  if (doc.documentType === "sky/atlas-exploratory") {
    return true;
  } else if (
    doc.documentType === "sky/atlas-grounding" &&
    doc.atlasType === "TENET"
  ) {
    return true;
  }

  return false;
}

function multiparentFilterFn(doc: DocumentLink): boolean {
  if (["sky/atlas-exploratory"].includes(doc.documentType)) {
    return true;
  } else if (
    doc.documentType === "sky/atlas-grounding" &&
    doc.atlasType === "TENET"
  ) {
    return true;
  } else if (
    doc.documentType === "sky/atlas-foundation" &&
    ["SECTION", "CORE"].includes(doc.atlasType ?? "")
  ) {
    return true;
  }

  return false;
}

function setFilterFn(doc: DocumentLink): boolean {
  return ["sky/atlas-set", "sky/atlas-foundation"].includes(doc.documentType);
}

const filterFnMap: Record<AllowedDocumentType, FilterFn> = {
  "sky/atlas-foundation": (doc) => foundationFilterFn(doc),
  "sky/atlas-grounding": (doc) => groundingFilterFn(doc),
  "sky/atlas-exploratory": (doc) => exploratoryFilterFn(doc),
  "sky/atlas-multiparent": (doc) => multiparentFilterFn(doc),
  "sky/atlas-set": (doc) => setFilterFn(doc),
};

export function useParentOptions(documentType: AllowedDocumentType) {
  const documentsLink = useDocumentsLink(filterFnMap[documentType]);
  const fetchOptionsCallback = useCallback(
    (value: string) => {
      const lowerCaseValue = value.toLowerCase();
      return documentLinksToPHIDOptions(documentsLink).filter((doc) => {
        const pathText =
          typeof doc.path === "object" ? doc.path.text : doc.path;
        return (
          doc.title?.toLowerCase().includes(lowerCaseValue) ||
          pathText?.toLowerCase().includes(lowerCaseValue) ||
          doc.value.toLowerCase().includes(lowerCaseValue)
        );
      });
    },
    [documentsLink],
  );

  return fetchOptionsCallback;
}
