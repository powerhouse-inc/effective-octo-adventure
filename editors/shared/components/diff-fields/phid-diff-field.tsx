import {
  FormLabel,
  PHIDField,
  type PHIDFieldProps,
} from "@powerhousedao/design-system/scalars";
import { type BaseDiffFieldProps } from "../../types.js";
import { FakeInput } from "./fake-input.js";
import { DiffText } from "../diff-text.js";
import { useFormContext } from "react-hook-form";
import { cn } from "@powerhousedao/design-system/scalars";
import { fetchSelectedPHIDOption } from "../../../shared/utils/utils.js";

type PHIDDiffFieldProps = PHIDFieldProps & BaseDiffFieldProps;

const PHIDDiffField = ({
  mode,
  baselineValue = "",
  diffMode = "words",
  ...phidProps
}: PHIDDiffFieldProps) => {
  const { getValues } = useFormContext();
  const currentValue = (getValues(phidProps.name!) as string) || "";

  const originalOption = fetchSelectedPHIDOption(baselineValue);
  const originalPathText =
    typeof originalOption?.path === "object"
      ? originalOption?.path.text
      : originalOption?.path;

  const currentOption = fetchSelectedPHIDOption(currentValue);
  const currentPathText =
    typeof currentOption?.path === "object"
      ? currentOption?.path.text
      : currentOption?.path;

  if (mode === "Edition" || mode === "Readonly") {
    return <PHIDField disabled={mode === "Readonly"} {...phidProps} />;
  }

  return (
    <div className={cn("flex flex-col gap-2")}>
      {phidProps.label && (
        <FormLabel disabled={true} required={phidProps.required}>
          {phidProps.label}
        </FormLabel>
      )}

      {/* container for the entire fake PHID component */}
      <div className={cn("relative w-full")}>
        {/* input absolutely positioned */}
        <div className={cn("absolute top-0 left-0 right-0 z-10 w-full")}>
          <FakeInput>
            <DiffText
              baseline={baselineValue}
              value={currentValue}
              mode={mode}
              diffMode={diffMode}
            />
          </FakeInput>
        </div>

        {/* container for the option info */}
        <div
          className={cn(
            "w-full max-w-full rounded-md px-3 pb-2 pt-3",
            "border border-gray-300",
          )}
        >
          <div className={cn("flex w-full flex-col gap-1 mt-8")}>
            {(phidProps.variant === "withValueAndTitle" ||
              phidProps.variant === "withValueTitleAndDescription") && (
              <div className={cn("flex gap-2 w-full")}>
                {/* icon space */}
                <div className={cn("size-6 shrink-0")} />

                <div
                  className={cn(
                    "flex min-w-0 w-full max-w-full grow flex-col gap-[-2px] overflow-hidden",
                  )}
                >
                  {/* title */}
                  <DiffText
                    baseline={originalOption?.title ?? "Title not available"}
                    value={currentOption?.title ?? "Title not available"}
                    mode={mode}
                    diffMode={diffMode}
                    className={cn(
                      "truncate text-sm leading-5 w-full max-w-full",
                    )}
                  />

                  {/* path */}
                  <DiffText
                    baseline={originalPathText ?? "Type not available"}
                    value={currentPathText ?? "Type not available"}
                    mode={mode}
                    diffMode={diffMode}
                    className={cn(
                      "truncate text-xs leading-5 w-full max-w-full",
                    )}
                  />
                </div>
              </div>
            )}

            {/* description */}
            {phidProps.variant === "withValueTitleAndDescription" && (
              <div className={cn("flex flex-col w-full")}>
                <DiffText
                  baseline={
                    originalOption?.description ?? "Description not available"
                  }
                  value={
                    currentOption?.description ?? "Description not available"
                  }
                  mode={mode}
                  diffMode={diffMode}
                  className={cn(
                    "line-clamp-2 text-xs leading-5 w-full max-w-full",
                  )}
                />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export { PHIDDiffField };
