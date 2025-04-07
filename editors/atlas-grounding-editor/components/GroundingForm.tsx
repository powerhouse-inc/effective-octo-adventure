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
import type { EditorMode } from "../../shared/types.js";
import { isFormReadOnly } from "../../shared/utils/form-common.js";
import { globalTagsEnumOptions } from "../../shared/utils/common-options.js";

interface GroundingFormProps {
  onSubmit: (data: Record<string, any>) => void;
  documentState: Record<string, any>;
  mode: EditorMode;
  initialPHIDOption: PHIDOption;
}

export function GroundingForm({
  onSubmit,
  documentState,
  mode,
  initialPHIDOption,
}: GroundingFormProps) {
  const isReadOnly = isFormReadOnly(mode);
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
                    { value: "ACTIVE_DATA", label: "ACTIVE_DATA " },
                    {
                      value: "ORIGINAL_CONTEXT_DATA",
                      label: "ORIGINAL_CONTEXT_DATA",
                    },
                    { value: "TENET", label: "TENET" },
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
                options={globalTagsEnumOptions}
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
