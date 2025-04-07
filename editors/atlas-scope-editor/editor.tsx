import { type EditorProps } from "document-model";
import {
  actions,
  type Status,
  type AtlasScopeDocument,
  type GlobalTag,
} from "../../document-models/atlas-scope/index.js";
import { EditorLayout } from '../shared/components/EditorLayout.js';
import { SplitView } from '../shared/components/SplitView.js';
import { ScopeForm } from './components/ScopeForm.js';
import { hasValue } from "../shared/utils/utils.js";

export type IProps = EditorProps<AtlasScopeDocument>;
export default function Editor(props: IProps) {
  const { document, dispatch } = props
  const documentState = props.document.state.global;
  const newMomentdocumentState={
    ...documentState,
    originalContextData: documentState.originalContextData?.[0]?.id || "",
    
  }

  const onSubmit = (data: Record<string, any>) => {
    if (hasValue(data['docNo'])) {
      dispatch(actions.setDocNumber({ docNo: data['docNo'] as string }));
    }
    if (hasValue(data['name'])) {
      dispatch(actions.setScopeName({ name: data['name'] as string }));
    }
    if (hasValue(data['masterStatus'])) {
      dispatch(actions.setMasterStatus({ masterStatus: data['masterStatus'] as Status }));
    }
    if (hasValue(data['content'])) {
      dispatch(actions.setContent({ content: data['content'] as string }));
    }
    if (hasValue(data['provenance'])) {
      dispatch(actions.setProvenance({ provenance: data['provenance'] as string }));
    }
    if (hasValue(data['originalContextData'])) {
      dispatch(actions.addContextData({ id: data['originalContextData'] as string }));
    }
    if (data['globalTags'] !== undefined) {
      const newTags = data['globalTags'] as GlobalTag[];
      const currentTags = documentState.globalTags;

      if (data['globalTags'] === null) {
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
  }

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
            />
          }
          right={
            <ScopeForm
              onSubmit={onSubmit}
              documentState={newMomentdocumentState}
              mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
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