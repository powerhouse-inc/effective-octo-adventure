import { ArrayField } from "../ArrayField.js";
import {
  PHIDDiffField,
  type PHIDDiffFieldProps,
} from "../diff-fields/phid-diff-field.js";
import { useFormMode } from "../../providers/FormModeProvider.js";
import {
  fetchPHIDOptions,
  fetchSelectedPHIDOption,
} from "../../utils/utils.js";

interface MultiPhIdFormProps<RefType = { id: string }> {
  label: string;
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  onUpdate: (value: string) => void;
  data: RefType[];
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
      onAdd={(value) => {
        onAdd(value);
      }}
      onRemove={({ value }) => {
        onRemove(value);
      }}
      onUpdate={({ value }) => {
        onUpdate(value);
      }}
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
