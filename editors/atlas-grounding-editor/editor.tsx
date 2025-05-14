import { type EditorProps } from "document-model";
import { type AtlasGroundingDocument } from "../../document-models/atlas-grounding/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { GroundingForm } from "./components/GroundingForm.js";

export type IProps = EditorProps<AtlasGroundingDocument>;

export default function Editor(props: IProps) {
  return (
    <EditorLayout
      title="Grounding Document"
      notionId={props.document.state.global.notionId}
      readOnlyModeEnabled={true}
      splitModeEnabled={true}
    >
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView
            left={
              <GroundingForm
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
                mode={isEditMode ? "edition" : "removal"}
              />
            }
            right={
              <GroundingForm
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
                mode={isEditMode ? "mixed" : "addition"}
              />
            }
          />
        ) : (
          <GroundingForm
            document={props.document}
            dispatch={props.dispatch}
            mode={isEditMode ? "edition" : "mixed"}
          />
        )
      }
    </EditorLayout>
  );
}
