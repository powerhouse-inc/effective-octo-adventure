import { Form, EnumField } from "@powerhousedao/document-engineering/scalars";
import { type SelectOption } from "@powerhousedao/document-engineering/ui";
import { useFormMode } from "../../../providers/FormModeProvider.js";
import { useEffect, useMemo } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { useRef } from "react";

type GenericEnumFormProps = {
  label: string;
  placeholder: string;
  required?: boolean;
  options?: SelectOption[];
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
  value,
  options,
  baselineValue,
  onSave,
  required = false,
  multiple = false,
}: GenericEnumFormProps) => {
  const viewMode = useFormMode();
  const onSubmit = (data: { genericEnum: unknown }) => {
    if (data.genericEnum !== undefined && data.genericEnum !== value) {
      onSave(data.genericEnum as string & string[]);
    }
  };

  const formRef = useRef<UseFormReturn<FieldValues>>(null);

  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset({ genericEnum: value });
    }
  }, [value]);

  return (
    <Form
      onSubmit={onSubmit}
      submitChangesOnly
      defaultValues={{ genericEnum: value }}
      extraFormProps={{ shouldFocusError: false }}
      ref={formRef}
    >
      {({ triggerSubmit }) => (
        <EnumField
          name="genericEnum"
          label={label}
          placeholder={placeholder}
          variant="Select"
          required={required}
          multiple={multiple}
          onBlur={triggerSubmit}
          viewMode={viewMode}
          baseValue={
            Array.isArray(baselineValue)
              ? baselineValue.join(", ")
              : baselineValue
          }
          options={options}
        />
      )}
    </Form>
  );
};

export { GenericEnumForm };
