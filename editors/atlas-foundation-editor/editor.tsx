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
  const documentState = {
    ...originalDocumentState,
    parent: originalDocumentState.parent?.id || "",
    provenance: originalDocumentState.provenance[0] || "",
    originalContextData: originalDocumentState.originalContextData[0]?.id || "",
    references: originalDocumentState.references[0]?.id || "",
  };
  const initialPHIDOption = {
    value: originalDocumentState.parent?.id || "",
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
      dispatch(actions.setParent({ id: data["parent"] as string }));
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
      dispatch(actions.addTags({ tags: data["globalTags"] as FGlobalTag[] }));
    }
    if (data["references"] !== undefined) {
      dispatch(actions.addReference({ id: data["references"] as string }));
    }
  };

  return (
    <EditorLayout title="Foundation Document" notionId={documentState.notionId}>
      {({ isSplitMode, isEditMode }) =>
        isSplitMode ? (
          <SplitView
            left={
              <FoundationForm
                onSubmit={onSubmit}
                documentState={documentState}
                mode={"SplitReadonly"}
                initialPHIDOption={initialPHIDOption}
              />
            }
            right={
              <FoundationForm
                onSubmit={onSubmit}
                documentState={documentState}
                mode={"SplitEdit"}
                initialPHIDOption={initialPHIDOption}
              />
            }
          />
        ) : (
          <FoundationForm
            onSubmit={onSubmit}
            documentState={documentState}
            mode={isEditMode ? "UnifiedEdit" : "UnifiedReadonly"}
            initialPHIDOption={initialPHIDOption}
          />
        )
      }
    </EditorLayout>
  );
}
