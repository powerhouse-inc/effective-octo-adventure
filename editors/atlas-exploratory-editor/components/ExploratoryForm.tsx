import { cn } from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import { getCardVariant, getTagText } from "../../shared/utils/utils.js";
import type { EditorMode } from "../../shared/types.js";
import { getOriginalNotionDocument } from "../../../document-models/utils.js";
import { type ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import { type PHIDOption } from "@powerhousedao/design-system/ui";
import { DocNoForm } from "../../shared/components/forms/DocNoForm.js";
import type { IProps } from "../editor.js";
import {
  actions,
  type EGlobalTag,
  type AtlasExploratoryState,
  type EAtlasType,
} from "../../../document-models/atlas-exploratory/index.js";
import { FormModeProvider } from "../../shared/providers/FormModeProvider.js";
import { DocNameForm } from "../../shared/components/forms/DocNameForm.js";
import { DocTypeForm } from "../../shared/components/forms/DocTypeForm.js";
import { MasterStatusForm } from "../../shared/components/forms/MasterStatusForm.js";
import { AdditionalGuidance } from "./AdditionalGuidance.js";
import { GlobalTagsForm } from "../../shared/components/forms/GlobalTagsForm.js";
import { SinglePhIdForm } from "../../shared/components/forms/SinglePhIdForm.js";
import { Toggle } from "@powerhousedao/design-system/ui";
import { useEffect, useState } from "react";
import { MarkdownEditor } from "../../shared/components/markdown-editor.js";
import { MultiPhIdForm } from "../../shared/components/forms/MultiPhIdForm.js";

interface ExploratoryFormProps extends Pick<IProps, "document" | "dispatch"> {
  mode: EditorMode;
  parentPHIDInitialOption?: PHIDOption;
  originalContextDataPHIDInitialOption?: PHIDOption;
  isAligned?: boolean;
  isSplitMode?: boolean;
}

export function ExploratoryForm({
  document,
  dispatch,
  mode,
  parentPHIDInitialOption,
  originalContextDataPHIDInitialOption,
  isAligned,
  isSplitMode,
}: ExploratoryFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  const documentState = document.state.global;
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

  // baseline node state
  const [originalNodeState] = useState(
    () =>
      getOriginalNotionDocument(
        (documentState.notionId as string) || "notion-id-not-set",
        (documentState.atlasType as ParsedNotionDocumentType) || "article",
      ) as unknown as AtlasExploratoryState,
  );

  return (
    <FormModeProvider mode={mode}>
      <ContentCard tagText={tagText} variant={cardVariant} className="mt-4">
        <div className="flex flex-col gap-4">
          <div
            className={cn(
              "flex flex-row gap-2",
              isSplitMode ? "flex-col" : "flex-row",
            )}
          >
            <div className={cn(isSplitMode ? "w-full" : "w-1/2")}>
              <DocNoForm
                value={documentState.docNo}
                baselineValue={originalNodeState.docNo}
                onSave={(value) => {
                  dispatch(actions.setDocNumber({ docNo: value }));
                }}
              />
            </div>
            <div className={cn(isSplitMode ? "w-full" : "w-1/2")}>
              <DocNameForm
                value={documentState.name}
                baselineValue={originalNodeState.name}
                onSave={(value) => {
                  dispatch(actions.setExploratoryName({ name: value }));
                }}
                placeholder="Name"
              />
            </div>
          </div>
          <div
            className={cn(
              "flex flex-row gap-2",
              isSplitMode ? "flex-col" : "flex-row",
            )}
          >
            <div className={cn(isSplitMode ? "w-full" : "w-1/2")}>
              <DocTypeForm
                value={documentState.atlasType}
                // TODO: fix this once we can access the real baseline document
                // @ts-ignore
                // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
                baselineValue={originalNodeState.type?.toUpperCase()}
                options={[
                  { value: "SCENARIO", label: "SCENARIO" },
                  {
                    value: "SCENARIO_VARIATION",
                    label: "SCENARIO_VARIATION",
                  },
                ]}
                onSave={(value) => {
                  dispatch(
                    actions.setAtlasType({
                      atlasType: value as EAtlasType,
                    }),
                  );
                }}
              />
            </div>
            <div className={cn(isSplitMode ? "w-full" : "w-1/2")}>
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
          <div
            className={cn(
              "flex flex-col gap-4",
              isSplitMode ? "w-full" : "w-1/2",
            )}
          >
            <SinglePhIdForm
              label="Parent Document"
              value={documentState.parent}
              baselineValue={""}
              onSave={(value) => {
                if (value === null || value === "") {
                  dispatch(actions.setParent({ parent: "" }));
                } else {
                  const newParentId = value.split(":")[1];
                  dispatch(actions.setParent({ parent: newParentId }));
                }
              }}
            />
          </div>
          {/* TODO: Improve this in next iteration */}
          <div className="flex flex-row justify-end items-center gap-2">
            <span
              className={cn(
                !isAligned ? "text-gray-700" : "text-gray-300",
                "text-sm font-semibold leading-[22px]",
              )}
            >
              Misaligned
            </span>
            <Toggle
              disabled={mode === "Readonly"}
              name="findings.isAligned"
              value={documentState.findings.isAligned}
              onChange={() => {
                dispatch(
                  actions.setFindings({
                    isAligned: !documentState.findings.isAligned,
                  }),
                );
              }}
            />
            <span
              className={cn(
                isAligned ? "text-gray-700" : "text-gray-300",
                "text-sm font-semibold font-inter leading-[22px]",
              )}
            >
              Aligned
            </span>
          </div>

          <AdditionalGuidance
            value={documentState.additionalGuidance}
            baselineValue={""} // TODO: add the right baseline value
            onSave={(value) => {
              dispatch(
                actions.setAdditionalGuidance({
                  additionalGuidance: value,
                }),
              );
            }}
          />

          <div
            className={cn(
              "flex flex-col gap-4",
              isSplitMode ? "w-full" : "w-1/2",
            )}
          >
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
                const newTags = value as EGlobalTag[];
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
          </div>
        </div>
      </ContentCard>
    </FormModeProvider>
  );
}
