import {
  FormLabel,
  UrlField,
  type UrlFieldProps,
} from "@powerhousedao/document-engineering/scalars";
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
  const { getValues, watch } = useFormContext();
  const value = watch(urlProps.name!) as string;

  if (mode === "edition") {
    return <UrlField {...urlProps} />;
  }

  return (
    <div className="flex flex-col gap-2">
      {urlProps.label && (
        <FormLabel disabled={true} required={urlProps.required}>
          {urlProps.label}
        </FormLabel>
      )}
      <FakeInput>
        <a
          href={value}
          target="_blank"
          rel="noopener noreferrer"
          className="[&_span]:text-blue-600!"
        >
          <DiffText
            baseline={baselineValue}
            value={value}
            mode={mode}
            diffMode={diffMode}
          />
        </a>
      </FakeInput>
    </div>
  );
};

export { UrlDiffField };
