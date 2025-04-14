import { Form, type SelectOption } from "@powerhousedao/design-system/scalars";
import { useFormMode } from "../../../providers/FormModeProvider.js";
import { StringDiffField } from "../../diff-fields/string-diff-field.js";
import { EnumDiffField } from "../../diff-fields/enum-diff-field.js";

type GenericEnumFormProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  options: SelectOption[];
  value: string;
  baselineValue: string;
  onSave: (value: string) => void;
};

const GenericEnumForm = ({
  label,
  placeholder,
  options,
  value,
  baselineValue,
  onSave,
  required = false,
}: GenericEnumFormProps) => {
  const formMode = useFormMode();
  const onSubmit = (data: { genericEnum: string }) => {
    if (data.genericEnum !== undefined && data.genericEnum !== value) {
      onSave(data.genericEnum);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      submitChangesOnly
      defaultValues={{ genericEnum: value }}
    >
      {({ triggerSubmit }) => (
        <EnumDiffField
          name="genericEnum"
          label={label}
          placeholder={placeholder}
          variant="Select"
          required={required}
          onBlur={triggerSubmit}
          mode={formMode}
          baselineValue={baselineValue}
          options={options}
        />
      )}
    </Form>
  );
};

export { GenericEnumForm };
