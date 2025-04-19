import { cn } from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
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
import { useEffect, useState } from "react";
import {
  getFlexLayoutClassName,
  getWidthClassName,
} from "../../shared/utils/styles.js";
import { MarkdownEditor } from "../../shared/components/markdown-editor.js";
import { MultiPhIdForm } from "../../shared/components/forms/MultiPhIdForm.js";

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

  return (
    <FormModeProvider mode={mode}>
      <ContentCard tagText={tagText} variant={cardVariant}>
        <div className={cn("flex flex-col gap-3")}>
          <div className={getFlexLayoutClassName(isSplitMode ?? false)}>
            <div className={cn("flex-1")}>
              {/* TODO: remove this and fix the layout if needed */}
              {/* <DocNoForm
                value={documentState.}
                baselineValue={originalNodeState.docNo}
                onSave={(value) => {
                  dispatch(
                    actions.setDocNumber({ docNo: getStringValue(value) }),
                  );
                }}
              /> */}
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
            {/* TODO: fix parents array */}
            {/* <ParentsArray
              onAdd={(value) => {
                const phid = value.split(":")[1];
                dispatch(actions.addParent({ id: phid }));
              }}
              onRemove={(value) => {
                const phid = value.split(":")[1];
                dispatch(actions.removeReference({ id: phid }));
              }}
              onUpdate={() => {
                // TODO: implement references updates
                throw new Error("Updates not supported yet");
              }}
              parents={documentState.parents}
            /> */}

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
