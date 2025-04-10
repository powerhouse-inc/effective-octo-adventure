import {
    BooleanField,
    EnumField,
    Form,
    PHIDField,
    StringField,
    UrlField,
} from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import { fetchPHIDOptions, fetchSelectedPHIDOption, getCardVariant, getTagText } from "../../shared/utils/utils.js";
import type { EditorMode } from "../../shared/types.js";
import { isFormReadOnly } from "../../shared/utils/form-common.js";
import { globalScopeTagsEnumOptions, globalTagsEnumOptions } from "../../shared/utils/common-options.js";
import { StringDiffField } from "../../shared/components/diff-fields/string-diff-field.js";
import { useEffect, useRef, useState } from "react";
import { UseFormReturn } from "react-hook-form";
import { ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import { EnumDiffField } from "../../shared/components/diff-fields/enum-diff-field.js";
import { UrlDiffField } from "../../shared/components/diff-fields/url-diff-field.js";
import { getOriginalNotionDocument } from "../../../document-models/utils.js";
import { MarkdownEditor } from "../../shared/components/markdown-editor.js";

// Custom preview renderer to make links open in new tabs
const previewOptions = {
  components: {
    a: ({ node, ...props }: { node: any; [key: string]: any }) => (
      <a {...props} target="_blank" rel="noopener noreferrer" />
    ),
  },
};

interface ScopeFormProps {
    onSubmit: (data: Record<string, any>) => void;
    documentState: Record<string, any>;
    mode: EditorMode;
}

export function ScopeForm({ onSubmit, documentState, mode }: ScopeFormProps) {
    const [contentValue, setContentValue] = useState<string>(documentState.content || "");

    // Update contentValue when documentState changes
    useEffect(() => {
        setContentValue(documentState.content || "");
    }, [documentState.content]);

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

    return (
        <ContentCard tagText={tagText} variant={cardVariant} className='mt-4'>
            <Form
                onSubmit={onSubmit}
                submitChangesOnly
                defaultValues={{ ...documentState }}
            >
                {({ triggerSubmit }) => (
                    <div className="flex flex-col gap-3">
                        <div className="flex flex-row gap-2">
                            <div className="flex-1">
                                <StringDiffField
                                    name="docNo"
                                    label="Doc №"
                                    placeholder="A."
                                    onBlur={triggerSubmit}
                                    mode={mode}
                                    baselineValue={originalNodeState.docNo || ""} />
                            </div>
                            <div className="flex-1">
                                <StringDiffField
                                    name="name"
                                    label="Scope"
                                    placeholder="The Governance Scope"
                                    onBlur={triggerSubmit}
                                    mode={mode}
                                    baselineValue={originalNodeState.name}
                                />
                            </div>
                            <div className="flex-1">
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
                        <div className="flex-1">
                            <MarkdownEditor
                                value={contentValue}
                                onChange={handleContentChange}
                                onBlur={handleContentBlur}
                                height={350}
                                label="Content"
                                readOnly={isReadOnly}
                            />
                        </div>
                        <div className="flex flex-col gap-4 w-1/2">
                            <div className="flex flex-col gap-2 flex-1">
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
                            <div className="flex flex-col gap-2 flex-1">
                                <PHIDField
                                    disabled={isReadOnly}
                                    fetchOptionsCallback={fetchPHIDOptions}
                                    fetchSelectedOptionCallback={fetchSelectedPHIDOption}
                                    label="Original Context Data"
                                    name="originalContextData"
                                    placeholder="phd:"
                                    variant="withValueTitleAndDescription"
                                    onBlur={triggerSubmit}
                                    allowUris={true}
                                />
                            </div>
                            <div className="flex flex-col gap-2 flex-1">
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
                            </div>
                        </div>
                    </div>
                )}
            </Form>
        </ContentCard>
    );
}
