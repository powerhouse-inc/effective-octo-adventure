import { cn, type ViewMode } from "@powerhousedao/document-engineering/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  fetchSelectedPHIDOption,
  getCardVariant,
  getStringValue,
  getTagText,
} from "../../shared/utils/utils.js";
import { type PHIDOption } from "@powerhousedao/document-engineering/ui";
import { FormModeProvider } from "../../shared/providers/FormModeProvider.js";
import { DocNoForm } from "../../shared/components/forms/DocNoForm.js";
import type { IProps } from "../editor.js";
import { actions } from "../../../document-models/atlas-foundation/index.js";
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
import { transformUrl } from "../../shared/utils/utils.js";
import { MarkdownContentForm } from "../../shared/components/forms/MarkdownContentForm.js";
import { useBaseDocument } from "../../shared/hooks/useBaseDocument.js";

interface FoundationFormProps
  extends Pick<IProps, "context" | "document" | "dispatch"> {
  mode: ViewMode;
  isSplitMode?: boolean;
}

export function FoundationForm({
  context,
  document,
  dispatch,
  mode,
  isSplitMode,
}: FoundationFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  const fetchOptionsCallback = useParentOptions("sky/atlas-foundation");

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

  const baseDocument = useBaseDocument(document, context);

  return (
    <FormModeProvider mode={mode}>
      <ContentCard tagText={tagText} variant={cardVariant}>
        <div className={cn("flex flex-col gap-3")}>
          <div className={getFlexLayoutClassName(isSplitMode ?? false)}>
            <div className={cn("flex-1")}>
              <DocNoForm
                value={documentState.docNo}
                baselineValue={baseDocument.state.global.docNo}
                onSave={(value) => {
                  dispatch(actions.setDocNumber({ docNo: value }));
                }}
              />
            </div>
            <div className={cn("flex-1")}>
              <DocNameForm
                value={documentState.name}
                baselineValue={baseDocument.state.global.name}
                onSave={(value) => {
                  dispatch(
                    actions.setFoundationName({
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
                baselineValue={baseDocument.state.global.atlasType}
                onSave={(value) => {
                  dispatch(actions.setAtlasType({ atlasType: value }));
                }}
              />
            </div>
            <div className={cn("flex-1")}>
              <MasterStatusForm
                value={documentState.masterStatus}
                baselineValue={baseDocument.state.global.masterStatus}
                onSave={(value) => {
                  dispatch(actions.setMasterStatus({ masterStatus: value }));
                }}
              />
            </div>
          </div>
          <div className={cn("flex-1 min-h-[350px]")}>
            <MarkdownContentForm
              value={documentState.content ?? ""}
              baselineValue={baseDocument.state.global.content ?? ""}
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
              label="Parent Document"
              value={documentState.parent}
              fetchOptionsCallback={fetchOptionsCallback}
              baselineValue={
                baseDocument.state.global.parent?.id
                  ? `phd:${baseDocument.state.global.parent.id}`
                  : ""
              }
              baselineIcon={baseDocument.state.global.parent?.icon ?? ""}
              baselineTitle={baseDocument.state.global.parent?.title ?? ""}
              baselineType={
                baseDocument.state.global.parent?.documentType ?? ""
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
                  const newParentData = fetchSelectedPHIDOption(value);
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

            <MultiUrlForm
              viewMode={mode}
              baselineValue={baseDocument.state.global.originalContextData}
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

            <GlobalTagsForm
              value={documentState.globalTags}
              baselineValue={baseDocument.state.global.globalTags}
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
