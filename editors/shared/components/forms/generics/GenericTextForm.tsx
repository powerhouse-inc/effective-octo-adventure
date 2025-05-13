import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { useFormMode } from "../../../providers/FormModeProvider.js";
import { StringDiffField } from "../../diff-fields/string-diff-field.js";
import { getViewMode } from "../../../utils/utils.js";
import { useEffect, useRef } from "react";
import type { UseFormReturn, FieldValues } from "react-hook-form";

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
  const viewMode = getViewMode(formMode);
  const formRef = useRef<UseFormReturn<FieldValues>>(null);

  // Reset the form when the value changes to keep the form in sync with the value for split mode
  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset({ genericText: value });
    }
  }, [value]);

  const onSubmit = (data: { genericText: string }) => {
    if (data.genericText !== undefined && data.genericText !== value) {
      onSave(data.genericText);
    }
  };

  return (
    <Form
      ref={formRef}
      onSubmit={onSubmit}
      submitChangesOnly
      defaultValues={{ genericText: value }}
    >
      {({ triggerSubmit }) => (
        <StringField
          name="genericText"
          label={label}
          placeholder={placeholder}
          required={required}
          onBlur={triggerSubmit}
          viewMode={viewMode}
          baseValue={baselineValue}
          multiline={multiline}
          autoExpand={autoExpand}
        />
      )}
    </Form>
  );
};

export { GenericTextForm };
