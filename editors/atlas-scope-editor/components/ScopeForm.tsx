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

interface ScopeFormProps {
    onSubmit: (data: Record<string, any>) => void;
    documentState: Record<string, any>;
    mode: "UnifiedEdit" | "UnifiedReadonly" | "SplitReadonly" | "SplitEdit";
}

export function ScopeForm({ onSubmit, documentState, mode }: ScopeFormProps) {

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
                                <StringField name="docNo" label="Doc №" placeholder="A." onBlur={triggerSubmit} />
                            </div>
                            <div className="flex-1">
                                <StringField name="name" label="Scope" placeholder="The Governance Scope" onBlur={triggerSubmit} />
                            </div>
                            <div className="flex-1">
                                <EnumField label="Status" name="masterStatus" onChange={triggerSubmit} options={[
                                    { value: "PLACEHOLDER", label: "PLACEHOLDER" },
                                    { value: "PROVISIONAL", label: "PROVISIONAL" },
                                    { value: "APPROVED", label: "APPROVED " },
                                    { value: "DEFERRED", label: "DEFERRED" },
                                    { value: "ARCHIVED", label: "ARCHIVED" },
                                ]}
                                    disabled={isReadOnly}
                                    required
                                    variant="Select"
                                />
                            </div>

                        </div>
                        <div className="flex-1">
                            <StringField autoExpand rows={4} multiline name="content" onBlur={triggerSubmit} placeholder="Enter content" />
                        </div>
                        <div className="flex flex-col gap-4 w-1/2">
                            <div className="flex flex-col gap-2 flex-1">
                                <UrlField
                                    name="provenance"
                                    onBlur={triggerSubmit}
                                    label="Provenance"
                                    disabled={isReadOnly}
                                    placeholder="Enter provenance" />
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
                                <EnumField
                                    disabled={isReadOnly}
                                    label="Tags"
                                    multiple
                                    name="newTags"
                                    onChange={triggerSubmit}
                                    options={[
                                        {
                                            label: "RECURSIVE_IMPROVEMENT",
                                            value: "RECURSIVE_IMPROVEMENT",
                                        },
                                        { label: "SCOPE_ADVISOR", value: "SCOPE_ADVISOR" },
                                        { label: "DAO_TOOLKIT", value: "DAO_TOOLKIT" },
                                        { label: "PURPOSE_SYSTEM", value: "PURPOSE_SYSTEM" },
                                        { label: "ML_LOW_PRIORITY", value: "ML_LOW_PRIORITY" },
                                        { label: "EXTERNAL_REFERENCE", value: "EXTERNAL_REFERENCE" },
                                        { label: "ML_DEFER", value: "ML_DEFER" },
                                        { label: "SUBDAO_INCUBATION", value: "SUBDAO_INCUBATION" },
                                        { label: "V1_MIP", value: "V1_MIP" },
                                        { label: "ML_HIGH_PRIORITY", value: "ML_HIGH_PRIORITY" },
                                        { label: "ECOSYSTEM_INTELLIGENCE", value: "ECOSYSTEM_INTELLIGENCE" },
                                        { label: "LEGACY_TERM_USE_APPROVED", value: "LEGACY_TERM_USE_APPROVED" },
                                        { label: "CAIS", value: "CAIS" },
                                        { label: "INTERNAL_REFERENCE", value: "INTERNAL_REFERENCE" },
                                        { label: "FACILITATORDAO", value: "FACILITATORDAO" },
                                        { label: "ML_MED_PRIORITY", value: "ML_MED_PRIORITY" },
                                        { label: "AVC", value: "AVC" },
                                        { label: "P0_HUB_ENTRY_NEEDED", value: "P0_HUB_ENTRY_NEEDED" },
                                        { label: "ANON_WORKFORCE", value: "ANON_WORKFORCE" },
                                        { label: "NEWCHAIN", value: "NEWCHAIN" },
                                        { label: "ML_SUPPORT_DOCS_NEEDED", value: "ML_SUPPORT_DOCS_NEEDED" },
                                        { label: "SUBDAO_REWARDS", value: "SUBDAO_REWARDS" },
                                        { label: "TWO_STAGE_BRIDGE", value: "TWO_STAGE_BRIDGE" },
                                    ]}
                                />
                            </div>
                        </div>
                    </div>
                )}
            </Form>
        </ContentCard>
    );
}
