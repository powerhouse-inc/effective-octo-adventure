import type { PHIDOption } from "@powerhousedao/design-system/ui";
import docsIndex from "../../../scripts/apply-changes/data/index.json" with { type: "json" };
import { type EditorMode } from "../types.js";

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
  return mode === "Edition" || mode === "Readonly" ? "gray" : "green";
};

export const getTagText = (mode: string) => {
  return mode === "Edition" || mode === "Readonly"
    ? "Official Atlas"
    : "Atlas Draft";
};
