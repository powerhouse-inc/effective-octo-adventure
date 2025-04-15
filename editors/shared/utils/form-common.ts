import type { EditorMode } from "../types.js";

/**
 * @deprecated use EditorMode directly enum instead
 */
export function isFormReadOnly(mode: EditorMode) {
  return (
    mode === "Readonly" ||
    mode === "DiffRemoved" ||
    mode === "DiffAdditions" ||
    mode === "DiffMixed"
  );
}
