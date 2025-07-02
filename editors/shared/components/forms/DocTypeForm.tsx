import { Skeleton } from "../ui/skeleton.js";
import { GenericEnumForm } from "./generics/GenericEnumForm.js";
import type { Maybe } from "document-model";
import { type FAtlasType } from "../../../../document-models/atlas-foundation/index.js";
import { type SelectOption } from "@powerhousedao/document-engineering/ui";

interface DocTypeFormProps {
  loading: boolean;
  label?: string;
  value: Maybe<string>;
  baselineValue: Maybe<string>;
  onSave: (value: FAtlasType) => void;
  options?: SelectOption[];
}

const foundationOptions = [
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
  { value: "TYPE_SPECIFICATION", label: "TYPE_SPECIFICATION" },
];

const DocTypeForm = ({
  loading,
  label = "Doc Type",
  value,
  baselineValue,
  onSave,
  options = foundationOptions,
}: DocTypeFormProps) => {
  return loading ? (
    <Skeleton label="Doc Type *" />
  ) : (
    <GenericEnumForm
      label={label}
      placeholder="Doc Type"
      required
      options={options}
      value={value ?? ""}
      baselineValue={baselineValue ?? ""}
      onSave={onSave as (value: string) => void}
      multiple={false}
    />
  );
};

export { DocTypeForm };
