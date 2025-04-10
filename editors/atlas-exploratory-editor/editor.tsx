import { type EditorProps } from "document-model";
import {
  actions,
  type AtlasExploratoryDocument,
  type EStatus,
  type EGlobalTag,
  EAtlasType,
} from "../../document-models/atlas-exploratory/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { ExploratoryForm } from "./components/ExploratoryForm.js";
import {
  fetchSelectedPHIDOption,
  getStringValue,
} from "../shared/utils/utils.js";

export type IProps = EditorProps<AtlasExploratoryDocument>;

export default function Editor(props: IProps) {
  const { dispatch } = props;

  const originalDocumentState = props.document.state.global;

  const parentId = originalDocumentState.parent
    ? `phd:${originalDocumentState.parent}`
    : "";
  const originalContextDataId = originalDocumentState.originalContextData[0]?.id
    ? `phd:${originalDocumentState.originalContextData[0].id}`
    : "";
  const referencesId = originalDocumentState.references[0]
    ? `phd:${originalDocumentState.references[0]}`
    : "";

  const documentState = {
    ...originalDocumentState,
    provenance: originalDocumentState.provenance || "",
    originalContextData: originalContextDataId,
    references: referencesId,
    parent: parentId,
  };

  const parentPHIDInitialOption = fetchSelectedPHIDOption(parentId);
  const originalContextDataPHIDInitialOption = fetchSelectedPHIDOption(
    originalContextDataId
  );
  const referencesPHIDInitialOption = fetchSelectedPHIDOption(referencesId);
  const isAligned = documentState.findings.isAligned;

  const onSubmit = (data: Record<string, any>) => {
    if (data["docNo"] !== undefined) {
      dispatch(actions.setDocNumber({ docNo: getStringValue(data["docNo"]) }));
    }
    if (data["name"] !== undefined) {
      dispatch(
        actions.setExploratoryName({ name: getStringValue(data["name"]) })
      );
    }
    if (data["masterStatus"] !== undefined) {
      dispatch(
        actions.setMasterStatus({
          masterStatus: data["masterStatus"] as EStatus,
        })
      );
    }
    if (data["content"] !== undefined) {
      dispatch(
        actions.setContent({ content: getStringValue(data["content"]) })
      );
    }
    if (data["parent"] !== undefined) {
      if (data["parent"] === null) {
        dispatch(actions.setParent({ parent: [] }));
      } else {
        const newParentId = (data["parent"] as string).split(":")[1];

        dispatch(actions.setParent({ parent: [newParentId] }));
      }
    }

    if (data["globalTags"] !== undefined) {
      const newTags = data["globalTags"] as EGlobalTag[];
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
    if (data["additionalGuidance"] !== undefined) {
      dispatch(
        actions.addAdditionalGuidance({
          additionalGuidance: getStringValue(data["additionalGuidance"]),
        })
      );
    }
    if (data["originalContextData"] !== undefined) {
      if (data["originalContextData"] === null) {
        dispatch(
          actions.removeContextData({
            id: documentState.originalContextData.split(":")[1],
          })
        );
      } else {
        const newOriginalContextDataId = (
          data["originalContextData"] as string
        ).split(":")[1];
        dispatch(actions.addContextData({ id: newOriginalContextDataId }));
      }
    }
    if (data["provenance"] !== undefined) {
      dispatch(
        actions.setProvenance({ provenance: data["provenance"] as string })
      );
    }
    if (data["findings"] !== undefined) {
      dispatch(
        actions.setFindings({
          isAligned: data["findings"].isAligned as boolean,
          comment: data["findings"].comment as string,
        })
      );
    }
    if (data["references"] !== undefined) {
      if (data["references"] === null) {
        dispatch(
          actions.removeReference({
            reference: documentState.references.split(":")[1],
          })
        );
      } else {
        const newReferenceId = (data["references"] as string).split(":")[1];
        dispatch(actions.setReference({ newReference: newReferenceId }));
      }
    }
    if (data["atlasType"] !== undefined) {
      dispatch(
        actions.setAtlasType({ atlasType: data["atlasType"] as EAtlasType })
      );
    }
  };
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
                onSubmit={onSubmit}
                documentState={documentState}
                mode={isEditMode ? "Edition" : "DiffRemoved"}
                parentPHIDInitialOption={parentPHIDInitialOption}
                originalContextDataPHIDInitialOption={
                  originalContextDataPHIDInitialOption
                }
                referencesPHIDInitialOption={referencesPHIDInitialOption}
                isAligned={isAligned}
                isSplitMode={isSplitMode}
              />
            }
            right={
              <ExploratoryForm
                onSubmit={onSubmit}
                documentState={documentState}
                mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
                parentPHIDInitialOption={parentPHIDInitialOption}
                originalContextDataPHIDInitialOption={
                  originalContextDataPHIDInitialOption
                }
                referencesPHIDInitialOption={referencesPHIDInitialOption}
                isAligned={isAligned}
                isSplitMode={isSplitMode}
              />
            }
          />
        ) : (
          <ExploratoryForm
            onSubmit={onSubmit}
            documentState={documentState}
            mode={isEditMode ? "Edition" : "Readonly"}
            parentPHIDInitialOption={parentPHIDInitialOption}
            originalContextDataPHIDInitialOption={
              originalContextDataPHIDInitialOption
            }
            referencesPHIDInitialOption={referencesPHIDInitialOption}
            isAligned={isAligned}
          />
        )
      }
    </EditorLayout>
  );
}
