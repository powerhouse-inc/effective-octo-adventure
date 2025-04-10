import { type EditorProps } from "document-model";
import {
  actions,
  type Status,
  type AtlasScopeDocument,
  type GlobalTag,
} from "../../document-models/atlas-scope/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { ScopeForm } from "./components/ScopeForm.js";
import { getStringValue } from "../shared/utils/utils.js";

export type IProps = EditorProps<AtlasScopeDocument>;
export default function Editor(props: IProps) {
  const { dispatch } = props;
  const documentState = props.document.state.global;
  const newMomentdocumentState = {
    ...documentState,
    originalContextData: documentState.originalContextData?.[0]?.id || "",
  };

  const onSubmit = (data: Record<string, any>) => {
    if (data["docNo"] !== undefined) {
      dispatch(actions.setDocNumber({ docNo: getStringValue(data["docNo"]) }));
    }
    if (data["name"] !== undefined) {
      dispatch(actions.setScopeName({ name: getStringValue(data["name"]) }));
    }
    if (data["masterStatus"] !== undefined) {
      dispatch(
        actions.setMasterStatus({
          masterStatus: data["masterStatus"] as Status,
        }),
      );
    }
    if (data["content"] !== undefined) {
      dispatch(
        actions.setContent({ content: getStringValue(data["content"]) }),
      );
    }
    if (data["provenance"] !== undefined) {
      dispatch(
        actions.setProvenance({ provenance: data["provenance"] as string }),
      );
    }
    if (data["originalContextData"] !== undefined) {
      dispatch(
        actions.addContextData({ id: getStringValue(data["originalContextData"]) }),
      );
    }
    if (data["globalTags"] !== undefined) {
      const newTags = data["globalTags"] as GlobalTag[];
      const currentTags = documentState.globalTags;

      if (data["globalTags"] === null) {
        dispatch(actions.removeTags({ tags: currentTags }));
        return;
      }

      // Tags to add (are in newTags but not in currentTags)
      const tagsToAdd = newTags.filter((tag) => !currentTags.includes(tag));
      if (tagsToAdd.length > 0) {
        dispatch(actions.addTags({ newTags: tagsToAdd }));
      }

      // Tags to remove (are in currentTags but not in newTags)
      const tagsToRemove = currentTags.filter((tag) => !newTags.includes(tag));
      if (tagsToRemove.length > 0) {
        dispatch(actions.removeTags({ tags: tagsToRemove }));
      }
    }
  };

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
                onSubmit={onSubmit}
                documentState={newMomentdocumentState}
                mode={isEditMode ? "Edition" : "DiffRemoved"}
                isSplitMode={isSplitMode}
              />
            }
            right={
              <ScopeForm
                onSubmit={onSubmit}
                documentState={newMomentdocumentState}
                mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
                isSplitMode={isSplitMode}
              />
            }
          />
        ) : (
          <ScopeForm
            onSubmit={onSubmit}
            documentState={newMomentdocumentState}
            mode={isEditMode ? "Edition" : "Readonly"}
          />
        )
      }
    </EditorLayout>
  );
}
