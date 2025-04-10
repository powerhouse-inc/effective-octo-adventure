import { cn, Form, PHIDField } from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  cb,
  fetchPHIDOptions,
  fetchSelectedPHIDOption,
  getCardVariant,
  getTagText,
} from "../../shared/utils/utils.js";
import type { EditorMode } from "../../shared/types.js";
import { isFormReadOnly } from "../../shared/utils/form-common.js";
import { useEffect } from "react";
import { getOriginalNotionDocument } from "../../../document-models/utils.js";
import { ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import { UseFormReturn } from "react-hook-form";
import { useRef } from "react";
import { StringDiffField } from "../../shared/components/diff-fields/string-diff-field.js";
import { EnumDiffField } from "../../shared/components/diff-fields/enum-diff-field.js";
import { UrlDiffField } from "../../shared/components/diff-fields/url-diff-field.js";
import { globalTagsEnumOptions } from "../../shared/utils/common-options.js";
import { PHIDOption } from "@powerhousedao/design-system/ui";
import { PHIDDiffField } from "../../shared/components/diff-fields/phid-diff-field.js";

interface MultiParentFormProps {
  onSubmit: (data: Record<string, any>) => void;
  documentState: Record<string, any>;
  mode: EditorMode;
  parentPHIDInitialOption?: PHIDOption;
  originalContextDataPHIDInitialOption?: PHIDOption;
  referencesPHIDInitialOption?: PHIDOption;
  isSplitMode?: boolean;
}

export function MultiParentForm({
  onSubmit,
  documentState,
  mode,
  parentPHIDInitialOption,
  originalContextDataPHIDInitialOption,
  referencesPHIDInitialOption,
  isSplitMode,
}: MultiParentFormProps) {
  const isReadOnly = isFormReadOnly(mode);
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);
  // baseline document state
  const originalNodeState = getOriginalNotionDocument(
    (documentState.notionId as string) || "notion-id-not-set",
    (documentState.atlasType as ParsedNotionDocumentType) || "article"
  );

  const formRef = useRef<UseFormReturn>(null);

  // keep the form state in sync with the document state
  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset({ ...documentState });
    }
  }, [documentState]);

  return (
    <ContentCard tagText={tagText} variant={cardVariant} className="mt-4">
      <Form
        onSubmit={onSubmit}
        submitChangesOnly
        defaultValues={{ ...documentState }}
        extraFormProps={{
          shouldFocusError: false,
        }}
      >
        {({ triggerSubmit }) => (
          <div className="flex flex-col gap-4">
            <div
              className={cn(
                "flex flex-row gap-2",
                isSplitMode ? "flex-col" : "flex-row"
              )}
            >
              <div className={cn(isSplitMode ? "w-full" : "w-1/2")}>
                <StringDiffField
                  disabled={isReadOnly}
                  name="docNo"
                  label="Doc №"
                  placeholder="A."
                  onBlur={triggerSubmit}
                  mode={mode}
                  baselineValue={originalNodeState.docNo}
                />
              </div>
              <div className={cn(isSplitMode ? "w-full" : "w-1/2")}>
                <StringDiffField
                  disabled={isReadOnly}
                  name="name"
                  label="Name"
                  placeholder="Exploratory Document"
                  onBlur={triggerSubmit}
                  mode={mode}
                  baselineValue={originalNodeState.name}
                />
              </div>
            </div>
            <div
              className={cn(
                "flex flex-row gap-2",
                isSplitMode ? "flex-col" : "flex-row"
              )}
            >
              <div className={cn(isSplitMode ? "w-full" : "w-1/2")}>
                <EnumDiffField
                  name="atlasType"
                  placeholder="Select Atlas Type"
                  label="Type"
                  options={[
                    { value: "NEEDED_RESEARCH", label: "Needed Research" },
                    { value: "ANNOTATION", label: "Annotation" },
                  ]}
                  required
                  variant="Select"
                  onBlur={triggerSubmit}
                  mode={mode}
                  baselineValue={originalNodeState.type?.toUpperCase()}
                />
              </div>
              <div className={cn(isSplitMode ? "w-full" : "w-1/2")}>
                <EnumDiffField
                  disabled={isReadOnly}
                  label="Status"
                  name="masterStatus"
                  onBlur={triggerSubmit}
                  options={[
                    { value: "PLACEHOLDER", label: "PLACEHOLDER" },
                    { value: "PROVISIONAL", label: "PROVISIONAL" },
                    { value: "APPROVED", label: "APPROVED " },
                    { value: "DEFERRED", label: "DEFERRED" },
                    { value: "ARCHIVED", label: "ARCHIVED" },
                  ]}
                  required
                  variant="Select"
                  mode={mode}
                  baselineValue={originalNodeState.masterStatusNames[0]?.toUpperCase()}
                />
              </div>
            </div>

            <StringDiffField
              disabled={isReadOnly}
              name="content"
              multiline={true}
              placeholder="Content"
              onBlur={triggerSubmit}
              mode={mode}
              // TODO: add the right baseline value
              baselineValue={""}
            />
            <div className={cn(isSplitMode ? "w-full" : "w-1/2")}>
              <PHIDDiffField
                disabled={isReadOnly}
                name="parents"
                label="Parent Document"
                placeholder="PHID"
                onBlur={triggerSubmit}
                fetchOptionsCallback={fetchPHIDOptions}
                fetchSelectedOptionCallback={fetchSelectedPHIDOption}
                variant="withValueAndTitle"
                allowUris={true}
                initialOptions={
                  parentPHIDInitialOption
                    ? [parentPHIDInitialOption]
                    : undefined
                }
                mode={mode}
                baselineValue={""}
              />
            </div>
            <div className={cn(isSplitMode ? "w-full" : "w-1/2")}>
              <UrlDiffField
                name="provenance"
                label="Provenance"
                placeholder="Provenance"
                onBlur={triggerSubmit}
                mode={mode}
                platformIcons={{
                  "notion.so": "Globe",
                  "www.notion.so": "Globe",
                }}
                // TODO: add the right baseline value
                baselineValue={""}
              />
            </div>

            <div className={cn(isSplitMode ? "w-full" : "w-1/2")}>
              <PHIDDiffField
                name="originalContextData"
                fetchOptionsCallback={fetchPHIDOptions}
                fetchSelectedOptionCallback={fetchSelectedPHIDOption}
                label="Original Context Data"
                placeholder="phd:"
                variant="withValueAndTitle"
                allowUris={true}
                onBlur={triggerSubmit}
                initialOptions={
                  originalContextDataPHIDInitialOption
                    ? [originalContextDataPHIDInitialOption]
                    : undefined
                }
                mode={mode}
                baselineValue={""}
              />
            </div>
            <div className={cn(isSplitMode ? "w-full" : "w-1/2")}>
              <PHIDField
                disabled={isReadOnly}
                name="references"
                label="Atlas References"
                placeholder="phd:"
                variant="withValueAndTitle"
                allowUris
                initialOptions={
                  referencesPHIDInitialOption
                    ? [referencesPHIDInitialOption]
                    : undefined
                }
                fetchOptionsCallback={fetchPHIDOptions}
                fetchSelectedOptionCallback={fetchSelectedPHIDOption}
                onBlur={triggerSubmit}
              />
            </div>
            <div className={cn(isSplitMode ? "w-full" : "w-1/2")}>
              <EnumDiffField
                label="Tags"
                onBlur={triggerSubmit}
                multiple
                name="globalTags"
                placeholder="Select Tags"
                options={globalTagsEnumOptions}
                mode={mode}
                // TODO: add the right baseline value
                baselineValue={""}
              />
            </div>
          </div>
        )}
      </Form>
    </ContentCard>
  );
}
