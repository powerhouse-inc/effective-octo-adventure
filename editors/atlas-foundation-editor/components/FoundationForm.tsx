import { cn } from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  fetchSelectedPHIDOption,
  getCardVariant,
  getTagText,
} from "../../shared/utils/utils.js";
import { type PHIDOption } from "@powerhousedao/design-system/ui";
import type { EditorMode } from "../../shared/types.js";
import { getOriginalNotionDocument } from "../../../document-models/utils.js";
import { type ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import { FormModeProvider } from "../../shared/providers/FormModeProvider.js";
import { DocNoForm } from "../../shared/components/forms/DocNoForm.js";
import type { IProps } from "../editor.js";
import {
  actions,
  type FGlobalTag,
} from "../../../document-models/atlas-foundation/index.js";
import { DocNameForm } from "../../shared/components/forms/DocNameForm.js";
import { DocTypeForm } from "../../shared/components/forms/DocTypeForm.js";
import { MasterStatusForm } from "../../shared/components/forms/MasterStatusForm.js";
import { ProvenanceForm } from "../../shared/components/forms/ProvenanceForm.js";
import { SinglePhIdForm } from "../../shared/components/forms/SinglePhIdForm.js";
import { GlobalTagsForm } from "../../shared/components/forms/GlobalTagsForm.js";
import ReferencesArray from "../../shared/components/forms/ReferencesArray.js";
import { useEffect, useState } from "react";
import { getFlexLayoutClassName, getWidthClassName } from "../../shared/utils/styles.js";
import { MarkdownEditor } from "../../shared/components/markdown-editor.js";
interface FoundationFormProps extends Pick<IProps, "document" | "dispatch"> {
  mode: EditorMode;
  parentPHIDInitialOption?: PHIDOption;
  originalContextDataPHIDInitialOption?: PHIDOption;
  referencesPHIDInitialOption?: PHIDOption;
  isSplitMode?: boolean;
}

export function FoundationForm({
  document,
  dispatch,
  mode,
  parentPHIDInitialOption,
  originalContextDataPHIDInitialOption,
  referencesPHIDInitialOption,
  isSplitMode,
}: FoundationFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);
  const [contentValue, setContentValue] = useState<string>(
    documentState.content || ""
  );

  // Update contentValue when documentState changes
  useEffect(() => {
    setContentValue(documentState.content || "");
  }, [documentState.content]);

  // Custom handler for content changes
  const handleContentChange = (value: string) => {
    setContentValue(value);
  };

  // Custom handler for content blur
  const handleContentBlur = () => {
    // Only submit if the content has actually changed
    if (contentValue !== documentState.content) {
      onSubmit({ content: contentValue });
    }
  };

  const stateDocument = document.state.global;
  const parentId = stateDocument.parent?.id
    ? `phd:${stateDocument.parent?.id}`
    : "";
  const originalContextDataId = stateDocument.originalContextData[0]?.id
    ? `phd:${stateDocument.originalContextData[0].id}`
    : "";
  const referencesId = stateDocument.references[0]?.id
    ? `phd:${stateDocument.references[0].id}`
    : "";

  const documentState = {
    ...stateDocument,
    parent: parentId,
    provenance: stateDocument.provenance[0] || "",
    originalContextData: originalContextDataId,
  };

  // baseline node state
  const [originalNodeState] = useState(() =>
    getOriginalNotionDocument(
      (documentState.notionId as string) || "notion-id-not-set",
      (documentState.atlasType as ParsedNotionDocumentType) || "article"
    )
  );

  return (
    <FormModeProvider mode={mode}>
      <ContentCard
        tagText={tagText}
        variant={cardVariant}
        className={cn("mt-4")}
      >
        <div className={cn("flex flex-col gap-3")}>
          <div className={getFlexLayoutClassName(isSplitMode ?? false)}>
            <div className={cn("flex-1")}>
              <DocNoForm
                value={documentState.docNo}
                baselineValue={originalNodeState.docNo}
                onSave={(value) => {
                  dispatch(actions.setDocNumber({ docNo: value }));
                }}
              />
            </div>
            <div className={cn("flex-1")}>
              <DocNameForm
                value={documentState.name}
                baselineValue={originalNodeState.name}
                onSave={(value) => {
                  dispatch(actions.setFoundationName({ name: value }));
                }}
                placeholder="Name"
              />
            </div>
          </div>
          <div className={getFlexLayoutClassName(isSplitMode ?? false)}>
            <div className={cn("flex-1")}>
              <DocTypeForm
                value={documentState.atlasType}
                baselineValue={originalNodeState.type?.toUpperCase()}
                onSave={(value) => {
                  dispatch(actions.setAtlasType({ atlasType: value }));
                }}
              />
            </div>
            <div className={cn("flex-1")}>
              <MasterStatusForm
                value={documentState.masterStatus}
                baselineValue={originalNodeState.masterStatusNames[0]?.toUpperCase()}
                onSave={(value) => {
                  dispatch(actions.setMasterStatus({ masterStatus: value }));
                }}
              />
            </div>
          </div>

          <MarkdownEditor
            value={contentValue}
            onChange={handleContentChange}
            onBlur={handleContentBlur}
            height={350}
            label="Content"
          />

          <div
            className={cn(
              "flex flex-col gap-3",
              getWidthClassName(!!isSplitMode),
            )}
          >
            <SinglePhIdForm
              label="Parent Document"
              value={documentState.parent}
              baselineValue={originalNodeState.parents?.[0] ?? ""}
              onSave={(value) => {
                if (value === null) {
                  dispatch(
                    actions.setParent({
                      id: "",
                      docNo: undefined,
                      name: undefined,
                    }),
                  );
                } else {
                  const newParentId = value.split(":")[1];
                  const newParentData = fetchSelectedPHIDOption(value);
                  dispatch(
                    actions.setParent({
                      id: newParentId,
                      docNo: newParentData?.title?.split(" - ")[0] ?? "",
                      name: newParentData?.title?.split(" - ")[1] ?? "",
                    }),
                  );
                }
              }}
            />

            <SinglePhIdForm
              label="Original Context Data"
              value={documentState.originalContextData}
              baselineValue={""}
              onSave={(value) => {
                if (value === null) {
                  dispatch(
                    actions.removeContextData({
                      id: documentState.originalContextData.split(":")[1],
                    }),
                  );
                } else {
                  const newOriginalContextDataId = value.split(":")[1];
                  dispatch(
                    actions.addContextData({ id: newOriginalContextDataId }),
                  );
                }
              }}
            />

            <ProvenanceForm
              value={documentState.provenance}
              baselineValue={originalNodeState.hubUrls[0]}
              onSave={(value) => {
                dispatch(actions.setProvenance({ provenance: [value] }));
              }}
            />

            <GlobalTagsForm
              value={documentState.globalTags}
              baselineValue={[]}
              onSave={(value) => {
                const newTags = value as FGlobalTag[];
                const currentTags = documentState.globalTags;

                if (value === null) {
                  dispatch(actions.removeTags({ tags: currentTags }));
                  return;
                }

                // Tags to add (are in newTags but not in currentTags)
                const tagsToAdd = newTags.filter(
                  (tag) => !currentTags.includes(tag),
                );
                if (tagsToAdd.length > 0) {
                  dispatch(actions.addTags({ tags: tagsToAdd }));
                }

                // Tags to remove (are in currentTags but not in newTags)
                const tagsToRemove = currentTags.filter(
                  (tag) => !newTags.includes(tag),
                );
                if (tagsToRemove.length > 0) {
                  dispatch(actions.removeTags({ tags: tagsToRemove }));
                }
              }}
            />

            <ReferencesArray
              onAdd={(value) => {
                const phid = value.split(":")[1];
                dispatch(actions.addReference({ id: phid }));
              }}
              onRemove={(value) => {
                const phid = value.split(":")[1];
                dispatch(actions.removeReference({ id: phid }));
              }}
              onUpdate={() => {
                // TODO: implement references updates
                throw new Error("Updates not supported yet");
              }}
              references={documentState.references}
            />
          </div>
        </div>
      </ContentCard>
    </FormModeProvider>
  );
}
