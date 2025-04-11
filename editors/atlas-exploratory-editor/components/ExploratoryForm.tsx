import {
  BooleanField,
  cn,
  EnumField,
  Form,
  InputBaseProps,
  PHIDField,
  PHIDFieldProps,
} from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  fetchPHIDOptions,
  fetchSelectedPHIDOption,
  getCardVariant,
  getTagText,
} from "../../shared/utils/utils.js";
import type { EditorMode } from "../../shared/types.js";
import { isFormReadOnly } from "../../shared/utils/form-common.js";
import { getOriginalNotionDocument } from "../../../document-models/utils.js";
import type { UseFormReturn } from "react-hook-form";
import { useEffect, useRef, useState } from "react";
import { StringDiffField } from "../../shared/components/diff-fields/string-diff-field.js";
import { EnumDiffField } from "../../shared/components/diff-fields/enum-diff-field.js";
import {
  exploratoryTagsEnumOptions,
  globalTagsEnumOptions,
} from "../../shared/utils/common-options.js";
import { type ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import { UrlDiffField } from "../../shared/components/diff-fields/url-diff-field.js";
import { type PHIDOption } from "@powerhousedao/design-system/ui";
import { ArrayField } from "../../shared/components/ArrayField.js";

interface ExploratoryFormProps {
  onSubmit: (data: Record<string, any>) => void;
  documentState: Record<string, any>;
  mode: EditorMode;
  parentPHIDInitialOption?: PHIDOption;
  originalContextDataPHIDInitialOption?: PHIDOption;
  referencesPHIDInitialOption?: PHIDOption;
  isAligned?: boolean;
  isSplitMode?: boolean;
}

export function ExploratoryForm({
  onSubmit,
  documentState,
  mode,
  parentPHIDInitialOption,
  originalContextDataPHIDInitialOption,
  referencesPHIDInitialOption,
  isAligned,
  isSplitMode,
}: ExploratoryFormProps) {
  const isReadOnly = isFormReadOnly(mode);
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  // baseline node state
  const [originalNodeState] = useState(() =>
    getOriginalNotionDocument(
      (documentState.notionId as string) || "notion-id-not-set",
      (documentState.atlasType as ParsedNotionDocumentType) || "article"
    )
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
      <ArrayField<string, PHIDFieldProps>
        onAdd={(value) => alert(value)}
        onRemove={(value) => alert(value)}
        onUpdate={(value) => alert(value)}
        values={[
          "phd:2ac19da0-6564-4cf3-a668-90ffc8006786",
          "phd:2ac19da0-6564-4cf3-a668-90ffc8006786",
        ]}
        label="Parent Document Testing"
        component={PHIDField}
        componentProps={{
          placeholder: "phd:",
          variant: "withValueTitleAndDescription",
          allowUris: true,
          fetchOptionsCallback: fetchPHIDOptions,
          fetchSelectedOptionCallback: fetchSelectedPHIDOption,
        }}
      />

      <Form
        onSubmit={onSubmit}
        submitChangesOnly
        extraFormProps={{
          shouldFocusError: false,
        }}
        defaultValues={{ ...documentState }}
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
                  disabled={isReadOnly}
                  label="Type"
                  name="atlasType"
                  onBlur={triggerSubmit}
                  options={[
                    { value: "SCENARIO", label: "SCENARIO" },
                    {
                      value: "SCENARIO_VARIATION",
                      label: "SCENARIO_VARIATION",
                    },
                  ]}
                  required
                  variant="Select"
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
              baselineValue={""} // TODO: add the right baseline value
            />
            <div
              className={cn(
                "flex flex-col gap-4",
                isSplitMode ? "w-full" : "w-1/2"
              )}
            >
              <PHIDField
                disabled={isReadOnly}
                name="parent"
                label="Parent Document"
                placeholder="phd:"
                variant="withValueAndTitle"
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
            {/* TODO: Improve this in next iteration */}
            <div className="flex flex-row justify-end items-center gap-2">
              <span
                className={cn(
                  !isAligned ? "text-gray-700" : "text-gray-300",
                  "text-sm font-semibold leading-[22px]"
                )}
              >
                Misaligned
              </span>
              <BooleanField
                disabled={isReadOnly}
                name="findings.isAligned"
                isToggle
                onChange={triggerSubmit}
              />
              <span
                className={cn(
                  isAligned ? "text-gray-700" : "text-gray-300",
                  "text-sm font-semibold font-inter leading-[22px]"
                )}
              >
                Aligned
              </span>
            </div>

            <StringDiffField
              disabled={isReadOnly}
              name="findings.comment"
              multiline={true}
              label="Findings"
              placeholder="Findings"
              onBlur={triggerSubmit}
              mode={mode}
              baselineValue={""} // TODO: add the right baseline value
            />

            <StringDiffField
              disabled={isReadOnly}
              name="additionalGuidance"
              multiline={true}
              label="Additional Guidance"
              placeholder="Additional Guidance"
              onBlur={triggerSubmit}
              mode={mode}
              baselineValue={""} // TODO: add the right baseline value
            />

            <div
              className={cn(
                "flex flex-col gap-4",
                isSplitMode ? "w-full" : "w-1/2"
              )}
            >
              <PHIDField
                disabled={isReadOnly}
                name="originalContextData"
                label="Original Context Data"
                placeholder="phd:"
                variant="withValueAndTitle"
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
              <UrlDiffField
                disabled={isReadOnly}
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
              <EnumDiffField
                disabled={isReadOnly}
                label="Tags"
                multiple
                name="globalTags"
                placeholder="Select Tags"
                options={exploratoryTagsEnumOptions}
                onBlur={triggerSubmit}
                mode={mode}
                baselineValue={""} // TODO: add the right baseline value
              />
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
          </div>
        )}
      </Form>
    </ContentCard>
  );
}
