import { GenericTextForm } from "./generics/GenericTextForm.js";
import type { Maybe } from "document-model";

interface DocNameFormProps {
  value: Maybe<string>;
  baselineValue: Maybe<string>;
  onSave: (value: string) => void;
  placeholder?: string;
}

const DocNameForm = ({
  value,
  baselineValue,
  onSave,
  placeholder = "Name",
}: DocNameFormProps) => {
  return (
    <GenericTextForm
      label="Name"
      placeholder={placeholder}
      value={value ?? ""}
      baselineValue={"Old title to compare"}
      onSave={onSave}
    />
  );
};

export { DocNameForm };
