import { type EditorProps } from "document-model";
import { type AtlasExploratoryDocument } from "../../document-models/atlas-exploratory/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { ExploratoryForm } from "./components/ExploratoryForm.js";

export type IProps = EditorProps<AtlasExploratoryDocument>;

export default function Editor(props: IProps) {
  const documentState = props.document.state.global;
  const isAligned = documentState.findings.isAligned;

  return (
    <EditorLayout
      title="Exploratory Document"
      notionId={documentState.notionId}
    >
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView
            left={
              <ExploratoryForm
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
                mode={isEditMode ? "Edition" : "DiffRemoved"}
                isAligned={isAligned}
              />
            }
            right={
              <ExploratoryForm
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
                mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
                isAligned={isAligned}
              />
            }
          />
        ) : (
          <ExploratoryForm
            document={props.document}
            dispatch={props.dispatch}
            mode={isEditMode ? "Edition" : "DiffMixed"}
            isAligned={isAligned}
          />
        )
      }
    </EditorLayout>
  );
}
