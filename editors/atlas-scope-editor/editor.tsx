import { type EditorProps } from "document-model";
import { type AtlasScopeDocument, type AtlasScopeAction } from "../../document-models/atlas-scope/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { ScopeForm } from "./components/ScopeForm.js";

export type IProps = EditorProps & {
  document: AtlasScopeDocument;
  context?: any;
  dispatch: (action: AtlasScopeAction) => void;
};
export default function Editor(props: IProps) {
  return (
    <EditorLayout
      title="Atlas Scope"
      notionId={props.document.state.global.notionId}
      readOnlyModeEnabled={true}
      splitModeEnabled={true}
    >
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView
            left={
              <ScopeForm
                context={props.context}
                document={props.document}
                dispatch={props.dispatch}
                mode={isEditMode ? "edition" : "removal"}
                isSplitMode={isSplitMode}
              />
            }
            right={
              <ScopeForm
                context={props.context}
                document={props.document}
                dispatch={props.dispatch}
                mode={isEditMode ? "mixed" : "addition"}
                isSplitMode={isSplitMode}
              />
            }
          />
        ) : (
          <ScopeForm
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
