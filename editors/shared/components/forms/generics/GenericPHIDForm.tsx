import { Form } from "@powerhousedao/design-system/scalars";
import { useFormMode } from "../../../providers/FormModeProvider.js";
import { PHIDDiffField } from "../../diff-fields/phid-diff-field.js";
import {
  fetchPHIDOptions,
  fetchSelectedPHIDOption,
} from "../../../utils/utils.js";
import type { PHIDOption } from "@powerhousedao/design-system/ui";

interface GenericPHIDFormProps {
  label: string;
  placeholder: string;
  value: string;
  baselineValue: string;
  required?: boolean;
  initialOptions?: PHIDOption[];
  onSave: (value: string) => void;
}

const GenericPHIDForm = ({
  label,
  placeholder = "phd:",
  value,
  baselineValue,
  onSave,
  required = false,
  initialOptions,
}: GenericPHIDFormProps) => {
  const formMode = useFormMode();
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
        <PHIDDiffField
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
            if (
              result !== undefined &&
              (result.value !== value ||
                result.title !== initialOptions?.[0].title)
            ) {
              onSave(result.value);
              return result;
            }
            return initialOptions?.[0];
          }}
          onBlur={triggerSubmit}
          mode={formMode}
          baselineValue={baselineValue}
        />
      )}
    </Form>
  );
};

export { GenericPHIDForm };
