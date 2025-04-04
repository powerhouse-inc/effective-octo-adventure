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

interface MultiParentFormProps {
    onSubmit: (data: Record<string, any>) => void;
    documentState: Record<string, any>;
    mode: EditorMode;
}

export function MultiParentForm({ onSubmit, documentState, mode }: MultiParentFormProps) {

    const isReadOnly = mode === "UnifiedReadonly";
    const cardVariant = getCardVariant(mode);
    const tagText = getTagText(mode);

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
                                <StringField
                                    disabled={isReadOnly}
                                    name="docNo"
                                    label="Doc №"
                                    placeholder="A."
                                    onBlur={triggerSubmit}
                                />
                            </div>
                            <div className="flex-1">
                                <StringField
                                    disabled={isReadOnly}
                                    name="name"
                                    label="Name"
                                    placeholder="Exploratory Document"
                                    onBlur={triggerSubmit}
                                />
                            </div>
                            <div className="flex-1">
                                <EnumField
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
                                />
                            </div>
                            <div className="flex-1">
                                <EnumField
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
                                />
                            </div>
                        </div>
                        <StringField
                            disabled={isReadOnly}
                            name="content"
                            multiline={true}
                            label="Content"
                            placeholder="Content"
                            onBlur={triggerSubmit}
                        />
                        <PHIDField
                            disabled={isReadOnly}
                            name="parent"
                            label="Parent Document"
                            placeholder="PHID"
                            onBlur={triggerSubmit}
                            fetchOptionsCallback={cb}
                            fetchSelectedOptionCallback={(x) => cb(x).then((x) => x[5])}
                            variant="withValueTitleAndDescription"
                            allowUris={true}
                        />
                        <UrlField
                            name="provenance"
                            label="Provenance"
                            placeholder="Provenance"
                            onBlur={triggerSubmit}
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

                        <EnumField
                            label="Tags"
                            onChange={triggerSubmit}
                            multiple
                            name="globalTags"
                            options={[
                                { value: "SCOPE_ADVISOR", label: "SCOPE_ADVISOR" },
                                { value: "AVC", label: "AVC" },
                                { value: "CAIS", label: "CAIS" },
                                { value: "ML_LOW_PRIORITY", label: "ML_LOW_PRIORITY" },
                                { value: "EXTERNAL_REFERENCE", label: "EXTERNAL_REFERENCE" },
                                { value: "DAO_TOOLKIT", label: "DAO_TOOLKIT" },
                                { value: "ML_DEFER", label: "ML_DEFER" },
                                { value: "PURPOSE_SYSTEM", label: "PURPOSE_SYSTEM" },
                                { value: "NEWCHAIN", label: "NEWCHAIN" },
                                { value: "ML_SUPPORT_DOCS_NEEDED", label: "ML_SUPPORT_DOCS_NEEDED" },
                                { value: "TWO_STAGE_BRIDGE", label: "TWO_STAGE_BRIDGE" },
                                { value: "ECOSYSTEM_INTELLIGENCE", label: "ECOSYSTEM_INTELLIGENCE" },
                                { value: "RECURSIVE_IMPROVEMENT", label: "RECURSIVE_IMPROVEMENT" },
                                { value: "LEGACY_TERM_USE_APPROVED", label: "LEGACY_TERM_USE_APPROVED" },
                            ]}
                        />
                    </div>
                )}
            </Form>
        </ContentCard>
    );
}
