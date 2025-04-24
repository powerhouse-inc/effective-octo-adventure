import { ArrayField, type ArrayFieldProps } from "../ArrayField.js";
import {
  PHIDDiffField,
  type PHIDDiffFieldProps,
} from "../diff-fields/phid-diff-field.js";
import { useFormMode } from "../../providers/FormModeProvider.js";
import {
  fetchPHIDOptions,
  fetchSelectedPHIDOption,
} from "../../utils/utils.js";
import type { PHIDOption } from "@powerhousedao/design-system/ui";

type CommonDataProps = {
  id: string;
  initialOptions?: PHIDOption[];
};

interface MultiPhIdFormProps
  extends Omit<
    ArrayFieldProps<string, PHIDDiffFieldProps>,
    "fields" | "componentProps" | "component"
  > {
  data: CommonDataProps[];
}

const MultiPhIdForm = ({
  label,
  data,
  onAdd,
  onRemove,
  onUpdate,
}: MultiPhIdFormProps) => {
  const formMode = useFormMode();

  return (
    <ArrayField<string, PHIDDiffFieldProps>
      onAdd={onAdd}
      onRemove={onRemove}
      onUpdate={onUpdate}
      fields={data.map((element) => ({
        id: element.id,
        value: element.id,
      }))}
      label={label}
      component={(props) => {
        // the new item not have initialOptions
        if (props.name === "item-new") {
          return <PHIDDiffField {...props} />;
        }

        // for existing fields, use the initialOptions of the corresponding element
        const fieldId = props.name?.replace("item-", "");
        const element = data.find((d) => d.id === fieldId);

        return (
          <PHIDDiffField {...props} initialOptions={element?.initialOptions} />
        );
      }}
      componentProps={{
        placeholder: "phd:",
        variant: "withValueAndTitle",
        allowUris: true,
        fetchOptionsCallback: fetchPHIDOptions,
        fetchSelectedOptionCallback: (val) => {
          const result = fetchSelectedPHIDOption(val);
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
        mode: formMode,
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
