import { Form } from "@powerhousedao/design-system/scalars";
import { useFormMode } from "../../providers/FormModeProvider.js";
import { StringDiffField } from "../diff-fields/string-diff-field.js";

interface GenericTextFormProps {
  label: string;
  placeholder: string;
  value: string;
  baselineValue: string;
  required?: boolean;
  onSave: (value: string) => void;
}

const GenericTextForm = ({
  label,
  placeholder,
  value,
  baselineValue,
  onSave,
  required = false,
}: GenericTextFormProps) => {
  const formMode = useFormMode();
  const onSubmit = (data: { genericText: string }) => {
    if (data.genericText !== undefined && data.genericText !== value) {
      console.log("saving", data.genericText);
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
        />
      )}
    </Form>
  );
};

export { GenericTextForm };
