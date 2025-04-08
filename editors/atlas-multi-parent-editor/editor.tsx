import { type EditorProps } from "document-model";
import { actions, type AtlasMultiParentDocument, type MGlobalTag, type MStatus, type MAtlasType } from "../../document-models/atlas-multi-parent/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { MultiParentForm } from "./components/MultiparentForm.js";
import { fetchSelectedPHIDOption, getStringValue } from "../shared/utils/utils.js";

export type IProps = EditorProps<AtlasMultiParentDocument>;
export default function Editor(props: IProps) {
  const { dispatch } = props;
  const originalDocumentState = props.document.state.global;
  const parentId = originalDocumentState.parents?.[0]?.id
    ? `phd:${originalDocumentState.parents?.[0]?.id}`
    : "";
  const originalContextDataId = originalDocumentState.originalContextData[0]?.id
    ? `phd:${originalDocumentState.originalContextData[0].id}`
    : "";
  const referencesId = originalDocumentState.references[0]?.id
    ? `phd:${originalDocumentState.references[0].id}`
    : "";

  //TODO: fix this the URL field waiting for a string but it's an array
  const documentState = {
    ...originalDocumentState,
    provenance: originalDocumentState.provenance?.[0] || "",
    originalContextData: originalContextDataId,
    parents: parentId,
    references: referencesId,
  }

  const parentPHIDInitialOption = fetchSelectedPHIDOption(parentId);

  const originalContextDataPHIDInitialOption = fetchSelectedPHIDOption(
    originalContextDataId,
  );
  const referencesPHIDInitialOption = fetchSelectedPHIDOption(referencesId);

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
      dispatch(actions.setDocNumber({ docNo: getStringValue(data['docNo']) }));
    }
    if (data['name'] !== undefined) {
      dispatch(actions.setMultiparentName({ name: getStringValue(data['name']) }));
    }
    if (data['masterStatus'] !== undefined) {
      dispatch(actions.setMasterStatus({ masterStatus: data['masterStatus'] as MStatus }));
    }
    if (data['content'] !== undefined) {
      dispatch(actions.setContent({ content: getStringValue(data['content']) }));
    }
    if (data["parents"] !== undefined) {
      if (data["parents"] === null) {
        dispatch(actions.addParent({ id: "" }));
      } else {
        const newParentId = (data["parents"] as string).split(":")[1];
        dispatch(actions.addParent({ id: newParentId }));
      }
    }

    if (data["originalContextData"] !== undefined) {
      if (data["originalContextData"] === null) {
        dispatch(
          actions.removeContextData({
            id: documentState.originalContextData.split(":")[1],
          }),
        );
      } else {
        const newOriginalContextDataId = (
          data["originalContextData"] as string
        ).split(":")[1];
        dispatch(actions.addContextData({ id: newOriginalContextDataId }));
      }
    }

    if (data['provenance'] !== undefined) {
      dispatch(actions.setProvenance({ provenance: [data['provenance'] as string] }));
    }
    if (data['notionId'] !== undefined) {
      dispatch(actions.setNotionId({ notionID: getStringValue(data['notionId']) }));
    }
    if (data['atlasType'] !== undefined) {
      dispatch(actions.setAtlasType({ atlasType: data['atlasType'] as MAtlasType }));
    }
    if (data["references"] !== undefined) {
      if (data["references"] === null) {
        dispatch(
          actions.removeReference({
            id: documentState.references.split(":")[1],
          }),
        );
      } else {
        const newReferenceId = (data["references"] as string).split(":")[1];
        dispatch(actions.addReference({ id: newReferenceId }));
      }
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
                documentState={documentState}
                mode={isEditMode ? "Edition" : "DiffRemoved"}
                referencesPHIDInitialOption={referencesPHIDInitialOption}
                parentPHIDInitialOption={parentPHIDInitialOption}
                originalContextDataPHIDInitialOption={originalContextDataPHIDInitialOption}
              />
            }
            right={
              <MultiParentForm
                onSubmit={onSubmit}
                documentState={documentState}
                mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
                referencesPHIDInitialOption={referencesPHIDInitialOption}
                parentPHIDInitialOption={parentPHIDInitialOption}
                originalContextDataPHIDInitialOption={originalContextDataPHIDInitialOption}
              />
            }
          />
        ) : (
          <MultiParentForm
            onSubmit={onSubmit}
            documentState={documentState}
            mode={isEditMode ? "Edition" : "Readonly"}
            referencesPHIDInitialOption={referencesPHIDInitialOption}
            parentPHIDInitialOption={parentPHIDInitialOption}
            originalContextDataPHIDInitialOption={originalContextDataPHIDInitialOption}
          />
        )
      }
    </EditorLayout>
  );
}
