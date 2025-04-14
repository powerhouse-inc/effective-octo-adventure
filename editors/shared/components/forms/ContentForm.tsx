import { GenericTextForm } from "./generics/GenericTextForm.js";
import type { Maybe } from "document-model";

interface ContentFormProps {
  value: Maybe<string>;
  baselineValue: Maybe<string>;
  onSave: (value: string) => void;
  placeholder?: string;
}

const ContentForm = ({
  value,
  baselineValue,
  onSave,
  placeholder = "Content",
}: ContentFormProps) => {
  return (
    <GenericTextForm
      label="Content"
      placeholder={placeholder}
      value={value ?? ""}
      baselineValue={baselineValue ?? ""}
      onSave={onSave}
      multiline
    />
  );
};

export { ContentForm };
