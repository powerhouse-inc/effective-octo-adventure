import {
  Form,
  type SelectOption,
} from "@powerhousedao/document-engineering/scalars";
import { useFormMode } from "../../../providers/FormModeProvider.js";
import { EnumDiffField } from "../../diff-fields/enum-diff-field.js";

type GenericEnumFormProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  options: SelectOption[];
} & (
  | {
      multiple: true;
      onSave: (value: string[]) => void;
      value: string[];
      baselineValue: string[];
    }
  | {
      multiple: false;
      onSave: (value: string) => void;
      value: string;
      baselineValue: string;
    }
);

const GenericEnumForm = ({
  label,
  placeholder,
  options,
  value,
  baselineValue,
  onSave,
  required = false,
  multiple = false,
}: GenericEnumFormProps) => {
  const formMode = useFormMode();
  const onSubmit = (data: { genericEnum: unknown }) => {
    if (data.genericEnum !== undefined && data.genericEnum !== value) {
      onSave(data.genericEnum as string & string[]);
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      submitChangesOnly
      defaultValues={{ genericEnum: value }}
      extraFormProps={{ shouldFocusError: false }}
    >
      {({ triggerSubmit }) => (
        <EnumDiffField
          name="genericEnum"
          label={label}
          placeholder={placeholder}
          variant="Select"
          required={required}
          multiple={multiple}
          onBlur={triggerSubmit}
          mode={formMode}
          baselineValue={baselineValue.toString()}
          options={options}
        />
      )}
    </Form>
  );
};

export { GenericEnumForm };
