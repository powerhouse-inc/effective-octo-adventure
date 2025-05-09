import { Form } from "@powerhousedao/design-system/scalars";
import { useFormMode } from "../../../providers/FormModeProvider.js";
import { StringDiffField } from "../../diff-fields/string-diff-field.js";

interface GenericTextFormProps {
  label?: string;
  placeholder: string;
  value: string;
  baselineValue: string;
  required?: boolean;
  multiline?: boolean;
  autoExpand?: boolean;
  onSave: (value: string) => void;
}

const GenericTextForm = ({
  label,
  placeholder,
  value,
  baselineValue,
  onSave,
  required = false,
  multiline = false,
  autoExpand = false,
}: GenericTextFormProps) => {
  const formMode = useFormMode();
  const onSubmit = (data: { genericText: string }) => {
    if (data.genericText !== undefined && data.genericText !== value) {
      onSave(data.genericText);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      submitChangesOnly
      defaultValues={{ genericText: value }}
    >
      {({ triggerSubmit }) => (
        <StringDiffField
          name="genericText"
          label={label}
          placeholder={placeholder}
          required={required}
          onBlur={triggerSubmit}
          mode={formMode}
          baselineValue={baselineValue}
          multiline={multiline}
          autoExpand={autoExpand}
        />
      )}
    </Form>
  );
};

export { GenericTextForm };
