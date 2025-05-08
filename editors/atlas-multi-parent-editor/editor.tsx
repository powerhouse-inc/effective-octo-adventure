import { type EditorProps } from "document-model";
import { type AtlasMultiParentDocument } from "../../document-models/atlas-multi-parent/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { MultiParentForm } from "./components/MultiparentForm.js";

export type IProps = EditorProps<AtlasMultiParentDocument>;

export default function Editor(props: IProps) {
  return (
    <EditorLayout
      title="Multi-Parent Document"
      notionId={props.document.state.global.notionId}
      splitModeEnabled={true}
      readOnlyModeEnabled={true}
    >
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView
            left={
              <MultiParentForm
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
                mode={isEditMode ? "Edition" : "DiffRemoved"}
              />
            }
            right={
              <MultiParentForm
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
                mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
              />
            }
          />
        ) : (
          <MultiParentForm
            document={props.document}
            dispatch={props.dispatch}
            mode={isEditMode ? "Edition" : "DiffMixed"}
          />
        )
      }
    </EditorLayout>
  );
}
