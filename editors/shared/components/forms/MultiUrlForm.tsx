import { useEffect, useCallback, useMemo, useState } from "react";
import { ArrayField, type ArrayFieldProps } from "../ArrayField.js";
import {
  UrlField,
  type UrlFieldProps,
  type ViewMode,
} from "@powerhousedao/document-engineering/scalars";

type CommonDataProps = {
  id: string;
  value: string;
};

interface MultiUrlFormProps
  extends Omit<
    ArrayFieldProps<string, UrlFieldProps>,
    "fields" | "componentProps" | "component"
  > {
  data: CommonDataProps[];
  viewMode: ViewMode;
  baselineValue: string[];
}

const MultiUrlForm = ({
  label,
  data,
  onAdd,
  onRemove,
  onUpdate,
  viewMode,
  baselineValue,
}: MultiUrlFormProps) => {
  // boolean flag to trigger callback recreation only when needed
  const [renderComponentTrigger, setRenderComponentTrigger] = useState(false);

  // string value of latest data
  const dataSignature = useMemo(
    () =>
      JSON.stringify(
        data.map((item) => ({
          id: item.id,
          value: item.value,
        })),
      ),
    [data],
  );

  // this callback only recreates when renderComponentTrigger changes,
  // not on every data change, but still has access to latest data
  const renderComponent = useCallback(
    (props: UrlFieldProps) => {
      let baseValue = "";

      if (props.name !== "item-new") {
        const fieldId = props.name?.replace("item-", "");
        const fieldIndex = data.findIndex((d) => d.id === fieldId);
        baseValue =
          fieldIndex >= 0 && fieldIndex < baselineValue.length
            ? baselineValue[fieldIndex]
            : "";
      }

      return (
        <UrlField
          {...props}
          viewMode={viewMode}
          diffMode={"sentences"}
          baseValue={baseValue}
          platformIcons={{
            "example.com": "File",
          }}
        />
      );
    },
    [renderComponentTrigger, viewMode, baselineValue],
  );

  // split rendering into two phases: this effect runs after data changes are complete,
  // then triggers a new render cycle by updating the boolean flag
  useEffect(() => {
    setRenderComponentTrigger(!renderComponentTrigger);
  }, [dataSignature]);

  return (
    <ArrayField<string, UrlFieldProps>
      onAdd={onAdd}
      onRemove={onRemove}
      onUpdate={onUpdate}
      fields={data.map((element) => ({
        id: element.id,
        value: element.value,
      }))}
      label={label}
      component={renderComponent}
      componentProps={{
        placeholder: "https://www.example.com",
        validators: [
          (value: string, formState) => {
            if (!value) return true;

            // Check for duplicates in the current form
            const values = Object.values(formState);
            const isDuplicateInForm =
              values.filter((v) => v === value).length > 1;

            if (isDuplicateInForm) {
              return "This value is already being used in the form";
            }

            return true;
          },
        ],
      }}
    />
  );
};

export { MultiUrlForm };
