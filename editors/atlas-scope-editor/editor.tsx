import { type EditorProps } from "document-model";
import { type AtlasScopeDocument } from "../../document-models/atlas-scope/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { ScopeForm } from "./components/ScopeForm.js";

export type IProps = EditorProps<AtlasScopeDocument>;
export default function Editor(props: IProps) {
  return (
    <EditorLayout
      title="Atlas Explorer - The Support Scope"
      notionId={props.document.state.global.notionId}
    >
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView
            left={
              <ScopeForm
                document={props.document}
                dispatch={props.dispatch}
                mode={isEditMode ? "Edition" : "DiffRemoved"}
                isSplitMode={isSplitMode}
              />
            }
            right={
              <ScopeForm
                document={props.document}
                dispatch={props.dispatch}
                mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
                isSplitMode={isSplitMode}
              />
            }
          />
        ) : (
          <ScopeForm
            document={props.document}
            dispatch={props.dispatch}
            mode={isEditMode ? "Edition" : "Readonly"}
          />
        )
      }
    </EditorLayout>
  );
}
