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

interface ParentsArrayProps<RefType = { id: string }> {
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  onUpdate: (value: string) => void;
  parents: RefType[];
}

const ParentsArray = ({
  parents,
  onAdd,
  onRemove,
  onUpdate,
}: ParentsArrayProps) => {
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
      fields={parents.map((parent) => ({
        id: parent.id,
        value: `phd:${parent.id}`,
      }))}
      label="Parent Documents"
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
              if (parents.some((parent) => parent.id === phid)) {
                return "Duplicate parent";
              }
            }
            return true;
          },
        ],
      }}
    />
  );
};

export default ParentsArray;
