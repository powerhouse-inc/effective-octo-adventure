import { type EditorProps } from "document-model";
import { type AtlasFoundationDocument } from "../../document-models/atlas-foundation/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { FoundationForm } from "./components/FoundationForm.js";
import {
  fetchSelectedPHIDOption,
  getTitleText,
} from "../shared/utils/utils.js";
import { type PHIDOption } from "@powerhousedao/design-system/ui";

export type IProps = EditorProps<AtlasFoundationDocument>;

export default function Editor(props: IProps) {
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
  const parentDocNo = originalDocumentState.parent?.docNo ?? "";
  const parentName = originalDocumentState.parent?.name ?? "";
  const parentPHIDInitialOption: PHIDOption = {
    icon: "File",
    title: getTitleText(parentDocNo, parentName),
    path: "Type not available",
    value: parentId,
  };
  const originalContextDataPHIDInitialOption = fetchSelectedPHIDOption(
    originalContextDataId,
  );
  const referencesPHIDInitialOption = fetchSelectedPHIDOption(referencesId);

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
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
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
                document={props.document}
                dispatch={props.dispatch}
                isSplitMode={isSplitMode}
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
            document={props.document}
            dispatch={props.dispatch}
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
