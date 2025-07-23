import { cn, type ViewMode } from "@powerhousedao/document-engineering/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  getCardVariant,
  getStringValue,
  getTagText,
  shouldShowLastElement,
  shouldShowSkeleton,
} from "../../shared/utils/utils.js";
import {
  getFlexLayoutClassName,
  getWidthClassName,
} from "../../shared/utils/styles.js";
import { FormModeProvider } from "../../shared/providers/FormModeProvider.js";
import { DocNoForm } from "../../shared/components/forms/DocNoForm.js";
import type { IProps } from "../editor.js";
import { actions } from "../../../document-models/atlas-scope/index.js";
import { DocNameForm } from "../../shared/components/forms/DocNameForm.js";
import { MasterStatusForm } from "../../shared/components/forms/MasterStatusForm.js";
import { GlobalTagsForm } from "../../shared/components/forms/GlobalTagsForm.js";
import { MultiUrlForm } from "../../shared/components/forms/MultiUrlForm.js";
import { transformUrl } from "../../shared/utils/utils.js";
import { MarkdownContentForm } from "../../shared/components/forms/MarkdownContentForm.js";
import { useBaseDocumentCached } from "../../shared/hooks/useBaseDocumentCached.js";

interface ScopeFormProps
  extends Pick<IProps, "context" | "document" | "dispatch"> {
  mode: ViewMode;
  isSplitMode?: boolean;
}

export function ScopeForm({
  context,
  document,
  dispatch,
  mode,
  isSplitMode,
}: ScopeFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  const documentState = document.state.global;

  const baseDocument = useBaseDocumentCached(document, context);
  const loading = shouldShowSkeleton(mode, baseDocument);

  const preserveSpace = mode === "mixed" && isSplitMode;
  const showLastElement = shouldShowLastElement({
    mode,
    isSplitMode,
    contextDataLength: documentState?.originalContextData?.length ?? 0,
  });

  return (
    <FormModeProvider mode={mode}>
      <ContentCard tagText={tagText} variant={cardVariant}>
        <div className="flex flex-col gap-4">
          <div className={cn(getFlexLayoutClassName(isSplitMode ?? false))}>
            <div className="flex-1">
              <DocNoForm
                loading={loading}
                value={documentState.docNo}
                baselineValue={baseDocument?.state.global.docNo ?? ""}
                onSave={(value) => {
                  dispatch(actions.setDocNumber({ docNo: value }));
                }}
              />
            </div>
            <div className="flex-1 min-w-[200px]">
              <DocNameForm
                loading={loading}
                value={documentState.name}
                baselineValue={baseDocument?.state.global.name ?? ""}
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
                loading={loading}
                value={documentState.masterStatus}
                baselineValue={baseDocument?.state.global.masterStatus ?? ""}
                onSave={(value) => {
                  dispatch(actions.setMasterStatus({ masterStatus: value }));
                }}
              />
            </div>
          </div>
          <div className={cn("flex-1 min-h-[350px]")}>
            <MarkdownContentForm
              loading={loading}
              value={documentState.content ?? ""}
              baselineValue={baseDocument?.state.global.content ?? ""}
              onSave={(value) => {
                dispatch(actions.setContent({ content: value }));
              }}
            />
          </div>

          <div className={cn("flex flex-col gap-4")}>
            <div className={cn(getWidthClassName(isSplitMode ?? false))}>
              {preserveSpace &&
                documentState.originalContextData.length === 0 && (
                  <div className={cn("h-[63px]")} />
                )}
              <MultiUrlForm
                loading={loading}
                viewMode={mode}
                showAddField={showLastElement}
                baselineValue={
                  baseDocument?.state.global.originalContextData ?? []
                }
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
            {preserveSpace && documentState.originalContextData.length > 0 && (
              <div className={cn("h-[36px]")} />
            )}
            <div className={cn(getWidthClassName(isSplitMode ?? false))}>
              <GlobalTagsForm
                loading={loading}
                value={documentState.globalTags}
                baselineValue={baseDocument?.state.global.globalTags ?? []}
                onSave={(value) => {
                  const newTags = value;
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
