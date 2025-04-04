import { type EditorProps } from "document-model";
import {
  actions,
  type AtlasGroundingDocument,
  type GAtlasType,
  type GGlobalTag,
  type GStatus,
} from "../../document-models/atlas-grounding/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { GroundingForm } from "./components/GroundingForm.js";

export type IProps = EditorProps<AtlasGroundingDocument>;

export default function Editor(props: IProps) {
  const { dispatch } = props;

  // TODO: remove or update this once all the data in global state is in the expected format or the design is updated
  const originalDocumentState = props.document.state.global;
  const documentState = {
    ...originalDocumentState,
    parent: originalDocumentState.parent.id,
    provenance: originalDocumentState.provenance[0] || "",
    originalContextData: originalDocumentState.originalContextData[0]?.id || "",
    references: originalDocumentState.references[0]?.id || "",
  };
  const initialPHIDOption = {
    value: originalDocumentState.parent.id,
    title: `${originalDocumentState.parent.docNo || ""} - ${originalDocumentState.parent.name || ""}`,
    path: "sky/atlas-grounding",
    icon: "File" as const,
    description: "",
  };

  const onSubmit = (data: Record<string, any>) => {
    if (data["docNo"] !== undefined) {
      dispatch(actions.setDocNumber({ docNo: data["docNo"] as string }));
    }
    if (data["name"] !== undefined) {
      dispatch(actions.setGroundingName({ name: data["name"] as string }));
    }
    if (data["atlasType"] !== undefined) {
      dispatch(
        actions.setAtlasType({ atlasType: data["atlasType"] as GAtlasType })
      );
    }
    if (data["masterStatus"] !== undefined) {
      dispatch(
        actions.setMasterStatus({
          masterStatus: data["masterStatus"] as GStatus,
        })
      );
    }
    if (data["content"] !== undefined) {
      dispatch(actions.setContent({ content: data["content"] as string }));
    }
    if (data["parent"] !== undefined) {
      dispatch(actions.setParent({ id: data["parent"] as string }));
    }
    if (data["originalContextData"] !== undefined) {
      dispatch(
        actions.addContextData({ id: data["originalContextData"] as string })
      );
    }
    if (data["provenance"] !== undefined) {
      dispatch(
        actions.setProvenance({ provenance: [data["provenance"] as string] })
      );
    }
    if (data["globalTags"] !== undefined) {
      dispatch(actions.addTags({ tags: data["globalTags"] as GGlobalTag[] }));
    }
    if (data["references"] !== undefined) {
      dispatch(actions.addReference({ id: data["references"] as string }));
    }
  };

  return (
    <EditorLayout
      title="Grounding Document"
      notionId={documentState.notionId}
      readOnlyModeEnabled={true}
      splitModeEnabled={true}
    >
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView
            left={
              <GroundingForm
                onSubmit={onSubmit}
                documentState={documentState}
                mode={isEditMode ? "Edition" : "DiffRemoved"}
                initialPHIDOption={initialPHIDOption}
              />
            }
            right={
              <GroundingForm
                onSubmit={onSubmit}
                documentState={documentState}
                mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
                initialPHIDOption={initialPHIDOption}
              />
            }
          />
        ) : (
          <GroundingForm
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
