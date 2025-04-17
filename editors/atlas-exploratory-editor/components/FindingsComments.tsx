import { GenericTextForm } from "../../shared/components/forms/generics/GenericTextForm.js";

interface FindingsCommentsProps {
  value: string;
  baselineValue: string;
  onSave: (value: string) => void;
}

function FindingsComments({
  value,
  baselineValue,
  onSave,
}: FindingsCommentsProps) {
  return (
    <GenericTextForm
      label="Findings"
      placeholder="Findings"
      value={value ?? ""}
      baselineValue={baselineValue ?? ""}
      onSave={onSave}
      multiline
    />
  );
}

export { FindingsComments };
