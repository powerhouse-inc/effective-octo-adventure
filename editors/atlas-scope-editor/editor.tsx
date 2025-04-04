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

export type IProps = EditorProps<AtlasScopeDocument>;
export default function Editor(props: IProps) {
  const { document, dispatch } = props
  const documentState = props.document.state.global;
  const newMomentdocumentState={
    ...documentState,
    originalContextData: documentState.originalContextData?.[0]?.id || "",
    
  }

  const onSubmit = (data: Record<string, any>) => {
    if (data['docNo'] !== undefined) {
      dispatch(actions.setDocNumber({ docNo: data['docNo'] as string }));
    }
    if (data['name'] !== undefined) {
      dispatch(actions.setScopeName({ name: data['name'] as string }));
    }
    if (data['masterStatus'] !== undefined) {
      dispatch(actions.setMasterStatus({ masterStatus: data['masterStatus'] as Status }));
    }
    if (data['content'] !== undefined) {
      dispatch(actions.setContent({ content: data['content'] as string }));
    }
    if (data['provenance'] !== undefined) {
      dispatch(actions.setProvenance({ provenance: data['provenance'] as string }));
    }

    if (data['newTags'] !== undefined) {
      dispatch(actions.addTags({ newTags: data['newTags'] as GlobalTag[] }));
    }
    if (data['originalContextData'] !== undefined) {
      dispatch(actions.addContextData({ id: data['originalContextData'] as string }));
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