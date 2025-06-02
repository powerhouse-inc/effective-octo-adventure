import { type EditorProps } from "document-model";
import { type AtlasFoundationDocument } from "../../document-models/atlas-foundation/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { FoundationForm } from "./components/FoundationForm.js";

export type IProps = EditorProps<AtlasFoundationDocument>;

export default function Editor(props: IProps) {
  return (
    <EditorLayout
      title="Foundation Document"
      notionId={props.document.state.global.notionId}
      readOnlyModeEnabled={true}
      splitModeEnabled={true}
    >
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView
            left={
              <FoundationForm
                context={props.context}
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
                mode={isEditMode ? "edition" : "removal"}
              />
            }
            right={
              <FoundationForm
                context={props.context}
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
                mode={isEditMode ? "mixed" : "addition"}
              />
            }
          />
        ) : (
          <FoundationForm
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
