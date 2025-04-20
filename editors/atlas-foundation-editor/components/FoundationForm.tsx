import { cn } from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  fetchSelectedPHIDOption,
  getCardVariant,
  getStringValue,
  getTagText,
  getTitleText,
  parseTitleText,
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
import { SinglePhIdForm } from "../../shared/components/forms/SinglePhIdForm.js";
import { GlobalTagsForm } from "../../shared/components/forms/GlobalTagsForm.js";
import { useEffect, useState } from "react";
import {
  getFlexLayoutClassName,
  getWidthClassName,
} from "../../shared/utils/styles.js";
import { MarkdownEditor } from "../../shared/components/markdown-editor.js";
import { MultiPhIdForm } from "../../shared/components/forms/MultiPhIdForm.js";
interface FoundationFormProps extends Pick<IProps, "document" | "dispatch"> {
  mode: EditorMode;
  isSplitMode?: boolean;
}

export function FoundationForm({
  document,
  dispatch,
  mode,
  isSplitMode,
}: FoundationFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  const originalDocumentState = document.state.global;
  const parentId = originalDocumentState.parent?.id
    ? `phd:${originalDocumentState.parent.id}`
    : "";
  const parentDocNo = originalDocumentState.parent?.docNo ?? "";
  const parentName = originalDocumentState.parent?.title ?? "";

  const parentPHIDInitialOption: PHIDOption = {
    icon: "File",
    title: getTitleText(parentDocNo, parentName),
    value: parentId,
  };

  const documentState = {
    ...originalDocumentState,
    parent: parentId,
  };

  const [contentValue, setContentValue] = useState<string>(
    documentState.content || "",
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
    // Only save if the content has actually changed
    if (contentValue !== documentState.content) {
      dispatch(actions.setContent({ content: getStringValue(contentValue) }));
    }
  };

  // baseline node state
  const [originalNodeState] = useState(() =>
    getOriginalNotionDocument(
      (documentState.notionId as string) || "notion-id-not-set",
      (documentState.atlasType as ParsedNotionDocumentType) || "article",
    ),
  );

  return (
    <FormModeProvider mode={mode}>
      <ContentCard tagText={tagText} variant={cardVariant}>
        <div className={cn("flex flex-col gap-3")}>
          <div className={getFlexLayoutClassName(isSplitMode ?? false)}>
            <div className={cn("flex-1")}>
              <DocNoForm
                value={documentState.docNo}
                baselineValue={originalNodeState.docNo}
                onSave={(value) => {
                  dispatch(
                    // TODO: do we need to getStringValue here?
                    actions.setDocumentNumber({ docNo: getStringValue(value) }),
                  );
                }}
              />
            </div>
            <div className={cn("flex-1")}>
              <DocNameForm
                value={documentState.name}
                baselineValue={originalNodeState.name}
                onSave={(value) => {
                  dispatch(
                    actions.setName({
                      // TODO: do we need to getStringValue here?
                      name: getStringValue(value),
                    }),
                  );
                }}
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
                      // TODO: is this the correct way?
                      id: "",
                      docNo: undefined,
                      title: undefined,
                    }),
                  );
                } else {
                  const newParentId = value.split(":")[1];
                  const newParentData = fetchSelectedPHIDOption(value);
                  const { docNo, name } = parseTitleText(
                    newParentData?.title ?? "",
                  );
                  dispatch(
                    actions.setParent({
                      id: newParentId,
                      docNo,
                      title: name,
                    }),
                  );
                }
              }}
              initialOptions={[parentPHIDInitialOption]}
            />

            <MultiPhIdForm
              label="Original Context Data"
              data={documentState.originalContextData}
              onAdd={(value) => {
                dispatch(actions.addContextData({ id: value }));
              }}
              onRemove={({ value }) => {
                dispatch(actions.removeContextData({ id: value }));
              }}
              onUpdate={({ previousValue, value }) => {
                dispatch(
                  actions.replaceContextData({
                    prevId: previousValue,
                    id: value,
                    title: "", // TODO: add the document title
                  }),
                );
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
          </div>
        </div>
      </ContentCard>
    </FormModeProvider>
  );
}
