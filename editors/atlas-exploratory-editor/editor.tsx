import { type EditorProps } from "document-model";
import {
  actions,
  type AtlasExploratoryDocument,
  type EStatus,
  type EGlobalTag,
} from "../../document-models/atlas-exploratory/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { ExploratoryForm } from "./components/ExploratoryForm.js";

export type IProps = EditorProps<AtlasExploratoryDocument>;

export default function Editor(props: IProps) {
  const { dispatch } = props;
  const documentState = props.document.state.global;

  const onSubmit = (data: Record<string, any>) => {
    if (data["docNo"] !== undefined) {
      dispatch(actions.setDocNumber({ docNo: data["docNo"] as string }));
    }
    if (data["name"] !== undefined) {
      dispatch(actions.setExploratoryName({ name: data["name"] as string }));
    }
    if (data["masterStatus"] !== undefined) {
      dispatch(
        actions.setMasterStatus({
          masterStatus: data["masterStatus"] as EStatus,
        })
      );
    }
    if (data["content"] !== undefined) {
      dispatch(actions.setContent({ content: data["content"] as string }));
    }
    if (data["parent"] !== undefined) {
      dispatch(actions.setParent({ parent: [data["parent"] as string] }));
    }

    // TODO: save other fields

    if (data["tags"] !== undefined) {
      dispatch(actions.addTags({ newTags: [data["tags"] as EGlobalTag] }));
    }
  };

  return (
    <EditorLayout
      title="Exploratory Document"
      notionId={props.document.state.global.notionId}
    >
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView
            left={
              <ExploratoryForm
                onSubmit={onSubmit}
                documentState={documentState}
                mode={isEditMode ? "DiffMixed" : "DiffRemoved"}
              />
            }
            right={
              <ExploratoryForm
                onSubmit={onSubmit}
                documentState={documentState}
                mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
              />
            }
          />
        ) : (
          <ExploratoryForm
            onSubmit={onSubmit}
            documentState={documentState}
            mode={isEditMode ? "Edition" : "Readonly"}
          />
        )
      }
    </EditorLayout>
  );
}
