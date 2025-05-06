import { Form, PHIDField } from "@powerhousedao/design-system/scalars";
import { useFormMode } from "../../../providers/FormModeProvider.js";
import {
  fetchPHIDOptions,
  fetchSelectedPHIDOption,
  getViewMode,
} from "../../../utils/utils.js";
import type { PHIDOption } from "@powerhousedao/design-system/ui";
import type React from "react";

interface GenericPHIDFormProps {
  label: string;
  placeholder: string;
  value: string;
  baselineValue: string;
  baselineIcon?: string | React.ReactElement;
  baselineTitle?: string;
  baselineType?: string;
  baselineDescription?: string;
  required?: boolean;
  initialOptions?: PHIDOption[];
  onSave: (value: string) => void;
}

const GenericPHIDForm = ({
  label,
  placeholder = "phd:",
  value,
  baselineValue,
  baselineIcon,
  baselineTitle,
  baselineType,
  baselineDescription,
  onSave,
  required = false,
  initialOptions,
}: GenericPHIDFormProps) => {
  const formMode = useFormMode();
  const viewMode = getViewMode(formMode);

  const onSubmit = (data: { phidValue: string }) => {
    if (data.phidValue !== undefined && data.phidValue !== value) {
      onSave(data.phidValue);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      submitChangesOnly
      defaultValues={{ phidValue: value }}
    >
      {({ triggerSubmit }) => (
        <PHIDField
          name="phidValue"
          label={label}
          required={required}
          placeholder={placeholder}
          variant="withValueAndTitle"
          allowUris
          initialOptions={initialOptions}
          fetchOptionsCallback={fetchPHIDOptions}
          fetchSelectedOptionCallback={(val) => {
            const result = fetchSelectedPHIDOption(val);
            if (result !== undefined) {
              if (result.title !== initialOptions?.[0].title) {
                onSave(result.value);
              }
              return result;
            }
            return initialOptions?.[0];
          }}
          onBlur={triggerSubmit}
          viewMode={viewMode}
          diffMode="sentences"
          baseValue={baselineValue}
          // basePreviewIcon={baselineIcon} // TODO: add basePreviewIcon to PHIDInput
          basePreviewTitle={baselineTitle}
          basePreviewPath={baselineType}
          basePreviewDescription={baselineDescription}
        />
      )}
    </Form>
  );
};

export { GenericPHIDForm };
