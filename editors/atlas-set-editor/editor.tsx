import { type EditorProps } from "document-model";
import { type AtlasSetDocument, type AtlasSetAction } from "../../document-models/atlas-set/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { SetForm } from "./components/SetForm.js";

export type IProps = EditorProps & {
  document: AtlasSetDocument;
  context?: any;
  dispatch: (action: AtlasSetAction) => void;
};
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
                context={props.context}
                document={props.document}
                dispatch={props.dispatch}
                mode={isEditMode ? "edition" : "removal"}
                isSplitMode={isSplitMode}
              />
            }
            right={
              <SetForm
                context={props.context}
                document={props.document}
                dispatch={props.dispatch}
                mode={isEditMode ? "mixed" : "addition"}
                isSplitMode={isSplitMode}
              />
            }
          />
        ) : (
          <SetForm
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
