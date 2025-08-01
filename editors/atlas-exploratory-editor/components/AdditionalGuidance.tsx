import { FieldSkeleton } from "../../shared/components/field-skeleton.js";
import { GenericTextForm } from "../../shared/components/forms/generics/GenericTextForm.js";

interface AdditionalGuidanceProps {
  loading?: boolean;
  value: string;
  baselineValue: string;
  onSave: (value: string) => void;
}

function AdditionalGuidance({
  loading,
  value,
  baselineValue,
  onSave,
}: AdditionalGuidanceProps) {
  return loading ? (
    <FieldSkeleton className="h-[76px]" />
  ) : (
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
