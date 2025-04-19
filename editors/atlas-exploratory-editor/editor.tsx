import { type EditorProps } from "document-model";
import { type AtlasExploratoryDocument } from "../../document-models/atlas-exploratory/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { ExploratoryForm } from "./components/ExploratoryForm.js";
import { fetchSelectedPHIDOption } from "../shared/utils/utils.js";

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

  const documentState = {
    ...originalDocumentState,
    originalContextData: originalContextDataId,
    parent: parentId,
  };

  const parentPHIDInitialOption = fetchSelectedPHIDOption(parentId);
  const originalContextDataPHIDInitialOption = fetchSelectedPHIDOption(
    originalContextDataId,
  );
  const isAligned = documentState.findings.isAligned;

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
                document={props.document}
                dispatch={dispatch}
                mode={isEditMode ? "Edition" : "DiffRemoved"}
                parentPHIDInitialOption={parentPHIDInitialOption}
                originalContextDataPHIDInitialOption={
                  originalContextDataPHIDInitialOption
                }
                isAligned={isAligned}
                isSplitMode={isSplitMode}
              />
            }
            right={
              <ExploratoryForm
                document={props.document}
                dispatch={dispatch}
                mode={isEditMode ? "DiffMixed" : "DiffAdditions"}
                parentPHIDInitialOption={parentPHIDInitialOption}
                originalContextDataPHIDInitialOption={
                  originalContextDataPHIDInitialOption
                }
                isAligned={isAligned}
                isSplitMode={isSplitMode}
              />
            }
          />
        ) : (
          <ExploratoryForm
            document={props.document}
            dispatch={dispatch}
            mode={isEditMode ? "Edition" : "Readonly"}
            parentPHIDInitialOption={parentPHIDInitialOption}
            originalContextDataPHIDInitialOption={
              originalContextDataPHIDInitialOption
            }
            isAligned={isAligned}
          />
        )
      }
    </EditorLayout>
  );
}
