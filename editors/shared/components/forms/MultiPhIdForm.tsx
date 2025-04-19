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

type CommonDataProps = {
  id: string;
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
      component={PHIDDiffField}
      componentProps={{
        placeholder: "phd:",
        variant: "withValueAndTitle",
        allowUris: true,
        fetchOptionsCallback: fetchPHIDOptions,
        fetchSelectedOptionCallback: fetchSelectedPHIDOption,
        mode: formMode,
        validators: [
          (value: string, formState) => {
            if (!value) {
              return true;
            }
            const itemNew = formState["item-new"] as string;
            if (itemNew === value) {
              // it is the new or the duplicated
              const phid = itemNew.startsWith("phd:")
                ? itemNew.split(":")[1]
                : itemNew;
              if (data.some((element) => element.id === phid)) {
                return "Duplicate context data";
              }
            }
            return true;
          },
        ],
      }}
    />
  );
};

export { MultiPhIdForm };
