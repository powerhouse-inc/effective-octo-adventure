import { cn, type ViewMode } from "@powerhousedao/document-engineering/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  fetchSelectedPHIDOption,
  getCardVariant,
  getStringValue,
  getTagText,
  mapViewMode,
} from "../../shared/utils/utils.js";
import { type PHIDOption } from "@powerhousedao/design-system/ui";
import { getOriginalNotionDocument } from "../../../document-models/utils.js";
import { type ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import { FormModeProvider } from "../../shared/providers/FormModeProvider.js";
import { DocNoForm } from "../../shared/components/forms/DocNoForm.js";
import type { IProps } from "../editor.js";
import {
  actions,
  type EGlobalTag,
  type EAtlasType,
} from "../../../document-models/atlas-exploratory/index.js";
import { Toggle } from "@powerhousedao/document-engineering/ui";
import { DocNameForm } from "../../shared/components/forms/DocNameForm.js";
import { DocTypeForm } from "../../shared/components/forms/DocTypeForm.js";
import { MasterStatusForm } from "../../shared/components/forms/MasterStatusForm.js";
import { AdditionalGuidance } from "./AdditionalGuidance.js";
import { GlobalTagsForm } from "../../shared/components/forms/GlobalTagsForm.js";
import { SinglePhIdForm } from "../../shared/components/forms/SinglePhIdForm.js";
import { useEffect, useMemo, useState } from "react";
import { MarkdownEditor } from "../../shared/components/markdown-editor.js";
import { MultiPhIdForm } from "../../shared/components/forms/MultiPhIdForm.js";
import {
  getFlexLayoutClassName,
  getWidthClassName,
} from "../../shared/utils/styles.js";

interface ExploratoryFormProps extends Pick<IProps, "document" | "dispatch"> {
  mode: ViewMode;
  isSplitMode?: boolean;
  isAligned?: boolean;
}

export function ExploratoryForm({
  document,
  dispatch,
  mode,
  isSplitMode,
  isAligned,
}: ExploratoryFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  const originalDocumentState = document.state.global;
  const parentId = originalDocumentState.parent?.id
    ? `phd:${originalDocumentState.parent.id}`
    : "";
  const parentTitle = originalDocumentState.parent?.title ?? "";

  const parentPHIDInitialOption: PHIDOption = {
    icon: "File",
    title: parentTitle,
    value: parentId,
  };

  const documentState = {
    ...originalDocumentState,
    parent: parentId,
  };

  const [contentValue, setContentValue] = useState(documentState.content ?? "");

  // Update contentValue when documentState changes
  useEffect(() => {
    setContentValue(documentState.content ?? "");
  }, [documentState.content]);

  // Custom handler for content changes
  const handleContentChange = (value: string) => {
    setContentValue(value);
  };

  // Custom handler for content blur
  const handleContentBlur = () => {
    // Only save if the content has actually changed
    if (contentValue !== documentState.content) {
      dispatch(actions.setContent({ content: contentValue }));
    }
  };

  // baseline node state
  const [originalNodeState] = useState(() =>
    getOriginalNotionDocument(
      (documentState.notionId as string) || "notion-id-not-set",
      (documentState.atlasType as ParsedNotionDocumentType) || "scenario",
    ),
  );
  console.log("mode", mode, documentState.findings.isAligned);

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
                  dispatch(actions.setDocNumber({ docNo: value }));
                }}
              />
            </div>
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
          </div>
          <div className={getFlexLayoutClassName(isSplitMode ?? false)}>
            <div className={cn("flex-1")}>
              <DocTypeForm
                value={documentState.atlasType}
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
                    actions.setAtlasType({ atlasType: value as EAtlasType }),
                  );
                }}
              />
            </div>
            <div className={cn("flex-1")}>
              <MasterStatusForm
                value={documentState.masterStatus}
                baselineValue={originalNodeState.masterStatus[0]?.toUpperCase()}
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
            <SinglePhIdForm
              label="Parent Document"
              value={documentState.parent}
              // TODO: add the correct baseline value
              baselineValue={
                originalNodeState.parents?.[0] ??
                "phd:687933ce-87eb-4f35-a171-30333b31a462"
              }
              baselineIcon={undefined} // TODO: add the correct baseline icon
              baselineTitle={"Original title"} // TODO: add the correct baseline title
              baselineType={"original/type"} // TODO: add the correct baseline type
              baselineDescription={"original description"} // TODO: add the correct baseline description
              onSave={(value) => {
                if (value === null || value === "") {
                  dispatch(
                    actions.setParent({
                      id: "",
                    }),
                  );
                } else {
                  const newParentId = value.split(":")[1];
                  const newParentData = fetchSelectedPHIDOption(value);
                  dispatch(
                    actions.setParent({
                      id: newParentId,
                      title: newParentData?.title ?? "",
                    }),
                  );
                }
              }}
              initialOptions={[parentPHIDInitialOption]}
            />
          </div>

          <div className="flex flex-row justify-end items-center gap-2">
            <div className="flex items-center gap-2">
              <Toggle
                value={documentState.findings.isAligned}
                // TODO:Add correct base line
                baseValue={false}
                optionalLabel="Misaligned"
                viewMode={mapViewMode(mode)}
                label="Aligned"
                disabled={mode !== "edition"}
                name="findings.isAligned"
                onChange={() => {
                  dispatch(
                    actions.setFindings({
                      isAligned: !documentState.findings.isAligned,
                    }),
                  );
                }}
              />
            </div>
          </div>

          <AdditionalGuidance
            value={documentState.additionalGuidance}
            // TODO: add the right baseline value
            baselineValue={""}
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
              "flex flex-col gap-3",
              getWidthClassName(!!isSplitMode),
            )}
          >
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
              baselineValue={[]} // TODO: add the baseline value
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
