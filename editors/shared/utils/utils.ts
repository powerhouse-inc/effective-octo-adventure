import type { PHIDOption } from "@powerhousedao/document-engineering/ui";
import docsIndex from "../../../scripts/apply-changes/data/index.json" with { type: "json" };
import type { DocumentDriveDocument } from "document-drive";
import { type ViewMode } from "@powerhousedao/document-engineering/scalars";
import { type AtlasExploratoryDocument } from "../../../document-models/atlas-exploratory/index.js";
import { type AtlasFoundationDocument } from "../../../document-models/atlas-foundation/index.js";
import { type AtlasGroundingDocument } from "../../../document-models/atlas-grounding/index.js";
import { type AtlasMultiParentDocument } from "../../../document-models/atlas-multi-parent/index.js";
import { type AtlasScopeDocument } from "../../../document-models/atlas-scope/index.js";
import { type AtlasSetDocument } from "../../../document-models/atlas-set/index.js";

const filterPHIDOptions = (
  options: PHIDOption[],
  userInput: string,
  context?: Record<string, unknown>,
) => {
  const normalizedInput = userInput.toLowerCase();
  const allowUris = context?.allowUris as boolean;
  const allowedScopes = Array.isArray(context?.allowedScopes)
    ? context.allowedScopes
    : [];

  return options.filter((opt) => {
    const isUrl = opt.value.startsWith("phd://");

    if (!isUrl && !allowUris) {
      return false;
    }

    if (!isUrl && allowedScopes.length > 0) {
      const scope = opt.value.split(":").pop();
      if (scope && !allowedScopes.includes(scope)) {
        return false;
      }
    }

    const pathText = typeof opt.path === "object" ? opt.path.text : opt.path;

    return (
      opt.title?.toLowerCase().includes(normalizedInput) ||
      pathText?.toLowerCase().includes(normalizedInput) ||
      opt.value.toLowerCase().includes(normalizedInput) ||
      opt.description?.toLowerCase().includes(normalizedInput)
    );
  });
};

export const fetchPHIDOptions = (
  userInput: string,
  context?: Record<string, unknown>,
): PHIDOption[] => {
  return filterPHIDOptions(docsIndex as PHIDOption[], userInput, context);
};

export const fetchSelectedPHIDOption = (
  value: string,
): PHIDOption | undefined => {
  return (docsIndex as PHIDOption[]).find((option) => option.value === value);
};

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

export const getBaseDocumentTimestamp = (
  document:
    | AtlasExploratoryDocument
    | AtlasFoundationDocument
    | AtlasGroundingDocument
    | AtlasMultiParentDocument
    | AtlasScopeDocument
    | AtlasSetDocument,
): string => {
  const firstOperation = document.operations?.global?.find(
    (operation) => operation.index === 0,
  );

  if (firstOperation) {
    // add 30s of margin
    const resultDate = new Date(firstOperation.timestamp);
    resultDate.setUTCSeconds(resultDate.getUTCSeconds() + 30);
    return resultDate.toISOString();
  }

  if (document.initialState?.created) {
    return document.initialState.created;
  }

  // fallback to current datetime if nothing is available
  return new Date().toISOString();
};
