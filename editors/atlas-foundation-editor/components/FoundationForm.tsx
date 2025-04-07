import { cn, Form, PHIDField } from "@powerhousedao/design-system/scalars";
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
import { isFormReadOnly } from "../../shared/utils/form-common.js";
import { StringDiffField } from "../../shared/components/diff-fields/string-diff-field.js";
import { EnumDiffField } from "../../shared/components/diff-fields/enum-diff-field.js";
import { UrlDiffField } from "../../shared/components/diff-fields/url-diff-field.js";
import { type ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import { useEffect, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";
import { globalTagsEnumOptions } from "../../shared/utils/common-options.js";

interface FoundationFormProps {
  onSubmit: (data: Record<string, any>) => void;
  documentState: Record<string, any>;
  mode: EditorMode;
  parentPHIDInitialOption?: PHIDOption;
  originalContextDataPHIDInitialOption?: PHIDOption;
  referencesPHIDInitialOption?: PHIDOption;
}

export function FoundationForm({
  onSubmit,
  documentState,
  mode,
  parentPHIDInitialOption,
  originalContextDataPHIDInitialOption,
  referencesPHIDInitialOption,
}: FoundationFormProps) {
  const isReadOnly = isFormReadOnly(mode);
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  // baseline document state
  const originalNodeState = getOriginalNotionDocument(
    (documentState.notionId as string) || "notion-id-not-set",
    (documentState.atlasType as ParsedNotionDocumentType) || "article",
  );

  const formRef = useRef<UseFormReturn>(null);

  // keep the form state in sync with the document state
  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset({ ...documentState });
    }
  }, [documentState]);

  return (
    <ContentCard tagText={tagText} variant={cardVariant} className={cn("mt-4")}>
      <Form
        ref={formRef}
        defaultValues={{ ...documentState }}
        onSubmit={onSubmit}
        submitChangesOnly
      >
        {({ triggerSubmit }) => (
          <div className={cn("flex flex-col gap-3")}>
            <div className={cn("flex flex-row gap-2")}>
              <div className={cn("flex-1")}>
                <StringDiffField
                  name="docNo"
                  label="Doc №"
                  placeholder="A."
                  onBlur={triggerSubmit}
                  mode={mode}
                  baselineValue={originalNodeState.docNo}
                />
              </div>
              <div className={cn("flex-1")}>
                <StringDiffField
                  name="name"
                  label="Name"
                  placeholder="Name"
                  onBlur={triggerSubmit}
                  mode={mode}
                  baselineValue={originalNodeState.name}
                />
              </div>
              <div className={cn("flex-1")}>
                <EnumDiffField
                  name="atlasType"
                  label="Type"
                  placeholder="Select Type"
                  options={[
                    {
                      value: "ACTIVE_DATA_CONTROLLER",
                      label: "ACTIVE_DATA_CONTROLLER ",
                    },
                    {
                      value: "ARTICLE",
                      label: "ARTICLE",
                    },
                    { value: "CORE", label: "CORE" },
                    { value: "SECTION", label: "SECTION" },
                  ]}
                  required
                  variant="Select"
                  onChange={triggerSubmit}
                  mode={mode}
                  baselineValue={originalNodeState.type?.toUpperCase()}
                />
              </div>
              <div className={cn("flex-1")}>
                <EnumDiffField
                  name="masterStatus"
                  label="Status"
                  placeholder="Select Status"
                  options={[
                    { value: "APPROVED", label: "APPROVED " },
                    { value: "ARCHIVED", label: "ARCHIVED" },
                    { value: "DEFERRED", label: "DEFERRED" },
                    { value: "PLACEHOLDER", label: "PLACEHOLDER" },
                    { value: "PROVISIONAL", label: "PROVISIONAL" },
                  ]}
                  required
                  variant="Select"
                  onChange={triggerSubmit}
                  mode={mode}
                  baselineValue={originalNodeState.masterStatusNames[0]?.toUpperCase()}
                />
              </div>
            </div>
            <StringDiffField
              name="content"
              label="Content"
              placeholder="Content"
              multiline
              onBlur={triggerSubmit}
              mode={mode}
              baselineValue={""} // TODO: add the right baseline value
            />
            <div className={cn("w-1/2")}>
              <PHIDField
                disabled={isReadOnly}
                name="parent"
                label="Parent Document"
                placeholder="phd:"
                variant="withValueTitleAndDescription"
                allowUris
                initialOptions={
                  parentPHIDInitialOption
                    ? [parentPHIDInitialOption]
                    : undefined
                }
                fetchOptionsCallback={fetchPHIDOptions}
                fetchSelectedOptionCallback={fetchSelectedPHIDOption}
                onBlur={triggerSubmit}
              />
            </div>
            <div className={cn("w-1/2")}>
              <PHIDField
                disabled={isReadOnly}
                name="originalContextData"
                label="Original Context Data"
                placeholder="phd:"
                variant="withValueTitleAndDescription"
                allowUris
                initialOptions={
                  originalContextDataPHIDInitialOption
                    ? [originalContextDataPHIDInitialOption]
                    : undefined
                }
                fetchOptionsCallback={fetchPHIDOptions}
                fetchSelectedOptionCallback={fetchSelectedPHIDOption}
                onBlur={triggerSubmit}
              />
            </div>
            <div className={cn("w-1/2")}>
              <UrlDiffField
                name="provenance"
                label="Provenance"
                placeholder="Provenance"
                platformIcons={{
                  "notion.so": "Globe",
                  "www.notion.so": "Globe",
                }}
                onBlur={triggerSubmit}
                mode={mode}
                baselineValue={""} // TODO: add the right baseline value
              />
            </div>
            <div className={cn("w-1/2")}>
              <EnumDiffField
                name="globalTags"
                label="Tags"
                placeholder="Select Tags"
                options={globalTagsEnumOptions}
                variant="Select"
                multiple
                onChange={triggerSubmit}
                mode={mode}
                baselineValue={""} // TODO: add the right baseline value
              />
            </div>
            <div className={cn("w-1/2")}>
              <PHIDField
                disabled={isReadOnly}
                name="references"
                label="Atlas References"
                placeholder="phd:"
                variant="withValueTitleAndDescription"
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
          </div>
        )}
      </Form>
    </ContentCard>
  );
}
