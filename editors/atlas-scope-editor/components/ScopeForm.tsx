import { cn } from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  fetchSelectedPHIDOption,
  getCardVariant,
  getTagText,
} from "../../shared/utils/utils.js";
import type { EditorMode } from "../../shared/types.js";
import { useEffect, useRef, useState } from "react";
import { type UseFormReturn } from "react-hook-form";
import { type ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import { getOriginalNotionDocument } from "../../../document-models/utils.js";
import {
  getFlexLayoutClassName,
  getWidthClassName,
} from "../../shared/utils/styles.js";
import { PositionedWrapper } from "../../shared/components/PositionedWrapper.js";
import { FormModeProvider } from "../../shared/providers/FormModeProvider.js";
import { DocNoForm } from "../../shared/components/forms/DocNoForm.js";
import type { IProps } from "../editor.js";
import {
  actions,
  type GlobalTag,
} from "../../../document-models/atlas-scope/index.js";
import { DocNameForm } from "../../shared/components/forms/DocNameForm.js";
import { MasterStatusForm } from "../../shared/components/forms/MasterStatusForm.js";
import { GlobalTagsForm } from "../../shared/components/forms/GlobalTagsForm.js";
import { globalScopeTagsEnumOptions } from "../../shared/utils/common-options.js";
import { MarkdownEditor } from "../../shared/components/markdown-editor.js";
import { MultiPhIdForm } from "../../shared/components/forms/MultiPhIdForm.js";
import { type PHIDOption } from "@powerhousedao/design-system/ui";

interface ScopeFormProps extends Pick<IProps, "document" | "dispatch"> {
  mode: EditorMode;
  isSplitMode?: boolean;
}

export function ScopeForm({
  document,
  dispatch,
  mode,
  isSplitMode,
}: ScopeFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  const documentState = document.state.global;

  // TODO: replace the entire originalNodeState with the actual baseline document
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
    // Only submit if the content has actually changed
    if (contentValue !== documentState.content) {
      dispatch(actions.setContent({ content: contentValue }));
    }
  };

  // baseline document state
  const originalNodeState = getOriginalNotionDocument(
    (documentState.notionId as string) || "notion-id-not-set",
    // @ts-ignore
    (documentState.atlasType as ParsedNotionDocumentType) || "article",
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
      <ContentCard tagText={tagText} variant={cardVariant} className="mt-4">
        <div className="flex flex-col gap-4">
          <div className={cn(getFlexLayoutClassName(isSplitMode ?? false))}>
            <div className="flex-1">
              <DocNoForm
                value={documentState.docNo}
                baselineValue={originalNodeState.docNo}
                onSave={(value) => {
                  dispatch(actions.setDocNumber({ docNo: value }));
                }}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <DocNameForm
                value={documentState.name}
                baselineValue={originalNodeState.name}
                onSave={(value) => {
                  dispatch(actions.setScopeName({ name: value }));
                }}
                placeholder="The Governance Scope"
              />
            </div>
          </div>
          <div className={cn(getFlexLayoutClassName(isSplitMode ?? false))}>
            <div className={cn(getWidthClassName(isSplitMode ?? false))}>
              <MasterStatusForm
                value={documentState.masterStatus}
                baselineValue={originalNodeState.masterStatus[0]?.toUpperCase()}
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

          <div className={cn("flex flex-col gap-4")}>
            <div className={cn(getWidthClassName(isSplitMode ?? false))}>
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
            </div>
            <PositionedWrapper isSplitMode={isSplitMode}>
              <GlobalTagsForm
                options={globalScopeTagsEnumOptions}
                value={documentState.globalTags}
                baselineValue={[]}
                onSave={(value) => {
                  const newTags = value as GlobalTag[];
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
                    dispatch(actions.addTags({ newTags: tagsToAdd }));
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
            </PositionedWrapper>
          </div>
        </div>
      </ContentCard>
    </FormModeProvider>
  );
}
