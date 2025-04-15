import { GenericTextForm } from "../../shared/components/forms/generics/GenericTextForm.js";

interface AdditionalGuidanceProps {
  value: string;
  baselineValue: string;
  onSave: (value: string) => void;
}

function AdditionalGuidance({
  value,
  baselineValue,
  onSave,
}: AdditionalGuidanceProps) {
  return (
    <GenericTextForm
      label="Additional Guidance"
      placeholder="Additional Guidance"
      value={value ?? ""}
      baselineValue={baselineValue ?? ""}
      onSave={onSave}
      multiline
    />
  );
}

export { AdditionalGuidance };
