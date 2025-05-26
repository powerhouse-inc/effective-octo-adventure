import { cn, type ViewMode } from "@powerhousedao/document-engineering/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  getCardVariant,
  getStringValue,
  getTagText,
} from "../../shared/utils/utils.js";
import { type ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import { getOriginalNotionDocument } from "../../../document-models/utils.js";
import {
  getFlexLayoutClassName,
  getWidthClassName,
} from "../../shared/utils/styles.js";
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
import { MultiUrlForm } from "../../shared/components/forms/MultiUrlForm.js";
import { transformUrl } from "../../shared/utils/utils.js";
import { MarkdownContentForm } from "../../shared/components/forms/MarkdownContentForm.js";

interface ScopeFormProps extends Pick<IProps, "document" | "dispatch"> {
  mode: ViewMode;
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

  // baseline document state
  const originalNodeState = getOriginalNotionDocument(
    (documentState.notionId as string) || "notion-id-not-set",
    // @ts-ignore
    (documentState.atlasType as ParsedNotionDocumentType) || "article",
  );

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
                  dispatch(
                    actions.setScopeName({ name: getStringValue(value) }),
                  );
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
          <div className={cn("flex-1 min-h-[350px]")}>
            <MarkdownContentForm
              value={documentState.content ?? ""}
              baselineValue={""}
              onSave={(value) => {
                dispatch(actions.setContent({ content: value }));
              }}
            />
          </div>

          <div className={cn("flex flex-col gap-4")}>
            <div className={cn(getWidthClassName(isSplitMode ?? false))}>
              <MultiUrlForm
                label="Original Context Data"
                data={documentState.originalContextData.map((element) => {
                  return {
                    id: transformUrl(element),
                    value: element,
                  };
                })}
                onAdd={(value) => {
                  dispatch(
                    actions.addContextData({
                      id: value,
                    }),
                  );
                }}
                onRemove={({ value }) => {
                  const id = value;
                  dispatch(actions.removeContextData({ id }));
                }}
                onUpdate={({ previousValue, value }) => {
                  const prevId = previousValue;
                  const newId = value;
                  dispatch(
                    actions.replaceContextData({
                      prevId,
                      id: newId,
                    }),
                  );
                }}
              />
            </div>
            <div className={cn(getWidthClassName(isSplitMode ?? false))}>
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
            </div>
          </div>
        </div>
      </ContentCard>
    </FormModeProvider>
  );
}
