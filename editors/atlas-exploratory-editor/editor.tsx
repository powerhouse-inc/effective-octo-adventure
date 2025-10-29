import { type EditorProps } from "document-model";
import { type AtlasExploratoryDocument, type AtlasExploratoryAction } from "../../document-models/atlas-exploratory/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { ExploratoryForm } from "./components/ExploratoryForm.js";

export type IProps = EditorProps & {
  document: AtlasExploratoryDocument;
  context?: any;
  dispatch: (action: AtlasExploratoryAction) => void;
};

export default function Editor(props: IProps) {
  const documentState = props.document.state.global;

  return (
    <EditorLayout
      title="Exploratory Document"
      notionId={documentState.notionId}
      splitModeEnabled={true}
      readOnlyModeEnabled={true}
    >
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView
            left={
              <ExploratoryForm
                context={props.context}
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
                mode={isEditMode ? "edition" : "removal"}
              />
            }
            right={
              <ExploratoryForm
                context={props.context}
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
                mode={isEditMode ? "mixed" : "addition"}
              />
            }
          />
        ) : (
          <ExploratoryForm
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
