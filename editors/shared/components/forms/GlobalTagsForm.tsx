import { type SelectOption } from "@powerhousedao/document-engineering/ui";
import { GenericEnumForm } from "./generics/GenericEnumForm.js";
import type { Maybe } from "document-model";
import globalTags from "../../../../data/global-tags.json" with { type: "json" };
import { useMemo } from "react";

interface RawTag {
  id: string;
  name: string;
  nameAsConstant: string;
}

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
  const options = useMemo(() => {
    return (globalTags as RawTag[]).map(
      (tag) =>
        ({
          label: tag.name,
          value: tag.nameAsConstant,
        }) as SelectOption,
    );
  }, []);

  return (
    <GenericEnumForm
      label="Tags"
      placeholder="Tags"
      multiple
      value={value ?? []}
      options={options}
      baselineValue={baselineValue ?? []}
      onSave={onSave}
    />
  );
};

export { GlobalTagsForm };
