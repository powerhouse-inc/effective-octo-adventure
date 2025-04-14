import { GenericEnumForm } from "./generics/GenericEnumForm.js";
import type { Maybe } from "document-model";
import { type FStatus } from "../../../../document-models/atlas-foundation/index.js";

interface MasterStatusFormProps {
  value: Maybe<string>;
  baselineValue: Maybe<string>;
  onSave: (value: FStatus) => void;
}

const MasterStatusForm = ({
  value,
  baselineValue,
  onSave,
}: MasterStatusFormProps) => {
  return (
    <GenericEnumForm
      label="Status"
      placeholder="Select Status"
      required
      options={[
        { value: "APPROVED", label: "APPROVED " },
        { value: "ARCHIVED", label: "ARCHIVED" },
        { value: "DEFERRED", label: "DEFERRED" },
        { value: "PLACEHOLDER", label: "PLACEHOLDER" },
        { value: "PROVISIONAL", label: "PROVISIONAL" },
      ]}
      value={value ?? ""}
      baselineValue={baselineValue ?? ""}
      onSave={onSave as (value: string) => void}
      multiple={false}
    />
  );
};

export { MasterStatusForm };
