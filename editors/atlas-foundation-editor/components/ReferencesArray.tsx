import { useMemo } from "react";
import {
  type FDocumentLink,
  actions,
} from "../../../document-models/atlas-foundation/index.js";
import { ArrayField } from "../../shared/components/ArrayField.js";
import {
  PHIDDiffField,
  type PHIDDiffFieldProps,
} from "../../shared/components/diff-fields/phid-diff-field.js";
import { useFormMode } from "../../shared/providers/FormModeProvider.js";
import {
  fetchPHIDOptions,
  fetchSelectedPHIDOption,
} from "../../shared/utils/utils.js";
import { type IProps } from "../editor.js";

interface ReferencesArrayProps extends Pick<IProps, "dispatch"> {
  references: FDocumentLink[];
}

const ReferencesArray = ({ references, dispatch }: ReferencesArrayProps) => {
  const formMode = useFormMode();

  return (
    <ArrayField<string, PHIDDiffFieldProps>
      onAdd={(value) => {
        const phid = value.split(":")[1];
        dispatch(actions.addReference({ id: phid }));
      }}
      onRemove={({ value }) => {
        const phid = value.split(":")[1];
        dispatch(actions.removeReference({ id: phid }));
      }}
      onUpdate={() => {
        // TODO: implement references updates
        throw new Error("Updates not supported yet");
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
