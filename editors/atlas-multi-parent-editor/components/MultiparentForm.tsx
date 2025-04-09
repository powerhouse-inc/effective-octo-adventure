import {
    BooleanField,
    EnumField,
    Form,
    PHIDField,
    StringField,
    UrlField,
} from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import { cb, fetchPHIDOptions, fetchSelectedPHIDOption, getCardVariant, getTagText } from "../../shared/utils/utils.js";
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

interface MultiParentFormProps {
    onSubmit: (data: Record<string, any>) => void;
    documentState: Record<string, any>;
    mode: EditorMode
    parentPHIDInitialOption?: PHIDOption;
    originalContextDataPHIDInitialOption?: PHIDOption;
    referencesPHIDInitialOption?: PHIDOption;
}

export function MultiParentForm({
    onSubmit, documentState, mode,
    parentPHIDInitialOption,
    originalContextDataPHIDInitialOption,
    referencesPHIDInitialOption
}: MultiParentFormProps) {

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
                                    disabled={isReadOnly}
                                    name="docNo"
                                    label="Doc №"
                                    placeholder="A."
                                    onBlur={triggerSubmit}
                                    mode={mode}
                                    baselineValue={originalNodeState.docNo}
                                />
                            </div>
                            <div className="flex-1">
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
                            <div className="flex-1">
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
                            <div className="flex-1">
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
                            label="Content"
                            placeholder="Content"
                            onBlur={triggerSubmit}
                            mode={mode}
                            // TODO: add the right baseline value
                            baselineValue={""}

                        />
                        <div className="w-1/2">


                            <PHIDField
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
                            />
                        </div>
                        <div className="w-1/2">
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

                        <div className="w-1/2">
                            <PHIDField
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
                            />
                        </div>
                        <div className="w-1/2">
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
                        <div className="w-1/2">
                            <EnumDiffField
                                label="Tags"
                                onBlur={triggerSubmit}
                                multiple
                                name="globalTags"
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
