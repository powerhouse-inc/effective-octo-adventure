import { GenericPHIDForm } from "./generics/GenericPHIDForm.js";
import type { Maybe } from "document-model";
import type { PHIDOption } from "@powerhousedao/design-system/ui";

interface SinglePhIdFormProps {
  value: Maybe<string>;
  baselineValue: Maybe<string>;
  onSave: (value: string) => void;
  label: string;
  placeholder?: string;
  initialOptions?: PHIDOption[];
}

const SinglePhIdForm = ({
  value,
  baselineValue,
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
      onSave={onSave}
      initialOptions={initialOptions}
    />
  );
};

export { SinglePhIdForm };
