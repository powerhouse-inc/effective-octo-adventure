import {
  FormLabel,
  StringField,
  type StringFieldProps,
} from "@powerhousedao/design-system/scalars";
import type { BaseDiffFieldProps } from "../../types.js";
import { FakeInput } from "./fake-input.js";
import { useFormContext } from "react-hook-form";
import { DiffText } from "../diff-text.js";

interface StringDiffFieldProps extends StringFieldProps, BaseDiffFieldProps {}

const StringDiffField = ({
  mode,
  baselineValue = "",
  diffMode = "words",
  ...stringProps
}: StringDiffFieldProps) => {
  const { getValues } = useFormContext();

  if (mode === "Edition" || mode === "Readonly") {
    return <StringField disabled={mode === "Readonly"} {...stringProps} />;
  }

  return (
    <div className="flex flex-col gap-2">
      {stringProps.label && (
        <FormLabel disabled={true} required={stringProps.required}>
          {stringProps.label}
        </FormLabel>
      )}
      <FakeInput>
        <DiffText
          baseline={baselineValue}
          value={getValues(stringProps.name!)}
          mode={mode}
          diffMode={diffMode}
        />
      </FakeInput>
    </div>
  );
};

export { StringDiffField };
