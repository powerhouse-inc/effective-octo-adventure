import {
  EnumField,
  FormLabel,
  type EnumFieldProps,
} from "@powerhousedao/document-engineering/scalars";
import { type BaseDiffFieldProps } from "../../types.js";
import { FakeInput } from "./fake-input.js";
import { DiffText } from "../diff-text.js";
import { useFormContext } from "react-hook-form";

type EnumDiffFieldProps = EnumFieldProps & BaseDiffFieldProps;

const EnumDiffField = ({
  mode,
  baselineValue = "",
  diffMode = "words",
  ...enumProps
}: EnumDiffFieldProps) => {
  const { getValues } = useFormContext();

  if (mode === "Edition" || mode === "Readonly") {
    return <EnumField disabled={mode === "Readonly"} {...enumProps} />;
  }

  const value = getValues(enumProps.name!) as string;

  return (
    <div className="flex flex-col gap-2">
      {enumProps.label && (
        <FormLabel disabled={true} required={enumProps.required}>
          {enumProps.label}
        </FormLabel>
      )}
      <FakeInput>
        <DiffText
          baseline={baselineValue}
          value={value.toString()}
          mode={mode}
          diffMode={diffMode}
        />
      </FakeInput>
    </div>
  );
};

export { EnumDiffField };
