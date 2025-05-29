import { GenericEnumForm } from "./generics/GenericEnumForm.js";
import type { Maybe } from "document-model";

interface GlobalTagsFormProps {
  value: Maybe<string[]>;
  baselineValue: Maybe<string[]>;
  onSave: (value: string[]) => void;
}

const GlobalTagsForm = ({
  value,
  baselineValue,
  onSave,
}: GlobalTagsFormProps) => {
  return (
    <GenericEnumForm
      label="Tags"
      placeholder="Tags"
      multiple
      value={value ?? []}
      baselineValue={baselineValue ?? []}
      onSave={onSave}
    />
  );
};

export { GlobalTagsForm };
