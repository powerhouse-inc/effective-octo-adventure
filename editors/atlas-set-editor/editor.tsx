import { type EditorProps } from "document-model";
import { type AtlasSetDocument } from "../../document-models/atlas-set/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { SetForm } from "./components/SetForm.js";

export type IProps = EditorProps<AtlasSetDocument>;
export default function Editor(props: IProps) {
  return (
    <EditorLayout
      title="Set Document"
      notionId={props.document.state.global.notionId}
      readOnlyModeEnabled={true}
      splitModeEnabled={true}
    >
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView
            left={
              <SetForm
                document={props.document}
                dispatch={props.dispatch}
                mode={isEditMode ? "Edition" : "DiffRemoved"}
                isSplitMode={isSplitMode}
              />
            }
            right={
              <SetForm
                document={props.document}
                dispatch={props.dispatch}
                mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
                isSplitMode={isSplitMode}
              />
            }
          />
        ) : (
          <SetForm
            document={props.document}
            dispatch={props.dispatch}
            mode={isEditMode ? "Edition" : "DiffMixed"}
          />
        )
      }
    </EditorLayout>
  );
}
