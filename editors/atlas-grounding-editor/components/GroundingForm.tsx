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
import {
  getOriginalNotionDocument,
  pndContentToString,
} from "../../../document-models/utils.js";
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

interface GroundingFormProps {
  onSubmit: (data: Record<string, any>) => void;
  documentState: Record<string, any>;
  mode: EditorMode;
  parentPHIDInitialOption?: PHIDOption;
  originalContextDataPHIDInitialOption?: PHIDOption;
  referencesPHIDInitialOption?: PHIDOption;
  isSplitMode?: boolean;
}

export function GroundingForm({
  onSubmit,
  documentState,
  mode,
  parentPHIDInitialOption,
  originalContextDataPHIDInitialOption,
  referencesPHIDInitialOption,
  isSplitMode,
}: GroundingFormProps) {
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  // baseline node state
  const [originalNodeState] = useState(() =>
    getOriginalNotionDocument(
      (documentState.notionId as string) || "notion-id-not-set",
      (documentState.atlasType as ParsedNotionDocumentType) || "tenet",
    ),
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
        extraFormProps={{
          shouldFocusError: false,
        }}
      >
        {({ triggerSubmit }) => (
          <div className={cn("flex flex-col gap-3")}>
            <div className={cn(getFlexLayoutClassName(isSplitMode ?? false))}>
              <div className={cn("flex-1 truncate")}>
                <StringDiffField
                  name="docNo"
                  label="Doc №"
                  placeholder="A."
                  onBlur={triggerSubmit}
                  mode={mode}
                  baselineValue={originalNodeState.docNo}
                />
              </div>
              <div className={cn("flex-1 truncate")}>
                <StringDiffField
                  name="name"
                  label="Name"
                  placeholder="Name"
                  onBlur={triggerSubmit}
                  mode={mode}
                  baselineValue={originalNodeState.name}
                />
              </div>
            </div>
            <div className={cn(getFlexLayoutClassName(isSplitMode ?? false))}>
              <div className={cn("flex-1")}>
                <EnumDiffField
                  name="atlasType"
                  label="Type"
                  placeholder="Select Type"
                  options={[
                    { value: "ACTIVE_DATA", label: "ACTIVE_DATA " },
                    {
                      value: "ORIGINAL_CONTEXT_DATA",
                      label: "ORIGINAL_CONTEXT_DATA",
                    },
                    { value: "TENET", label: "TENET" },
                  ]}
                  required
                  variant="Select"
                  onBlur={triggerSubmit}
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
                  onBlur={triggerSubmit}
                  mode={mode}
                  baselineValue={originalNodeState.masterStatusNames[0]?.toUpperCase()}
                />
              </div>
            </div>
            <StringDiffField
              name="content"
              placeholder="Content"
              multiline
              onBlur={triggerSubmit}
              mode={mode}
              baselineValue={originalNodeState.content
                .map((c) => pndContentToString(c))
                .join("\n")
                .trim()}
            />
            <div className={cn(getWidthClassName(isSplitMode ?? false))}>
              <PHIDDiffField
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
                mode={mode}
                baselineValue={originalNodeState.parents?.[0]}
              />
            </div>
            <div className={cn(getWidthClassName(isSplitMode ?? false))}>
              <PHIDDiffField
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
                mode={mode}
                baselineValue={""} // TODO: add the right baseline value
              />
            </div>
            <div className={cn(getWidthClassName(isSplitMode ?? false))}>
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
                baselineValue={originalNodeState.hubUrls[0]}
              />
            </div>
            <div className={cn(getWidthClassName(isSplitMode ?? false))}>
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
            </div>
            <div className={cn(getWidthClassName(isSplitMode ?? false))}>
              <PHIDDiffField
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
                mode={mode}
                baselineValue={""} // TODO: add the right baseline value
              />
            </div>
          </div>
        )}
      </Form>
    </ContentCard>
  );
}
