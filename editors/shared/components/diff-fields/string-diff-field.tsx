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

  const value = (getValues(stringProps.name!) as string) || "";

  return (
    <div className="flex flex-col gap-2">
      {stringProps.label && (
        <FormLabel disabled={true} required={stringProps.required}>
          {stringProps.label}
        </FormLabel>
      )}
      <FakeInput
        multiline={stringProps.multiline || false}
        rows={stringProps.rows || 3}
      >
        <DiffText
          baseline={baselineValue}
          value={value?.toString()}
          mode={mode}
          diffMode={diffMode}
          className={stringProps.multiline ? "leading-5" : undefined}
        />
      </FakeInput>
    </div>
  );
};

export { StringDiffField };
