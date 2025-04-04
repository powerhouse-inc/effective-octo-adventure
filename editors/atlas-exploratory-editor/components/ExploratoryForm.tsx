import {
  BooleanField,
  EnumField,
  Form,
  PHIDField,
  StringField,
  UrlField,
} from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import { cb } from "../../shared/utils/utils.js";

interface ExploratoryFormProps {
    onSubmit: (data: Record<string, any>) => void;
    documentState: Record<string, any>;
    mode: "UnifiedEdit" | "UnifiedReadonly" | "SplitReadonly" | "SplitEdit";
}

export function ExploratoryForm({ onSubmit, documentState, mode }: ExploratoryFormProps) {
  const isReadOnly = mode === "UnifiedReadonly";
  const cardVariant = mode === "UnifiedEdit" || mode === "SplitEdit" ? "green" : "gray";
  const tagText = cardVariant === "gray" ? "Official Atlas" : "Atlas Draft";

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
              <div className="flex-0.5">
                <StringField
                  disabled={isReadOnly}
                  name="docNo"
                  label="Doc №"
                  placeholder="A."
                  onBlur={triggerSubmit}
                />
              </div>
              <div className="flex-2">
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
            <BooleanField
              disabled={isReadOnly}
              name="aligned"
              label="Aligned"
              isToggle
              onChange={triggerSubmit}
            />
            <StringField
              disabled={isReadOnly}
              name="findings"
              multiline={true}
              label="Findings"
              placeholder="Findings"
              onBlur={triggerSubmit}
            />
            <StringField
              disabled={isReadOnly}
              name="additionalGuidance"
              multiline={true}
              label="Additional Guidance"
              placeholder="Additional Guidance"
              onBlur={triggerSubmit}
            />
            <UrlField
              disabled={isReadOnly}
              name="provenance"
              label="Provenance"
              placeholder="Provenance"
              onBlur={triggerSubmit}
            />
            <EnumField
              disabled={isReadOnly}
              label="Tags"
              multiple
              name="globalTags"
              onBlur={triggerSubmit}
              options={[
                {
                  label: "RECURSIVE_IMPROVEMENT",
                  value: "RECURSIVE_IMPROVEMENT",
                },
                { label: "SCOPE_ADVISOR", value: "SCOPE_ADVISOR" },
                { label: "DAO_TOOLKIT", value: "DAO_TOOLKIT" },
                { label: "PURPOSE_SYSTEM", value: "PURPOSE_SYSTEM" },
                { label: "ML_LOW_PRIORITY", value: "ML_LOW_PRIORITY" },
                {
                  label: "EXTERNAL_REFERENCE",
                  value: "EXTERNAL_REFERENCE",
                },
                { label: "ML_DEFER", value: "ML_DEFER" },
                { label: "SUBDAO_INCUBATION", value: "SUBDAO_INCUBATION" },
                { label: "V1_MIP", value: "V1_MIP" },
                { label: "ML_HIGH_PRIORITY", value: "ML_HIGH_PRIORITY" },
                {
                  label: "ECOSYSTEM_INTELLIGENCE",
                  value: "ECOSYSTEM_INTELLIGENCE",
                },
                {
                  label: "LEGACY_TERM_USE_APPROVED",
                  value: "LEGACY_TERM_USE_APPROVED",
                },
                { label: "CAIS", value: "CAIS" },
                {
                  label: "INTERNAL_REFERENCE",
                  value: "INTERNAL_REFERENCE",
                },
                { label: "FACILITATORDAO", value: "FACILITATORDAO" },
                { label: "ML_MED_PRIORITY", value: "ML_MED_PRIORITY" },
                { label: "AVC", value: "AVC" },
                {
                  label: "P0_HUB_ENTRY_NEEDED",
                  value: "P0_HUB_ENTRY_NEEDED",
                },
                { label: "ANON_WORKFORCE", value: "ANON_WORKFORCE" },
                { label: "NEWCHAIN", value: "NEWCHAIN" },
                {
                  label: "ML_SUPPORT_DOCS_NEEDED",
                  value: "ML_SUPPORT_DOCS_NEEDED",
                },
                { label: "SUBDAO_REWARDS", value: "SUBDAO_REWARDS" },
                { label: "TWO_STAGE_BRIDGE", value: "TWO_STAGE_BRIDGE" },
              ]}
            />
          </div>
        )}
      </Form>
    </ContentCard>
  );
}
