import type { EditorMode } from "../types.js";

/**
 * @deprecated
 */
export function isFormReadOnly(mode: EditorMode) {
  return (
    mode === "Readonly" ||
    mode === "DiffRemoved" ||
    mode === "DiffAdditions" ||
    mode === "DiffMixed"
  );
}
