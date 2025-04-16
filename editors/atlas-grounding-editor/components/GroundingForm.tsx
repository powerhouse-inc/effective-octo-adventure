import { cn } from "@powerhousedao/design-system/scalars";
import { useState } from "react";
import ContentCard from "../../shared/components/content-card.js";
import {
  fetchSelectedPHIDOption,
  getCardVariant,
  getStringValue,
  getTagText,
  getTitleText,
  parseTitleText,
} from "../../shared/utils/utils.js";
import { type PHIDOption } from "@powerhousedao/design-system/ui";
import type { EditorMode } from "../../shared/types.js";
import {
  getOriginalNotionDocument,
  pndContentToString,
} from "../../../document-models/utils.js";
import { type ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import {
  getFlexLayoutClassName,
  getWidthClassName,
} from "../../shared/utils/styles.js";
import { FormModeProvider } from "../../shared/providers/FormModeProvider.js";
import { DocNoForm } from "../../shared/components/forms/DocNoForm.js";
import type { IProps } from "../editor.js";
import {
  actions,
  type GAtlasType,
  type GGlobalTag,
} from "../../../document-models/atlas-grounding/index.js";
import { DocNameForm } from "../../shared/components/forms/DocNameForm.js";
import { DocTypeForm } from "../../shared/components/forms/DocTypeForm.js";
import { MasterStatusForm } from "../../shared/components/forms/MasterStatusForm.js";
import { ContentForm } from "../../shared/components/forms/ContentForm.js";
import { SinglePhIdForm } from "../../shared/components/forms/SinglePhIdForm.js";
import { ContextDataForm } from "../../shared/components/forms/ContextDataForm.js";
import { ProvenanceForm } from "../../shared/components/forms/ProvenanceForm.js";
import { GlobalTagsForm } from "../../shared/components/forms/GlobalTagsForm.js";
import ReferencesArray from "../../shared/components/forms/ReferencesArray.js";

interface GroundingFormProps extends Pick<IProps, "document" | "dispatch"> {
  mode: EditorMode;
  isSplitMode?: boolean;
}

export function GroundingForm({
  document,
  dispatch,
  mode,
  isSplitMode,
}: GroundingFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  const originalDocumentState = document.state.global;
  const parentId = originalDocumentState.parent?.id
    ? `phd:${originalDocumentState.parent.id}`
    : "";
  const parentDocNo = originalDocumentState.parent?.docNo ?? "";
  const parentName = originalDocumentState.parent?.name ?? "";

  const parentPHIDInitialOption: PHIDOption = {
    icon: "File",
    title: getTitleText(parentDocNo, parentName),
    value: parentId,
  };

  const documentState = {
    ...originalDocumentState,
    parent: parentId,
    provenance: originalDocumentState.provenance?.[0] || "",
  };

  // baseline node state
  const [originalNodeState] = useState(() =>
    getOriginalNotionDocument(
      (documentState.notionId as string) || "notion-id-not-set",
      (documentState.atlasType as ParsedNotionDocumentType) || "tenet",
    ),
  );

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
                  dispatch(
                    actions.setDocNumber({ docNo: getStringValue(value) }),
                  );
                }}
              />
            </div>
            <div className={cn("flex-1")}>
              <DocNameForm
                value={documentState.name}
                baselineValue={originalNodeState.name}
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
                value={documentState.atlasType}
                baselineValue={originalNodeState.type?.toUpperCase()}
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
                    actions.setAtlasType({
                      atlasType: value as GAtlasType,
                    }),
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

          <ContentForm
            value={documentState.content}
            baselineValue={originalNodeState.content
              .map((c) => pndContentToString(c))
              .join("\n")
              .trim()}
            onSave={(value) => {
              dispatch(actions.setContent({ content: getStringValue(value) }));
            }}
          />

          <div
            className={cn(
              "flex flex-col gap-3",
              getWidthClassName(!!isSplitMode),
            )}
          >
            <SinglePhIdForm
              label="Parent Document"
              value={documentState.parent}
              baselineValue={originalNodeState.parents?.[0] ?? ""}
              onSave={(value) => {
                if (value === null) {
                  dispatch(
                    actions.setParent({
                      id: "",
                      docNo: undefined,
                      name: undefined,
                    }),
                  );
                } else {
                  const newParentId = value.split(":")[1];
                  const newParentData = fetchSelectedPHIDOption(value);
                  const { docNo, name } = parseTitleText(
                    newParentData?.title ?? "",
                  );
                  dispatch(
                    actions.setParent({
                      id: newParentId,
                      docNo,
                      name,
                    }),
                  );
                }
              }}
              initialOptions={[parentPHIDInitialOption]}
            />

            <ContextDataForm
              onAdd={(value) => {
                dispatch(actions.addContextData({ id: value }));
              }}
              onRemove={(value) => {
                dispatch(actions.removeContextData({ id: value }));
              }}
              onUpdate={(value) => {
                // TODO: implement context data updates
                throw new Error("Updates not supported yet");
              }}
              data={documentState.originalContextData}
            />

            <ProvenanceForm
              value={documentState.provenance}
              baselineValue={originalNodeState.hubUrls[0]}
              onSave={(value) => {
                dispatch(actions.setProvenance({ provenance: [value] }));
              }}
            />

            <GlobalTagsForm
              value={documentState.globalTags}
              baselineValue={[]}
              onSave={(value) => {
                const newTags = value as GGlobalTag[];
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

            <ReferencesArray
              onAdd={(value) => {
                const phid = value.split(":")[1];
                dispatch(actions.addReference({ id: phid }));
              }}
              onRemove={(value) => {
                const phid = value.split(":")[1];
                dispatch(actions.removeReference({ id: phid }));
              }}
              onUpdate={() => {
                // TODO: implement references updates
                throw new Error("Updates not supported yet");
              }}
              references={documentState.references}
            />
          </div>
        </div>
      </ContentCard>
    </FormModeProvider>
  );
}
