import type { DocumentDriveDocument } from "document-drive";
import { type ViewMode } from "@powerhousedao/document-engineering/scalars";
import { type AtlasExploratoryDocument } from "../../../document-models/atlas-exploratory/index.js";
import { type AtlasFoundationDocument } from "../../../document-models/atlas-foundation/index.js";
import { type AtlasGroundingDocument } from "../../../document-models/atlas-grounding/index.js";
import { type AtlasMultiParentDocument } from "../../../document-models/atlas-multi-parent/index.js";
import { type AtlasScopeDocument } from "../../../document-models/atlas-scope/index.js";
import { type AtlasSetDocument } from "../../../document-models/atlas-set/index.js";

export type AtlasDocument =
  | AtlasExploratoryDocument
  | AtlasFoundationDocument
  | AtlasGroundingDocument
  | AtlasMultiParentDocument
  | AtlasScopeDocument
  | AtlasSetDocument;

export const getCardVariant = (mode: ViewMode) => {
  return mode === "edition" ? "blue" : mode === "removal" ? "gray" : "green";
};

export const getTagText = (mode: ViewMode) => {
  return mode === "edition"
    ? "Edition Atlas"
    : mode === "removal"
      ? "Official Atlas"
      : "Atlas Draft";
};

// Helper function to handle null and undefined values
export const getStringValue = (value: any): string => {
  if (value === null || value === undefined) {
    return "";
  }
  return value as string;
};

export const getRemoteDriveUrl = (drive: DocumentDriveDocument) => {
  const trigger = drive.state.local.triggers.find(
    (trigger) => trigger.data?.url,
  );
  return trigger?.data?.url || null;
};

export const getTitleText = (docNo: string, name: string) => {
  if (docNo !== "" && name !== "") {
    return `${docNo} - ${name}`;
  }
  if (docNo !== "" && name === "") {
    return docNo;
  }
  if (docNo === "" && name !== "") {
    return name;
  }
  return "Title not available";
};

export const parseTitleText = (title: string) => {
  if (title === "") return { docNo: "", name: "" };
  if (title.includes(" - ")) {
    const parts = title.split(" - ");
    return { docNo: parts[0], name: parts[1] };
  }
  return { docNo: "", name: title };
};

export const transformUrl = (url: string): string => {
  return encodeURIComponent(url).replace(/\./g, "%2E");
};

export const getBaseDocumentTimestamp = (document: AtlasDocument): string => {
  const firstOperation = document.operations?.global?.find(
    (operation) => operation.index === 0,
  );

  if (firstOperation !== undefined) {
    return firstOperation.timestamp;
  }

  if (document.initialState?.created) {
    return document.initialState.created;
  }

  // fallback to current date if nothing is available
  return new Date().toISOString();
};

export const shouldShowSkeleton = (
  mode: ViewMode,
  baseDocument: AtlasDocument | null,
) => {
  return mode !== "edition" && baseDocument === null;
};

interface ShowLastElementOptions {
  mode: ViewMode;
  isSplitMode?: boolean;
  contextDataLength: number;
}

export function shouldShowLastElement({
  mode,
  isSplitMode = false,
  contextDataLength,
}: ShowLastElementOptions): boolean {
  const hasNoContextData = contextDataLength === 0;

  switch (mode) {
    case "edition":
      return true;

    case "addition":
    case "removal":
      return hasNoContextData && isSplitMode;
    case "mixed":
      return hasNoContextData;
    default:
      return false;
  }
}
