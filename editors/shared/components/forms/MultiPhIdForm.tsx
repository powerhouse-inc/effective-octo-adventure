import { useEffect, useCallback, useMemo, useState } from "react";
import { ArrayField, type ArrayFieldProps } from "../ArrayField.js";
import { useFormMode } from "../../providers/FormModeProvider.js";
import type { PHIDOption } from "@powerhousedao/document-engineering/ui";
import {
  PHIDField,
  type PHIDFieldProps,
} from "@powerhousedao/document-engineering/scalars";
import type { MDocumentLink } from "document-models/atlas-multi-parent/index.js";

type CommonDataProps = {
  id: string;
  initialOptions?: PHIDOption[];
};

interface MultiPhIdFormProps
  extends Omit<
    ArrayFieldProps<string, PHIDFieldProps>,
    "fields" | "componentProps" | "component"
  > {
  data: CommonDataProps[];
  fetchOptionsCallback: (value: string) => PHIDOption[];
  baselineValue: MDocumentLink[];
}

const MultiPhIdForm = ({
  label,
  data,
  onAdd,
  onRemove,
  onUpdate,
  fetchOptionsCallback,
  baselineValue,
}: MultiPhIdFormProps) => {
  const viewMode = useFormMode();
  // boolean flag to trigger callback recreation only when needed
  const [renderComponentTrigger, setRenderComponentTrigger] = useState(false);

  // string value of latest data
  const dataSignature = useMemo(
    () =>
      JSON.stringify(
        data.map((item) => ({
          id: item.id,
          title: item.initialOptions?.[0]?.title,
          path: item.initialOptions?.[0]?.path,
        })),
      ),
    [data],
  );

  // this callback only recreates when renderComponentTrigger changes,
  // not on every data change, but still has access to latest data
  const renderComponent = useCallback(
    (props: PHIDFieldProps) => {
      // the new item not have initialOptions
      if (props.name === "item-new") {
        return <PHIDField {...props} />;
      }

      // for existing fields, use the initialOptions of the corresponding element
      const fieldId = props.name?.replace("item-", "");
      const element = data.find((d) => d.id === fieldId);

      const baseValue = baselineValue.find(
        (baseItem) => baseItem.id === fieldId,
      );

      return (
        <PHIDField
          {...props}
          initialOptions={element?.initialOptions}
          viewMode={viewMode}
          baseValue={baseValue?.id}
          basePreviewTitle={baseValue?.title ?? undefined}
          basePreviewPath={baseValue?.documentType ?? undefined}
        />
      );
    },
    [renderComponentTrigger, baselineValue],
  );

  // split rendering into two phases: this effect runs after data changes are complete,
  // then triggers a new render cycle by updating the boolean flag
  useEffect(() => {
    setRenderComponentTrigger(!renderComponentTrigger);
  }, [dataSignature]);

  return (
    <ArrayField<string, PHIDFieldProps>
      onAdd={onAdd}
      onRemove={onRemove}
      onUpdate={onUpdate}
      fields={data.map((element) => ({
        id: element.id,
        value: element.id,
      }))}
      label={label}
      component={renderComponent}
      componentProps={{
        placeholder: "phd:",
        variant: "withValueAndTitle",
        allowUris: true,
        fetchOptionsCallback,
        fetchSelectedOptionCallback: (val) => {
          const result = fetchOptionsCallback(val)[0];
          const element = data.find((d) => d.id === val);
          const elementIndex = data.findIndex((d) => d.id === val);

          if (result !== undefined && element !== undefined) {
            if (result.title !== element.initialOptions?.[0]?.title) {
              onUpdate({
                previousValue: element.id,
                value: result.value,
                id: element.id,
                index: elementIndex,
              });
            }
            return result;
          }
          return element?.initialOptions?.[0];
        },
        viewMode: viewMode,
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

export { MultiPhIdForm };
