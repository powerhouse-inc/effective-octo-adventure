import type { EditorMode } from "../types.js";

export function isFormReadOnly(mode: EditorMode) {
  return mode === "Readonly" || mode === "DiffRemoved" || mode === "DiffAdditions" || mode === "DiffMixed";
}
