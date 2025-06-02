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
      readOnlyModeEnabled={true}
      splitModeEnabled={true}
    >
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView
            left={
              <MultiParentForm
                context={props.context}
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
                mode={isEditMode ? "edition" : "removal"}
              />
            }
            right={
              <MultiParentForm
                context={props.context}
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
                mode={isEditMode ? "mixed" : "addition"}
              />
            }
          />
        ) : (
          <MultiParentForm
            context={props.context}
            document={props.document}
            dispatch={props.dispatch}
            mode={isEditMode ? "edition" : "mixed"}
          />
        )
      }
    </EditorLayout>
  );
}
