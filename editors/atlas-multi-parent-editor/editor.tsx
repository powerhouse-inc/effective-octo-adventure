import { type EditorProps } from "document-model";
import { actions, type AtlasMultiParentDocument, type MGlobalTag, type MStatus, type MAtlasType } from "../../document-models/atlas-multi-parent/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { MultiParentForm } from "./components/MultiparentForm.js";

export type IProps = EditorProps<AtlasMultiParentDocument>;
export default function Editor(props: IProps) {
  const { dispatch } = props;
  const documentState = props.document.state.global;

//TODO: fix this the URL field waiting for a string but it's an array
 const newMomentdocumentState={
  ...documentState,
  provenance: documentState.provenance?.[0] || "",
  originalContextData: documentState.originalContextData?.[0]?.id || "",
  parents: documentState.parents?.[0]?.id || "",
}
  const onSubmit = (data: Record<string, any>) => {

    if (data["globalTags"] !== undefined) {
      const newTags = data["globalTags"] as MGlobalTag[];
      const currentTags = documentState.globalTags;

      if (data["globalTags"] === null) {
        dispatch(actions.removeTags({ tags: currentTags }));
        return;
      }

      // Tags to add (are in newTags but not in currentTags)
      const tagsToAdd = newTags.filter((tag) => !currentTags.includes(tag));
      if (tagsToAdd.length > 0) {
        dispatch(actions.addTags({ tags: tagsToAdd }));
      }

      // Tags to remove (are in currentTags but not in newTags)
      const tagsToRemove = currentTags.filter((tag) => !newTags.includes(tag));
      if (tagsToRemove.length > 0) {
        dispatch(actions.removeTags({ tags: tagsToRemove }));
      }
    }
    if (data['docNo'] !== undefined) {
      dispatch(actions.setDocNumber({ docNo: data['docNo'] as string }));
    }
    if (data['name'] !== undefined) {
      dispatch(actions.setMultiparentName({ name: data['name'] as string }));
    }
    if (data['masterStatus'] !== undefined) {
      dispatch(actions.setMasterStatus({ masterStatus: data['masterStatus'] as MStatus }));
    }
    if (data['content'] !== undefined) {
      dispatch(actions.setContent({ content: data['content'] as string }));
    }
    if (data['parents'] !== undefined) {
      dispatch(actions.addParent({ id: data['parents'] as string }));
    }
    if (data['originalContextData'] !== undefined) {
      dispatch(actions.addContextData({ id: data['originalContextData'] as string }));
    }

    if (data['provenance'] !== undefined) {
      dispatch(actions.setProvenance({ provenance: [data['provenance'] as string] }));
    }
    if (data['notionId'] !== undefined) {
      dispatch(actions.setNotionId({ notionID: data['notionId'] as string }));
    }
    if (data['atlasType'] !== undefined) {
      dispatch(actions.setAtlasType({ atlasType: data['atlasType'] as MAtlasType }));
    }
  }
  return (
      <EditorLayout
        title="Multi-Parent Document"
        notionId={props.document.state.global.notionId}
      >
        {({ isSplitMode, isEditMode }) =>
          isSplitMode ? (
            <SplitView
              left={
                <MultiParentForm
                  onSubmit={onSubmit}
                  documentState={newMomentdocumentState}
                  mode={isEditMode ? "Edition" : "DiffRemoved"}
                />
              }
              right={
                <MultiParentForm
                  onSubmit={onSubmit}
                  documentState={newMomentdocumentState}
                  mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
                />
              }
            />
          ) : (
            <MultiParentForm
              onSubmit={onSubmit}
              documentState={newMomentdocumentState}
              mode={isEditMode ? "Edition" : "Readonly"}
            />
          )
        }
      </EditorLayout>
    );
  }
   