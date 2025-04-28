import { type EditorMode } from "../../shared/types.js";
import { type IProps } from "../editor.js";

interface SetFormProps extends Pick<IProps, "document" | "dispatch"> {
  mode: EditorMode;
  isSplitMode?: boolean;
}

export function SetForm({
  document,
  dispatch,
  mode,
  isSplitMode,
}: SetFormProps) {
  return (
    <div>
      Work in progress! {mode} {isSplitMode ? "split" : "single"}
    </div>
  );
}
