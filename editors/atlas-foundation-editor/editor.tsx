import { type EditorProps } from "document-model";
import {
  actions,
  type AtlasFoundationDocument,
  type FAtlasType,
  type FGlobalTag,
  type FStatus,
} from "../../document-models/atlas-foundation/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { FoundationForm } from "./components/FoundationForm.js";
import {
  getStringValue,
  fetchSelectedPHIDOption,
} from "../shared/utils/utils.js";
import { type PHIDOption } from "@powerhousedao/design-system/ui";

export type IProps = EditorProps<AtlasFoundationDocument>;

export default function Editor(props: IProps) {
  const { dispatch } = props;

  // TODO: remove or update this once all the data in global state is in the expected format or the design is updated
  const originalDocumentState = props.document.state.global;
  const parentId = originalDocumentState.parent?.id
    ? `phd:${originalDocumentState.parent.id}`
    : "";
  const originalContextDataId = originalDocumentState.originalContextData[0]?.id
    ? `phd:${originalDocumentState.originalContextData[0].id}`
    : "";
  const referencesId = originalDocumentState.references[0]?.id
    ? `phd:${originalDocumentState.references[0].id}`
    : "";

  const documentState = {
    ...originalDocumentState,
    parent: parentId,
    provenance: originalDocumentState.provenance?.[0] || "",
    originalContextData: originalContextDataId,
    references: referencesId,
  };
  // TODO: update this with the correct data when available
  const parentPHIDInitialOption: PHIDOption = {
    icon: "File",
    title: `${originalDocumentState.parent?.docNo ?? ""} - ${originalDocumentState.parent?.name ?? ""}`,
    path: "Type not available",
    value: parentId,
    description: undefined,
  };
  const originalContextDataPHIDInitialOption = fetchSelectedPHIDOption(
    originalContextDataId,
  );
  const referencesPHIDInitialOption = fetchSelectedPHIDOption(referencesId);

  const onSubmit = (data: Record<string, any>) => {
    if (data["docNo"] !== undefined) {
      dispatch(actions.setDocNumber({ docNo: getStringValue(data["docNo"]) }));
    }
    if (data["name"] !== undefined) {
      dispatch(
        actions.setFoundationName({ name: getStringValue(data["name"]) }),
      );
    }
    if (data["atlasType"] !== undefined) {
      dispatch(
        actions.setAtlasType({ atlasType: data["atlasType"] as FAtlasType }),
      );
    }
    if (data["masterStatus"] !== undefined) {
      dispatch(
        actions.setMasterStatus({
          masterStatus: data["masterStatus"] as FStatus,
        }),
      );
    }
    if (data["content"] !== undefined) {
      dispatch(
        actions.setContent({ content: getStringValue(data["content"]) }),
      );
    }
    if (data["parent"] !== undefined) {
      if (data["parent"] === null) {
        dispatch(
          actions.setParent({ id: "", docNo: undefined, name: undefined }),
        );
      } else {
        const newParentId = (data["parent"] as string).split(":")[1];
        const newParentData = fetchSelectedPHIDOption(data["parent"] as string);
        dispatch(
          actions.setParent({
            id: newParentId,
            docNo: newParentData?.title?.split(" - ")[0] ?? "",
            name: newParentData?.title?.split(" - ")[1] ?? "",
          }),
        );
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
    if (data["provenance"] !== undefined) {
      dispatch(
        actions.setProvenance({ provenance: [data["provenance"] as string] }),
      );
    }
    if (data["globalTags"] !== undefined) {
      const newTags = data["globalTags"] as FGlobalTag[];
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
  };

  return (
    <EditorLayout
      title="Foundation Document"
      notionId={documentState.notionId}
      readOnlyModeEnabled={true}
      splitModeEnabled={true}
    >
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView
            left={
              <FoundationForm
                isSplitMode={isSplitMode}
                onSubmit={onSubmit}
                documentState={documentState}
                mode={isEditMode ? "Edition" : "DiffRemoved"}
                parentPHIDInitialOption={parentPHIDInitialOption}
                originalContextDataPHIDInitialOption={
                  originalContextDataPHIDInitialOption
                }
                referencesPHIDInitialOption={referencesPHIDInitialOption}
              />
            }
            right={
              <FoundationForm
                isSplitMode={isSplitMode}
                onSubmit={onSubmit}
                documentState={documentState}
                mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
                parentPHIDInitialOption={parentPHIDInitialOption}
                originalContextDataPHIDInitialOption={
                  originalContextDataPHIDInitialOption
                }
                referencesPHIDInitialOption={referencesPHIDInitialOption}
              />
            }
          />
        ) : (
          <FoundationForm
            onSubmit={onSubmit}
            documentState={documentState}
            mode={isEditMode ? "Edition" : "DiffMixed"}
            parentPHIDInitialOption={parentPHIDInitialOption}
            originalContextDataPHIDInitialOption={
              originalContextDataPHIDInitialOption
            }
            referencesPHIDInitialOption={referencesPHIDInitialOption}
          />
        )
      }
    </EditorLayout>
  );
}
