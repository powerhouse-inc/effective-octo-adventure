import { GenericTextForm } from "./generics/GenericTextForm.js";
import type { Maybe } from "document-model";

interface DocNoFormProps {
  value: Maybe<string>;
  baselineValue: Maybe<string>;
  onSave: (value: string) => void;
}

const DocNoForm = ({ value, baselineValue, onSave }: DocNoFormProps) => {
  return (
    <GenericTextForm
      label="Doc №"
      placeholder="Doc No"
      value={value ?? ""}
      baselineValue="Old doc number"
      onSave={onSave}
    />
  );
};

export { DocNoForm };
