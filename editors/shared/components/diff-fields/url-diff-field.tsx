import {
  FormLabel,
  UrlField,
  type UrlFieldProps,
} from "@powerhousedao/design-system/scalars";
import { type BaseDiffFieldProps } from "../../types.js";
import { FakeInput } from "./fake-input.js";
import { DiffText } from "../diff-text.js";
import { useFormContext } from "react-hook-form";

type UrlDiffFieldProps = UrlFieldProps & BaseDiffFieldProps;

const UrlDiffField = ({
  mode,
  baselineValue = "",
  diffMode = "words",
  ...urlProps
}: UrlDiffFieldProps) => {
  const { getValues } = useFormContext();

  if (mode === "Edition" || mode === "Readonly") {
    return <UrlField disabled={mode === "Readonly"} {...urlProps} />;
  }

  return (
    <div className="flex flex-col gap-2">
      {urlProps.label && (
        <FormLabel disabled={true} required={urlProps.required}>
          {urlProps.label}
        </FormLabel>
      )}
      <FakeInput>
        <DiffText
          baseline={baselineValue}
          value={(getValues(urlProps.name!) as string) || ""}
          mode={mode}
          diffMode={diffMode}
        />
      </FakeInput>
    </div>
  );
};

export { UrlDiffField };
