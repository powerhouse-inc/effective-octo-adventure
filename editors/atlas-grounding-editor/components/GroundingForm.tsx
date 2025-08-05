import { cn, type ViewMode } from "@powerhousedao/document-engineering/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  getCardVariant,
  getStringValue,
  getTagText,
  shouldShowSkeleton,
} from "../../shared/utils/utils.js";
import { type PHIDOption } from "@powerhousedao/document-engineering/ui";
import { FormModeProvider } from "../../shared/providers/FormModeProvider.js";
import { DocNoForm } from "../../shared/components/forms/DocNoForm.js";
import type { IProps } from "../editor.js";
import {
  actions,
  type GAtlasType,
} from "../../../document-models/atlas-grounding/index.js";
import { DocNameForm } from "../../shared/components/forms/DocNameForm.js";
import { DocTypeForm } from "../../shared/components/forms/DocTypeForm.js";
import { MasterStatusForm } from "../../shared/components/forms/MasterStatusForm.js";
import { SinglePhIdForm } from "../../shared/components/forms/SinglePhIdForm.js";
import { GlobalTagsForm } from "../../shared/components/forms/GlobalTagsForm.js";
import {
  getFlexLayoutClassName,
  getWidthClassName,
} from "../../shared/utils/styles.js";
import { MultiUrlForm } from "../../shared/components/forms/MultiUrlForm.js";
import { useParentOptions } from "../../shared/hooks/useParentOptions.js";
import { MarkdownContentForm } from "../../shared/components/forms/MarkdownContentForm.js";
import { useBaseDocumentCached } from "../../shared/hooks/useBaseDocumentCached.js";
import { useElementVisibility } from "../../shared/hooks/useElementVisibility.js";

interface GroundingFormProps
  extends Pick<IProps, "context" | "document" | "dispatch"> {
  mode: ViewMode;
  isSplitMode?: boolean;
}

export function GroundingForm({
  context,
  document,
  dispatch,
  mode,
  isSplitMode,
}: GroundingFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  const fetchOptionsCallback = useParentOptions(
    "sky/atlas-grounding",
    document.header.id,
  );

  const originalDocumentState = document.state.global;
  const parentId = originalDocumentState.parent?.id
    ? `phd:${originalDocumentState.parent.id}`
    : "";
  const parentTitle = originalDocumentState.parent?.title ?? "";
  const parentType = originalDocumentState.parent?.documentType ?? "";

  const parentPHIDInitialOption: PHIDOption = {
    icon: "File",
    title: parentTitle,
    path: parentType,
    value: parentId,
  };

  const documentState = {
    ...originalDocumentState,
    parent: parentId,
  };

  const baseDocument = useBaseDocumentCached(document, context);
  const loading = shouldShowSkeleton(mode, baseDocument);

  const { preserveSpace, showLastElement } = useElementVisibility({
    mode,
    isSplitMode,
    contextDataLength: documentState?.originalContextData?.length ?? 0,
  });

  return (
    <FormModeProvider mode={mode}>
      <ContentCard tagText={tagText} variant={cardVariant}>
        <div className={cn("flex flex-col gap-3")}>
          <div className={getFlexLayoutClassName(isSplitMode ?? false)}>
            <div className={cn("flex-1")}>
              <DocNoForm
                loading={loading}
                value={documentState.docNo}
                baselineValue={baseDocument?.state.global.docNo ?? ""}
                onSave={(value) => {
                  dispatch(actions.setDocNumber({ docNo: value }));
                }}
              />
            </div>
            <div className={cn("flex-1")}>
              <DocNameForm
                loading={loading}
                value={documentState.name}
                baselineValue={baseDocument?.state.global.name ?? ""}
                onSave={(value) => {
                  dispatch(
                    actions.setGroundingName({
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
                loading={loading}
                value={documentState.atlasType}
                baselineValue={baseDocument?.state.global.atlasType ?? ""}
                options={[
                  { value: "ACTIVE_DATA", label: "ACTIVE_DATA" },
                  {
                    value: "ORIGINAL_CONTEXT_DATA",
                    label: "ORIGINAL_CONTEXT_DATA",
                  },
                  { value: "TENET", label: "TENET" },
                ]}
                onSave={(value) => {
                  dispatch(
                    actions.setAtlasType({ atlasType: value as GAtlasType }),
                  );
                }}
              />
            </div>
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
            <SinglePhIdForm
              loading={loading}
              label="Parent Document"
              value={documentState.parent}
              fetchOptionsCallback={fetchOptionsCallback}
              baselineValue={
                baseDocument?.state.global.parent?.id
                  ? `phd:${baseDocument?.state.global.parent.id}`
                  : ""
              }
              baselineIcon={baseDocument?.state.global.parent?.icon ?? ""}
              baselineTitle={baseDocument?.state.global.parent?.title ?? ""}
              baselineType={
                baseDocument?.state.global.parent?.documentType ?? ""
              }
              onSave={(value) => {
                if (value === null || value === "") {
                  dispatch(
                    actions.setParent({
                      id: "",
                    }),
                  );
                } else {
                  const newParentId = value.split(":")[1];
                  const newParentData = fetchOptionsCallback(value)[0];
                  const documentType =
                    typeof newParentData?.path === "object"
                      ? newParentData.path.text
                      : newParentData?.path;
                  dispatch(
                    actions.setParent({
                      id: newParentId,
                      title: newParentData?.title ?? "",
                      documentType: documentType ?? "",
                    }),
                  );
                }
              }}
              initialOptions={[parentPHIDInitialOption]}
            />
            {preserveSpace &&
              documentState.originalContextData.length === 0 && (
                <div className={cn("h-[63px]")} />
              )}
            <MultiUrlForm
              isSplitMode={isSplitMode ?? false}
              loading={loading}
              showAddField={showLastElement}
              viewMode={mode}
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
