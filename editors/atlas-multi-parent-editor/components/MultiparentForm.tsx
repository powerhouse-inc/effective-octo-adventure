import {
    BooleanField,
    EnumField,
    Form,
    PHIDField,
    StringField,
    UrlField,
} from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import { cb, getCardVariant, getTagText } from "../../shared/utils/utils.js";
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

interface MultiParentFormProps {
    onSubmit: (data: Record<string, any>) => void;
    documentState: Record<string, any>;
    mode: EditorMode;
}

export function MultiParentForm({ onSubmit, documentState, mode }: MultiParentFormProps) {

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
                                    onChange={triggerSubmit}
                                    mode={mode}
                                    baselineValue={originalNodeState.type?.toUpperCase()}
                                />
                            </div>
                            <div className="flex-1">
                                <EnumDiffField
                                    disabled={isReadOnly}
                                    label="Status"
                                    name="masterStatus"
                                    onChange={triggerSubmit}
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
                        <PHIDField
                            disabled={isReadOnly}
                            name="parents"
                            label="Parent Document"
                            placeholder="PHID"
                            onBlur={triggerSubmit}
                            fetchOptionsCallback={cb}
                            fetchSelectedOptionCallback={(x) => cb(x).then((x) => x[5])}
                            variant="withValueTitleAndDescription"
                            allowUris={true}
                        />
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

                        <PHIDField
                            name="originalContextData"
                            fetchOptionsCallback={cb}
                            fetchSelectedOptionCallback={(x) => cb(x).then((x) => x[5])}
                            label="Original Context Data"
                            placeholder="phd:"
                            variant="withValueTitleAndDescription"
                            allowUris={true}
                            onBlur={triggerSubmit}
                        />

                        <EnumDiffField
                            label="Tags"
                            onChange={triggerSubmit}
                            multiple
                            name="globalTags"
                            options={globalTagsEnumOptions}
                            mode={mode}
                            // TODO: add the right baseline value
                            baselineValue={""}
                        />
                    </div>
                )}
            </Form>
        </ContentCard>
    );
}
