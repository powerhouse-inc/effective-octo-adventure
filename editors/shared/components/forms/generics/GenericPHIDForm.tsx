import { Form, PHIDField } from "@powerhousedao/document-engineering/scalars";
import { useFormMode } from "../../../providers/FormModeProvider.js";
import { fetchSelectedPHIDOption } from "../../../utils/utils.js";
import type { PHIDOption } from "@powerhousedao/document-engineering/ui";
import type React from "react";
import { useEffect } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";
import { useRef } from "react";

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
  fetchOptionsCallback: (value: string) => PHIDOption[];
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
  fetchOptionsCallback,
}: GenericPHIDFormProps) => {
  const viewMode = useFormMode();

  const onSubmit = (data: { phidValue: string }) => {
    if (data.phidValue !== undefined && data.phidValue !== value) {
      onSave(data.phidValue);
    }
  };

  const formRef = useRef<UseFormReturn<FieldValues>>(null);
  useEffect(() => {
    if (formRef.current) {
      formRef.current.reset({ phidValue: value });
    }
  }, [value]);

  return (
    <Form
      onSubmit={onSubmit}
      submitChangesOnly
      defaultValues={{ phidValue: value }}
      ref={formRef}
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
          fetchOptionsCallback={fetchOptionsCallback}
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
          basePreviewIcon={baselineIcon}
          basePreviewTitle={baselineTitle}
          basePreviewPath={baselineType}
          basePreviewDescription={baselineDescription}
        />
      )}
    </Form>
  );
};

export { GenericPHIDForm };
