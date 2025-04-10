import { cn, Form } from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  fetchPHIDOptions,
  fetchSelectedPHIDOption,
  getCardVariant,
  getTagText,
} from "../../shared/utils/utils.js";
import type { EditorMode } from "../../shared/types.js";
import { isFormReadOnly } from "../../shared/utils/form-common.js";
import {
  globalScopeTagsEnumOptions,
  globalTagsEnumOptions,
} from "../../shared/utils/common-options.js";
import { StringDiffField } from "../../shared/components/diff-fields/string-diff-field.js";
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import { EnumDiffField } from "../../shared/components/diff-fields/enum-diff-field.js";
import { UrlDiffField } from "../../shared/components/diff-fields/url-diff-field.js";
import { getOriginalNotionDocument } from "../../../document-models/utils.js";
import { PHIDDiffField } from "../../shared/components/diff-fields/phid-diff-field.js";
import {
  getFlexLayoutClassName,
  getWidthClassName,
} from "../../shared/utils/styles.js";
import { PositionedWrapper } from "../../shared/components/PositionedWrapper.js";
import { MarkdownEditor } from "../../shared/components/markdown-editor.js";

interface ScopeFormProps {
  onSubmit: (data: Record<string, any>) => void;
  documentState: Record<string, any>;
  mode: EditorMode;
  isSplitMode?: boolean;
}

export function ScopeForm({
  onSubmit,
  documentState,
  mode,
  isSplitMode,
}: ScopeFormProps) {
  const isReadOnly = isFormReadOnly(mode);
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  const [contentValue, setContentValue] = useState<string>(
    documentState.content || ""
  );

  // Update contentValue when documentState changes
  useEffect(() => {
    setContentValue(documentState.content || "");
  }, [documentState.content]);

  // Custom handler for content changes
  const handleContentChange = (value: string) => {
    setContentValue(value);
  };

  // Custom handler for content blur
  const handleContentBlur = () => {
    // Only submit if the content has actually changed
    if (contentValue !== documentState.content) {
      onSubmit({ content: contentValue });
    }
  };

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
            <div className={cn(getFlexLayoutClassName(isSplitMode ?? false))}>
              <div className="flex-1">
                <StringDiffField
                  name="docNo"
                  label="Doc №"
                  placeholder="A."
                  onBlur={triggerSubmit}
                  mode={mode}
                  baselineValue={originalNodeState.docNo || ""}
                />
              </div>
              <div className="flex-1 min-w-[200px]">
                <StringDiffField
                  name="name"
                  label="Scope"
                  placeholder="The Governance Scope"
                  onBlur={triggerSubmit}
                  mode={mode}
                  baselineValue={originalNodeState.name}
                />
              </div>
            </div>
            <div className={cn(getFlexLayoutClassName(isSplitMode ?? false))}>
              <div className={cn(getWidthClassName(isSplitMode ?? false))}>
                <EnumDiffField
                  label="Status"
                  name="masterStatus"
                  onBlur={triggerSubmit}
                  mode={mode}
                  options={[
                    { value: "PLACEHOLDER", label: "PLACEHOLDER" },
                    { value: "PROVISIONAL", label: "PROVISIONAL" },
                    { value: "APPROVED", label: "APPROVED " },
                    { value: "DEFERRED", label: "DEFERRED" },
                    { value: "ARCHIVED", label: "ARCHIVED" },
                  ]}
                  disabled={isReadOnly}
                  required
                  variant="Select"
                  baselineValue={originalNodeState.masterStatusNames[0]?.toUpperCase()}
                />
              </div>
            </div>

            <MarkdownEditor
              value={contentValue}
              onChange={handleContentChange}
              onBlur={handleContentBlur}
              height={350}
              label="Content"
            />
            {/* </div> */}
            <div className={cn("flex flex-col gap-4")}>
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
                  // TODO: add the right baseline value
                  baselineValue={""}
                />
              </div>
              <div className={cn(getWidthClassName(isSplitMode ?? false))}>
                <PHIDDiffField
                  disabled={isReadOnly}
                  fetchOptionsCallback={fetchPHIDOptions}
                  fetchSelectedOptionCallback={fetchSelectedPHIDOption}
                  label="Original Context Data"
                  name="originalContextData"
                  placeholder="phd:"
                  variant="withValueAndTitle"
                  onBlur={triggerSubmit}
                  allowUris={true}
                  mode={mode}
                  // TODO: add the right baseline value
                  baselineValue={""}
                />
              </div>
              <PositionedWrapper isSplitMode={isSplitMode}>
                <EnumDiffField
                  name="globalTags"
                  label="Tags"
                  placeholder="Select Tags"
                  options={globalScopeTagsEnumOptions}
                  variant="Select"
                  multiple
                  onBlur={triggerSubmit}
                  mode={mode}
                  // TODO: add the right baseline value
                  baselineValue={""}
                />
              </PositionedWrapper>
            </div>
          </div>
        )}
      </Form>
    </ContentCard>
  );
}
