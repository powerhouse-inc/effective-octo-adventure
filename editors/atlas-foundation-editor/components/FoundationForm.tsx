import { cn, Form } from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  fetchPHIDOptions,
  fetchSelectedPHIDOption,
  getCardVariant,
  getTagText,
} from "../../shared/utils/utils.js";
import { type PHIDOption } from "@powerhousedao/design-system/ui";
import type { EditorMode } from "../../shared/types.js";
import { getOriginalNotionDocument } from "../../../document-models/utils.js";
import { StringDiffField } from "../../shared/components/diff-fields/string-diff-field.js";
import { EnumDiffField } from "../../shared/components/diff-fields/enum-diff-field.js";
import { PHIDDiffField } from "../../shared/components/diff-fields/phid-diff-field.js";
import { UrlDiffField } from "../../shared/components/diff-fields/url-diff-field.js";
import { type ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import { useEffect, useRef, useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import { globalTagsEnumOptions } from "../../shared/utils/common-options.js";
import {
  getFlexLayoutClassName,
  getWidthClassName,
} from "../../shared/utils/styles.js";
import { FormModeProvider } from "../../shared/providers/FormModeProvider.js";
import { DocNoForm } from "../../shared/components/forms/DocNoForm.js";
import type { IProps } from "../editor.js";
import {
  actions,
  type AtlasFoundationDocument,
  type FAtlasType,
  type FGlobalTag,
  type FStatus,
} from "../../../document-models/atlas-foundation/index.js";
import { DocNameForm } from "../../shared/components/forms/DocNameForm.js";
import { DocTypeForm } from "../../shared/components/forms/DocTypeForm.js";
import { MasterStatusForm } from "../../shared/components/forms/MasterStatusForm.js";
import { ContentForm } from "../../shared/components/forms/ContentForm.js";
import { ProvenanceForm } from "../../shared/components/forms/ProvenanceForm.js";
import { SinglePhIdForm } from "../../shared/components/forms/SinglePhIdForm.js";

interface FoundationFormProps extends Pick<IProps, "document" | "dispatch"> {
  // onSubmit: (data: Record<string, any>) => void;
  // documentState: Record<string, any>;
  mode: EditorMode;
  parentPHIDInitialOption?: PHIDOption;
  originalContextDataPHIDInitialOption?: PHIDOption;
  referencesPHIDInitialOption?: PHIDOption;
  isSplitMode?: boolean;
}

export function FoundationForm({
  document,
  dispatch,
  mode,
  parentPHIDInitialOption,
  originalContextDataPHIDInitialOption,
  referencesPHIDInitialOption,
  isSplitMode,
}: FoundationFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  const stateDocument = document.state.global;
  const parentId = stateDocument.parent?.id
    ? `phd:${stateDocument.parent?.id}`
    : "";
  const originalContextDataId = stateDocument.originalContextData[0]?.id
    ? `phd:${stateDocument.originalContextData[0].id}`
    : "";
  const referencesId = stateDocument.references[0]?.id
    ? `phd:${stateDocument.references[0].id}`
    : "";

  const documentState = {
    ...stateDocument,
    parent: parentId,
    provenance: stateDocument.provenance[0] || "",
    originalContextData: originalContextDataId,
    references: referencesId,
  };

  // baseline node state
  const [originalNodeState] = useState(() =>
    getOriginalNotionDocument(
      (documentState.notionId as string) || "notion-id-not-set",
      (documentState.atlasType as ParsedNotionDocumentType) || "article",
    ),
  );

  return (
    <FormModeProvider mode={mode}>
      <ContentCard
        tagText={tagText}
        variant={cardVariant}
        className={cn("mt-4")}
      >
        <div className={cn("flex flex-col gap-3")}>
          <div className={getFlexLayoutClassName(isSplitMode ?? false)}>
            <div className={cn("flex-1 truncate")}>
              <DocNoForm
                value={documentState.docNo}
                baselineValue={originalNodeState.docNo}
                onSave={(value) => {
                  dispatch(actions.setDocNumber({ docNo: value }));
                }}
              />
            </div>
            <div className={cn("flex-1 truncate")}>
              <DocNameForm
                value={documentState.name}
                baselineValue={originalNodeState.name}
                onSave={(value) => {
                  dispatch(actions.setFoundationName({ name: value }));
                }}
                placeholder="Name"
              />
            </div>
          </div>
          <div className={getFlexLayoutClassName(isSplitMode ?? false)}>
            <div className={cn("flex-1")}>
              <DocTypeForm
                value={documentState.atlasType}
                baselineValue={originalNodeState.type?.toUpperCase()}
                onSave={(value) => {
                  dispatch(actions.setAtlasType({ atlasType: value }));
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
            baselineValue={
              typeof originalNodeState.content[0]?.text === "string"
                ? originalNodeState.content[0]?.text
                : originalNodeState.content[0]?.text[0]?.plain_text
            }
            onSave={(value) => {
              dispatch(actions.setContent({ content: value }));
            }}
          />

          <div className={getWidthClassName(isSplitMode ?? false)}>
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
                  dispatch(
                    actions.setParent({
                      id: newParentId,
                      docNo: newParentData?.title?.split(" - ")[0] ?? "",
                      name: newParentData?.title?.split(" - ")[1] ?? "",
                    }),
                  );
                }
              }}
            />
          </div>

          <div className={getWidthClassName(isSplitMode ?? false)}>
            <SinglePhIdForm
              label="Original Context Data"
              value={documentState.originalContextData}
              baselineValue={""}
              onSave={(value) => {
                if (value === null) {
                  dispatch(
                    actions.removeContextData({
                      id: documentState.originalContextData.split(":")[1],
                    }),
                  );
                } else {
                  const newOriginalContextDataId = value.split(":")[1];
                  dispatch(
                    actions.addContextData({ id: newOriginalContextDataId }),
                  );
                }
              }}
            />
          </div>

          <div className={getWidthClassName(isSplitMode ?? false)}>
            <ProvenanceForm
              value={documentState.provenance}
              baselineValue={originalNodeState.hubUrls[0]}
              onSave={(value) => {
                dispatch(actions.setProvenance({ provenance: [value] }));
              }}
            />
          </div>

          {/*
          <div className={getWidthClassName(isSplitMode ?? false)}>
            <EnumDiffField
              name="globalTags"
              label="Tags"
              placeholder="Select Tags"
              options={globalTagsEnumOptions}
              variant="Select"
              multiple
              onBlur={triggerSubmit}
              mode={mode}
              baselineValue={""} // TODO: add the right baseline value
            />
          </div> */}

          <div className={getWidthClassName(isSplitMode ?? false)}>
            <SinglePhIdForm
              label="Atlas References"
              value={documentState.references}
              baselineValue={""}
              initialOptions={
                referencesPHIDInitialOption
                  ? [referencesPHIDInitialOption]
                  : undefined
              }
              onSave={(value) => {
                if (value === null) {
                  dispatch(
                    actions.removeReference({
                      id: documentState.references.split(":")[1],
                    }),
                  );
                } else {
                  const newReferenceId = value.split(":")[1];
                  dispatch(actions.addReference({ id: newReferenceId }));
                }
              }}
            />
          </div>
        </div>
      </ContentCard>
    </FormModeProvider>
  );
}
