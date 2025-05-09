import { cn } from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  fetchSelectedPHIDOption,
  getCardVariant,
  getStringValue,
  getTagText,
} from "../../shared/utils/utils.js";
import type { EditorMode } from "../../shared/types.js";
import { getOriginalNotionDocument } from "../../../document-models/utils.js";
import { type ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import { FormModeProvider } from "../../shared/providers/FormModeProvider.js";
import type { IProps } from "../editor.js";
import {
  actions,
  type MAtlasType,
  type MGlobalTag,
} from "../../../document-models/atlas-multi-parent/index.js";
import { DocNameForm } from "../../shared/components/forms/DocNameForm.js";
import { DocTypeForm } from "../../shared/components/forms/DocTypeForm.js";
import { MasterStatusForm } from "../../shared/components/forms/MasterStatusForm.js";
import { GlobalTagsForm } from "../../shared/components/forms/GlobalTagsForm.js";
import { useEffect, useRef, useState } from "react";
import {
  getFlexLayoutClassName,
  getWidthClassName,
} from "../../shared/utils/styles.js";
import { MarkdownEditor } from "../../shared/components/markdown-editor.js";
import { MultiPhIdForm } from "../../shared/components/forms/MultiPhIdForm.js";
import type { PHIDOption } from "@powerhousedao/design-system/ui";
import { type UseFormReturn } from "react-hook-form";

interface MultiParentFormProps extends Pick<IProps, "document" | "dispatch"> {
  mode: EditorMode;
  isSplitMode?: boolean;
}

export function MultiParentForm({
  document,
  dispatch,
  mode,
  isSplitMode,
}: MultiParentFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  const documentState = document.state.global;

  const [contentValue, setContentValue] = useState(documentState.content || "");

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
      (documentState.atlasType as ParsedNotionDocumentType) || "annotation",
    ),
  );

  const formRef = useRef<UseFormReturn>(null);
  // keep the form state in sync with the document state
  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset({ ...documentState });
    }
  }, [documentState]);

  return (
    <FormModeProvider mode={mode}>
      <ContentCard tagText={tagText} variant={cardVariant}>
        <div className={cn("flex flex-col gap-3")}>
          <div className={getFlexLayoutClassName(isSplitMode ?? false)}>
            <div className={cn("flex-1")}>
              <DocNameForm
                value={documentState.name}
                baselineValue={originalNodeState.name}
                onSave={(value) => {
                  dispatch(
                    actions.setExploratoryName({
                      name: getStringValue(value),
                    }),
                  );
                }}
              />
            </div>
            <div className={cn("flex-1")}>
              <DocTypeForm
                value={documentState.atlasType}
                baselineValue={originalNodeState.type?.toUpperCase()}
                options={[
                  { value: "ANNOTATION", label: "ANNOTATION" },
                  { value: "NEEDED_RESEARCH", label: "NEEDED_RESEARCH" },
                ]}
                onSave={(value) => {
                  dispatch(
                    actions.setAtlasType({ atlasType: value as MAtlasType }),
                  );
                }}
              />
            </div>
          </div>
          <div className={getWidthClassName(isSplitMode ?? false, "flex-1/2")}>
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
          <div className={cn("flex-1 min-h-[350px]")}>
            <MarkdownEditor
              value={contentValue}
              onChange={handleContentChange}
              onBlur={handleContentBlur}
              height={350}
              label="Content"
            />
          </div>

          <div
            className={cn(
              "flex flex-col gap-3",
              getWidthClassName(!!isSplitMode),
            )}
          >
            <MultiPhIdForm
              label="Parent Documents"
              data={documentState.parents.map((element) => {
                const initialOption: PHIDOption = {
                  icon: "File",
                  title: element.title ?? "",
                  value: `phd:${element.id}`,
                };

                return {
                  id: `phd:${element.id}`,
                  initialOptions: [initialOption],
                };
              })}
              onAdd={(value) => {
                const newData = fetchSelectedPHIDOption(value);
                const newId = value.split(":")[1];
                dispatch(
                  actions.addParent({
                    id: newId,
                    title: newData?.title ?? "",
                  }),
                );
              }}
              onRemove={({ value }) => {
                const id = value.split(":")[1];
                dispatch(actions.removeParent({ id }));
              }}
              onUpdate={({ previousValue, value }) => {
                const newData = fetchSelectedPHIDOption(value);
                const prevId = previousValue.split(":")[1];
                const newId = value.split(":")[1];
                dispatch(
                  actions.replaceParent({
                    prevID: prevId,
                    id: newId,
                    title: newData?.title ?? "",
                  }),
                );
              }}
            />

            <MultiPhIdForm
              label="Original Context Data"
              data={documentState.originalContextData.map((element) => {
                const initialOption: PHIDOption = {
                  icon: "File",
                  title: element.title ?? "",
                  value: `phd:${element.id}`,
                };

                return {
                  id: `phd:${element.id}`,
                  initialOptions: [initialOption],
                };
              })}
              onAdd={(value) => {
                const newData = fetchSelectedPHIDOption(value);
                const newId = value.split(":")[1];
                dispatch(
                  actions.addContextData({
                    id: newId,
                    title: newData?.title ?? "",
                  }),
                );
              }}
              onRemove={({ value }) => {
                const id = value.split(":")[1];
                dispatch(actions.removeContextData({ id }));
              }}
              onUpdate={({ previousValue, value }) => {
                const newData = fetchSelectedPHIDOption(value);
                const prevId = previousValue.split(":")[1];
                const newId = value.split(":")[1];
                dispatch(
                  actions.replaceContextData({
                    prevId,
                    id: newId,
                    title: newData?.title ?? "",
                  }),
                );
              }}
            />

            <GlobalTagsForm
              value={documentState.globalTags}
              baselineValue={[]}
              onSave={(value) => {
                const newTags = value as MGlobalTag[];
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
