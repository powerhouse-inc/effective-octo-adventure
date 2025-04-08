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
import { globalTagsEnumOptions } from "../../shared/utils/common-options.js";
import { StringDiffField } from "../../shared/components/diff-fields/string-diff-field.js";
import { useEffect, useRef } from "react";
import { UseFormReturn } from "react-hook-form";
import { ParsedNotionDocumentType } from "../../../scripts/apply-changes/atlas-base/NotionTypes.js";
import { EnumDiffField } from "../../shared/components/diff-fields/enum-diff-field.js";
import { UrlDiffField } from "../../shared/components/diff-fields/url-diff-field.js";
import { getOriginalNotionDocument } from "../../../document-models/utils.js";

interface ScopeFormProps {
    onSubmit: (data: Record<string, any>) => void;
    documentState: Record<string, any>;
    mode: EditorMode;
}

export function ScopeForm({ onSubmit, documentState, mode }: ScopeFormProps) {

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
                                    onChange={triggerSubmit}
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
                            <StringDiffField
                                autoExpand rows={4}
                                multiline
                                name="content"
                                onBlur={triggerSubmit}
                                placeholder="Enter content"
                                mode={mode}
                                // TODO: add the right baseline value
                                baselineValue={""} />
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
                                    options={globalTagsEnumOptions}
                                    variant="Select"
                                    multiple
                                    onChange={triggerSubmit}
                                    mode={mode}
                                    // TODO: add the right baseline value
                                    baselineValue={""} // 
                                />
                            </div>
                        </div>
                    </div>
                )}
            </Form>
        </ContentCard>
    );
}
