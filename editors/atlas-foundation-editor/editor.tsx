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

export type IProps = EditorProps<AtlasFoundationDocument>;

export default function Editor(props: IProps) {
  const { dispatch } = props;

  // TODO: remove or update this once all the data in global state is in the expected format or the design is updated
  const originalDocumentState = props.document.state.global;
  const originalParentId = originalDocumentState.parent?.id
    ? `phd:${originalDocumentState.parent?.id}`
    : "";
  const documentState = {
    ...originalDocumentState,
    parent: originalParentId,
    provenance: originalDocumentState.provenance[0] || "",
    originalContextData: originalDocumentState.originalContextData[0]?.id || "",
    references: originalDocumentState.references[0]?.id || "",
  };
  const initialPHIDOption = {
    value: originalParentId,
    title: `${originalDocumentState.parent?.docNo || ""} - ${originalDocumentState.parent?.name || ""}`,
    path: "sky/atlas-foundation",
    icon: "File" as const,
    description: "",
  };

  const onSubmit = (data: Record<string, any>) => {
    if (data["docNo"] !== undefined) {
      dispatch(actions.setDocNumber({ docNo: data["docNo"] as string }));
    }
    if (data["name"] !== undefined) {
      dispatch(actions.setFoundationName({ name: data["name"] as string }));
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
      dispatch(actions.setContent({ content: data["content"] as string }));
    }
    if (data["parent"] !== undefined) {
      const parentId = (data["parent"] as string).split(":")[1];
      dispatch(actions.setParent({ id: parentId }));
    }
    if (data["originalContextData"] !== undefined) {
      dispatch(
        actions.addContextData({ id: data["originalContextData"] as string }),
      );
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
      dispatch(actions.addReference({ id: data["references"] as string }));
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
                onSubmit={onSubmit}
                documentState={documentState}
                mode={isEditMode ? "Edition" : "DiffRemoved"}
                initialPHIDOption={initialPHIDOption}
              />
            }
            right={
              <FoundationForm
                onSubmit={onSubmit}
                documentState={documentState}
                mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
                initialPHIDOption={initialPHIDOption}
              />
            }
          />
        ) : (
          <FoundationForm
            onSubmit={onSubmit}
            documentState={documentState}
            mode={isEditMode ? "Edition" : "Readonly"}
            initialPHIDOption={initialPHIDOption}
          />
        )
      }
    </EditorLayout>
  );
}
