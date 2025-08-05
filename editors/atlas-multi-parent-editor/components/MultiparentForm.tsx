import { cn, type ViewMode } from "@powerhousedao/document-engineering/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  getCardVariant,
  getStringValue,
  getTagText,
  shouldShowSkeleton,
} from "../../shared/utils/utils.js";
import { FormModeProvider } from "../../shared/providers/FormModeProvider.js";
import type { IProps } from "../editor.js";
import {
  actions,
  type MAtlasType,
} from "../../../document-models/atlas-multi-parent/index.js";
import { DocNameForm } from "../../shared/components/forms/DocNameForm.js";
import { DocTypeForm } from "../../shared/components/forms/DocTypeForm.js";
import { MasterStatusForm } from "../../shared/components/forms/MasterStatusForm.js";
import { GlobalTagsForm } from "../../shared/components/forms/GlobalTagsForm.js";
import {
  getFlexLayoutClassName,
  getWidthClassName,
} from "../../shared/utils/styles.js";
import { MultiPhIdForm } from "../../shared/components/forms/MultiPhIdForm.js";
import type { PHIDOption } from "@powerhousedao/document-engineering/ui";
import { useParentOptions } from "../../shared/hooks/useParentOptions.js";
import { MultiUrlForm } from "../../shared/components/forms/MultiUrlForm.js";
import { MarkdownContentForm } from "../../shared/components/forms/MarkdownContentForm.js";
import { useBaseDocumentCached } from "../../shared/hooks/useBaseDocumentCached.js";
import { useElementVisibility } from "../../shared/hooks/useElementVisibility.js";

interface MultiParentFormProps
  extends Pick<IProps, "context" | "document" | "dispatch"> {
  mode: ViewMode;
  isSplitMode?: boolean;
}

export function MultiParentForm({
  context,
  document,
  dispatch,
  mode,
  isSplitMode,
}: MultiParentFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);
  const documentState = document.state.global;

  const fetchOptionsCallback = useParentOptions(
    "sky/atlas-multiparent",
    document.header.id,
  );

  const baseDocument = useBaseDocumentCached(document, context);
  const loading = shouldShowSkeleton(mode, baseDocument);

  const { preserveSpace, showLastElement } = useElementVisibility({
    mode,
    isSplitMode,
    contextDataLength: documentState?.originalContextData?.length ?? 0,
  });
  const {
    preserveSpace: preserveSpaceParents,
    showLastElement: showLastElementParents,
  } = useElementVisibility({
    mode,
    isSplitMode,
    contextDataLength: documentState.parents.length ?? 0,
  });

  return (
    <FormModeProvider mode={mode}>
      <ContentCard tagText={tagText} variant={cardVariant}>
        <div className={cn("flex flex-col gap-3")}>
          <div className={getFlexLayoutClassName(isSplitMode ?? false)}>
            <div className={cn("flex-1")}>
              <DocNameForm
                loading={loading}
                value={documentState.name}
                baselineValue={baseDocument?.state.global.name ?? ""}
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
                loading={loading}
                value={documentState.atlasType}
                baselineValue={baseDocument?.state.global.atlasType ?? ""}
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
                loading={loading}
                value={documentState.masterStatus}
                baselineValue={baseDocument?.state.global.masterStatus ?? ""}
                onSave={(value) => {
                  dispatch(actions.setMasterStatus({ masterStatus: value }));
                }}
              />
            </div>
          </div>
          <div className={cn("min-h-[350px] flex-1")}>
            <MarkdownContentForm
              loading={loading}
              value={documentState.content ?? ""}
              baselineValue={baseDocument?.state.global.content ?? ""}
              onSave={(value) => {
                dispatch(actions.setContent({ content: value }));
              }}
            />
          </div>

          <div
            className={cn(
              "flex flex-col gap-3",
              getWidthClassName(!!isSplitMode),
            )}
          >
            <MultiPhIdForm
              isSplitMode={isSplitMode ?? false}
              loading={loading}
              showAddField={showLastElementParents}
              label="Parent Documents"
              data={documentState.parents.map((element) => {
                const initialOption: PHIDOption = {
                  icon: "File",
                  title: element.title ?? "",
                  path: element.documentType ?? "",
                  value: `phd:${element.id}`,
                };

                return {
                  id: `phd:${element.id}`,
                  initialOptions: [initialOption],
                };
              })}
              fetchOptionsCallback={fetchOptionsCallback}
              baselineValue={baseDocument?.state.global.parents ?? []}
              document={document}
              onAdd={(value) => {
                const newData = fetchOptionsCallback(value)[0];
                const newId = value.split(":")[1];
                const documentType =
                  typeof newData?.path === "object"
                    ? newData.path.text
                    : newData?.path;
                dispatch(
                  actions.addParent({
                    id: newId,
                    title: newData?.title ?? "",
                    documentType: documentType ?? "",
                    docNo:
                      newData &&
                      typeof newData === "object" &&
                      "docNo" in newData
                        ? (newData as { docNo?: string }).docNo
                        : undefined,
                  }),
                );
              }}
              onRemove={({ value }) => {
                const id = value.split(":")[1];
                dispatch(actions.removeParent({ id }));
              }}
              onUpdate={({ previousValue, value }) => {
                const newData = fetchOptionsCallback(value)[0];
                const prevId = previousValue.split(":")[1];
                const newId = value.split(":")[1];
                const documentType =
                  typeof newData?.path === "object"
                    ? newData.path.text
                    : newData?.path;
                dispatch(
                  actions.replaceParent({
                    prevID: prevId,
                    id: newId,
                    title: newData?.title ?? "",
                    documentType: documentType ?? "",
                    docNo:
                      newData &&
                      typeof newData === "object" &&
                      "docNo" in newData
                        ? (newData as { docNo?: string }).docNo
                        : undefined,
                  }),
                );
              }}
            />
            {preserveSpaceParents && documentState.parents.length !== 0 && (
              <div className={cn("h-[92px]")} />
            )}
            {preserveSpace &&
              documentState.originalContextData.length === 0 && (
                <div className={cn("h-[63px]")} />
              )}

            <MultiUrlForm
              isSplitMode={isSplitMode ?? false}
              loading={loading}
              viewMode={mode}
              showAddField={showLastElement}
              baselineValue={
                baseDocument?.state.global.originalContextData ?? []
              }
              label="Original Context Data"
              data={documentState.originalContextData}
              document={document}
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
            {preserveSpace && documentState.originalContextData.length > 0 && (
              <div className={cn("h-[36px]")} />
            )}
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
