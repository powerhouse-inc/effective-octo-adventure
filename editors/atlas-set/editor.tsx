import { type EditorProps } from "document-model";
import { type AtlasSetDocument } from "../../document-models/atlas-set/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";

export type IProps = EditorProps<AtlasSetDocument>;
export default function Editor(props: IProps) {
  return (
    <EditorLayout title="Atlas Explorer - The Support Scope" notionId={""}>
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView left={<div>Left</div>} right={<div>Right</div>} />
        ) : (
          <div>Single</div>
        )
      }
    </EditorLayout>
  );
}
