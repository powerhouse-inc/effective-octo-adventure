import { type ViewMode } from "@powerhousedao/document-engineering/scalars";

export type EditorMode =
  | "Edition"
  | "Readonly"
  | "DiffRemoved"
  | "DiffAdditions"
  | "DiffMixed";

export type DiffMode = "words" | "sentences";

export interface BaseDiffFieldProps {
  mode: ViewMode;
  baselineValue?: string;
  diffMode?: DiffMode;
}
