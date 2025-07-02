import { Skeleton } from "../ui/skeleton.js";
import { GenericTextForm } from "./generics/GenericTextForm.js";
import type { Maybe } from "document-model";

interface DocNameFormProps {
  loading: boolean;
  value: Maybe<string>;
  baselineValue: Maybe<string>;
  onSave: (value: string) => void;
  placeholder?: string;
}

const DocNameForm = ({
  loading,
  value,
  baselineValue,
  onSave,
  placeholder = "Name",
}: DocNameFormProps) => {
  return loading ? (
    <Skeleton label="Name" />
  ) : (
    <GenericTextForm
      label="Name"
      placeholder={placeholder}
      value={value ?? ""}
      baselineValue={baselineValue ?? ""}
      onSave={onSave}
    />
  );
};

export { DocNameForm };
