import { GenericEnumForm } from "./generics/GenericEnumForm.js";
import type { Maybe } from "document-model";
import { type FAtlasType } from "../../../../document-models/atlas-foundation/index.js";

interface DocTypeFormProps {
  value: Maybe<string>;
  baselineValue: Maybe<string>;
  onSave: (value: FAtlasType) => void;
}

const DocTypeForm = ({ value, baselineValue, onSave }: DocTypeFormProps) => {
  return (
    <GenericEnumForm
      label="Doc Type"
      placeholder="Doc Type"
      required
      options={[
        {
          value: "ACTIVE_DATA_CONTROLLER",
          label: "ACTIVE_DATA_CONTROLLER ",
        },
        {
          value: "ARTICLE",
          label: "ARTICLE",
        },
        { value: "CORE", label: "CORE" },
        { value: "SECTION", label: "SECTION" },
      ]}
      value={value ?? ""}
      baselineValue={baselineValue ?? ""}
      onSave={onSave as (value: string) => void}
    />
  );
};

export { DocTypeForm };
