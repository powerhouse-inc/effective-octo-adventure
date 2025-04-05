export type EditorMode =
  | "Edition"
  | "Readonly"
  | "DiffRemoved"
  | "DiffAdditions"
  | "DiffMixed";

export type DiffMode = "words" | "sentences";

export interface BaseDiffFieldProps {
  mode: EditorMode;
  baselineValue?: string;
  diffMode?: DiffMode;
}
