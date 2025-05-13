import type { PHIDOption } from "@powerhousedao/document-engineering/ui";
import docsIndex from "../../../scripts/apply-changes/data/index.json" with { type: "json" };
import { type EditorMode } from "../types.js";
import type { DocumentDriveDocument } from "document-drive";

/**
 * @deprecated Use fetchPHIDOptions & fetchSelectedPHIDOption instead
 */
export const cb = async (phid: string): Promise<PHIDOption[]> =>
  (docsIndex as PHIDOption[]).filter(
    (entry) => entry.value.includes(phid) || (entry.title || "").includes(phid),
  );

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

export const getCardVariant = (mode: EditorMode) => {
  return mode === "Edition"
    ? "blue"
    : mode === "Readonly" || mode === "DiffRemoved"
      ? "gray"
      : "green";
};

export const getTagText = (mode: string) => {
  return mode === "Edition"
    ? "Edition Atlas"
    : mode === "Readonly" || mode === "DiffRemoved"
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

export const getViewMode = (mode: EditorMode) => {
  switch (mode) {
    case "Edition":
      return "edition";
    case "DiffRemoved":
      return "removal";
    case "DiffAdditions":
      return "addition";
    case "DiffMixed":
      return "mixed";
  }
};
