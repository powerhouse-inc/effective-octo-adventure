import { GenericEnumForm } from "./generics/GenericEnumForm.js";
import type { Maybe } from "document-model";
import { type FStatus } from "../../../../document-models/atlas-foundation/index.js";
import { globalTagsEnumOptions } from "../../utils/common-options.js";

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
      placeholder="Select Tags"
      multiple
      options={globalTagsEnumOptions}
      value={value ?? []}
      baselineValue={baselineValue ?? []}
      onSave={onSave}
    />
  );
};

export { GlobalTagsForm };
