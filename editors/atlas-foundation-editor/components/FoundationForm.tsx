import {
  cn,
  EnumField,
  Form,
  PHIDField,
  StringField,
  UrlField,
} from "@powerhousedao/design-system/scalars";
import ContentCard from "../../shared/components/content-card.js";
import {
  fetchPHIDOptions,
  fetchSelectedPHIDOption,
  getCardVariant,
  getTagText,
} from "../../shared/utils/utils.js";
import { type PHIDOption } from "@powerhousedao/design-system/ui";

interface FoundationFormProps {
  onSubmit: (data: Record<string, any>) => void;
  documentState: Record<string, any>;
  mode: "UnifiedEdit" | "UnifiedReadonly" | "SplitReadonly" | "SplitEdit";
  initialPHIDOption: PHIDOption;
}

export function FoundationForm({
  onSubmit,
  documentState,
  mode,
  initialPHIDOption,
}: FoundationFormProps) {
  const isReadOnly = mode === "UnifiedReadonly";
  const cardVariant = getCardVariant(mode);
  const tagText = getTagText(mode);

  return (
    <ContentCard tagText={tagText} variant={cardVariant} className={cn("mt-4")}>
      <Form
        defaultValues={{ ...documentState }}
        onSubmit={onSubmit}
        submitChangesOnly
      >
        {({ triggerSubmit }) => (
          <div className={cn("flex flex-col gap-3")}>
            <div className={cn("flex flex-row gap-2")}>
              <div className={cn("flex-1")}>
                <StringField
                  disabled={isReadOnly}
                  name="docNo"
                  label="Doc №"
                  placeholder="A."
                  onBlur={triggerSubmit}
                />
              </div>
              <div className={cn("flex-1")}>
                <StringField
                  disabled={isReadOnly}
                  name="name"
                  label="Name"
                  placeholder="Document name"
                  onBlur={triggerSubmit}
                />
              </div>
              <div className={cn("flex-1")}>
                <EnumField
                  disabled={isReadOnly}
                  name="atlasType"
                  label="Type"
                  options={[
                    {
                      value: "ACTIVE_DATA_CONTROLLER",
                      label: "ACTIVE_DATA_CONTROLLER ",
                    },
                    {
                      value: "ARTICLE",
                      label: "ARTICLE",
                    },
                    { value: "CORE", label: "CORE" },
                    { value: "SECTION", label: "SECTION" },
                  ]}
                  required
                  variant="Select"
                  onChange={triggerSubmit}
                />
              </div>
              <div className={cn("flex-1")}>
                <EnumField
                  disabled={isReadOnly}
                  name="masterStatus"
                  label="Status"
                  options={[
                    { value: "APPROVED", label: "APPROVED " },
                    { value: "ARCHIVED", label: "ARCHIVED" },
                    { value: "DEFERRED", label: "DEFERRED" },
                    { value: "PLACEHOLDER", label: "PLACEHOLDER" },
                    { value: "PROVISIONAL", label: "PROVISIONAL" },
                  ]}
                  required
                  variant="Select"
                  onChange={triggerSubmit}
                />
              </div>
            </div>
            <StringField
              disabled={isReadOnly}
              name="content"
              label="Content"
              placeholder="Content"
              onBlur={triggerSubmit}
              multiline
            />
            <div className={cn("w-1/2")}>
              <PHIDField
                disabled={isReadOnly}
                name="parent"
                label="Parent Document"
                placeholder="phd:"
                variant="withValueTitleAndDescription"
                allowUris
                initialOptions={[initialPHIDOption]}
                fetchOptionsCallback={fetchPHIDOptions}
                fetchSelectedOptionCallback={fetchSelectedPHIDOption}
                onBlur={triggerSubmit}
              />
            </div>
            <div className={cn("w-1/2")}>
              <PHIDField
                disabled={isReadOnly}
                name="originalContextData"
                label="Original Context Data"
                placeholder="phd:"
                variant="withValueTitleAndDescription"
                allowUris
                initialOptions={[initialPHIDOption]}
                fetchOptionsCallback={fetchPHIDOptions}
                fetchSelectedOptionCallback={fetchSelectedPHIDOption}
                onBlur={triggerSubmit}
              />
            </div>
            <div className={cn("w-1/2")}>
              <UrlField
                disabled={isReadOnly}
                name="provenance"
                label="Provenance"
                platformIcons={{
                  "notion.so": "Globe",
                  "www.notion.so": "Globe",
                }}
                onBlur={triggerSubmit}
              />
            </div>
            <div className={cn("w-1/2")}>
              <EnumField
                disabled={isReadOnly}
                name="globalTags"
                label="Global Tags"
                options={[
                  { value: "AVC", label: "AVC" },
                  { value: "CAIS", label: "CAIS" },
                  { value: "DAO_TOOLKIT", label: "DAO_TOOLKIT" },
                  {
                    value: "ECOSYSTEM_INTELLIGENCE",
                    label: "ECOSYSTEM_INTELLIGENCE",
                  },
                  {
                    value: "EXTERNAL_REFERENCE",
                    label: "EXTERNAL_REFERENCE",
                  },
                  {
                    value: "LEGACY_TERM_USE_APPROVED",
                    label: "LEGACY_TERM_USE_APPROVED",
                  },
                  { value: "ML_DEFER", label: "ML_DEFER" },
                  {
                    value: "ML_LOW_PRIORITY",
                    label: "ML_LOW_PRIORITY",
                  },
                  {
                    value: "ML_SUPPORT_DOCS_NEEDED",
                    label: "ML_SUPPORT_DOCS_NEEDED",
                  },
                  { value: "NEWCHAIN", label: "NEWCHAIN" },
                  {
                    value: "PURPOSE_SYSTEM",
                    label: "PURPOSE_SYSTEM",
                  },
                  {
                    value: "RECURSIVE_IMPROVEMENT",
                    label: "RECURSIVE_IMPROVEMENT",
                  },
                  { value: "SCOPE_ADVISOR", label: "SCOPE_ADVISOR" },
                  {
                    value: "TWO_STAGE_BRIDGE",
                    label: "TWO_STAGE_BRIDGE",
                  },
                ]}
                variant="Select"
                multiple
                onChange={triggerSubmit}
              />
            </div>
            <div className={cn("w-1/2")}>
              <PHIDField
                disabled={isReadOnly}
                name="references"
                label="Atlas References"
                placeholder="phd:"
                variant="withValueTitleAndDescription"
                allowUris
                initialOptions={[initialPHIDOption]}
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
