import { GenericEnumForm } from "./generics/GenericEnumForm.js";
import type { Maybe } from "document-model";
import { globalTagsEnumOptions } from "../../utils/common-options.js";
import { type SelectOption } from "@powerhousedao/design-system/scalars";

interface GlobalTagsFormProps {
  value: Maybe<string[]>;
  baselineValue: Maybe<string[]>;
  onSave: (value: string[]) => void;
  options?: SelectOption[];
}

const GlobalTagsForm = ({
  value,
  baselineValue,
  onSave,
  options = globalTagsEnumOptions,
}: GlobalTagsFormProps) => {
  return (
    <GenericEnumForm
      label="Tags"
      placeholder="Select Tags"
      multiple
      options={options}
      value={value ?? []}
      baselineValue={baselineValue ?? []}
      onSave={onSave}
    />
  );
};

export { GlobalTagsForm };
