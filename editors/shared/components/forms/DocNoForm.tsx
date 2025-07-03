import { Skeleton } from "../ui/skeleton.js";
import { GenericTextForm } from "./generics/GenericTextForm.js";
import type { Maybe } from "document-model";

interface DocNoFormProps {
  loading?: boolean;
  value: Maybe<string>;
  baselineValue: Maybe<string>;
  onSave: (value: string) => void;
}

const DocNoForm = ({
  loading,
  value,
  baselineValue,
  onSave,
}: DocNoFormProps) => {
  return loading ? (
    <Skeleton label="Doc №" />
  ) : (
    <GenericTextForm
      label="Doc №"
      placeholder="Doc No"
      value={value ?? ""}
      baselineValue={baselineValue ?? ""}
      onSave={onSave}
    />
  );
};

export { DocNoForm };
