import { GenericPHIDForm } from "./generics/GenericPHIDForm.js";
import type { Maybe } from "document-model";
import type { PHIDOption } from "@powerhousedao/document-engineering/ui";
import type React from "react";

interface SinglePhIdFormProps {
  value: Maybe<string>;
  baselineValue: Maybe<string>;
  baselineIcon?: string | React.ReactElement;
  baselineTitle?: string;
  baselineType?: string;
  baselineDescription?: string;
  onSave: (value: string) => void;
  label: string;
  placeholder?: string;
  initialOptions?: PHIDOption[];
}

const SinglePhIdForm = ({
  value,
  baselineValue,
  baselineIcon,
  baselineTitle,
  baselineType,
  baselineDescription,
  onSave,
  label,
  placeholder = "phd:",
  initialOptions,
}: SinglePhIdFormProps) => {
  return (
    <GenericPHIDForm
      label={label}
      placeholder={placeholder}
      value={value ?? ""}
      baselineValue={baselineValue ?? ""}
      baselineIcon={baselineIcon}
      baselineTitle={baselineTitle}
      baselineType={baselineType}
      baselineDescription={baselineDescription}
      onSave={onSave}
      initialOptions={initialOptions}
    />
  );
};

export { SinglePhIdForm };
