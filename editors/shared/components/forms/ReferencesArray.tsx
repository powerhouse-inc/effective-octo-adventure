import { useMemo } from "react";
import {
  type FDocumentLink,
  actions,
} from "../../../../document-models/atlas-foundation/index.js";
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

interface ReferencesArrayProps<RefType = { id: string }> {
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  onUpdate: (value: string) => void;
  references: RefType[];
}

// TODO: remove this as reference field is going to be removed
const ReferencesArray = ({
  references,
  onAdd,
  onRemove,
  onUpdate,
}: ReferencesArrayProps) => {
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
      fields={references.map((reference) => ({
        id: reference.id,
        value: `phd:${reference.id}`,
      }))}
      label="Atlas References"
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
              if (references.some((reference) => reference.id === phid)) {
                return "Duplicate reference";
              }
            }
            return true;
          },
        ],
      }}
    />
  );
};

export default ReferencesArray;
