import { EnumField, Form } from "@powerhousedao/design-system/scalars";
import { type SetMasterStatusInput } from "document-models/atlas-scope/index.js";
import { useCallback } from "react";

type Props = {
  readonly defaultValue: SetMasterStatusInput;
  readonly dispatch: (input: SetMasterStatusInput) => void;
  readonly isEditing: boolean;
};

export function SetMasterStatusForm(props: Props) {
  const onSubmit = useCallback(
    (data: SetMasterStatusInput) => {
      if (Object.keys(data).length === 0) return;

    
      // Check if new masterStatus are equal to previous ones
      const masterStatusEqual = JSON.stringify(data.masterStatus) === JSON.stringify(props.defaultValue.masterStatus);
      if (masterStatusEqual) return;
      props.dispatch(data);
    },
    [props.dispatch],
  );

  return (
    <Form onSubmit={onSubmit} submitChangesOnly>
           {({ triggerSubmit }) =>(
        <EnumField
        
          disabled={!props.isEditing} 
          defaultValue={props.defaultValue.masterStatus}
          label="Status"
          name="masterStatus"
          onBlur={triggerSubmit}
          options={[
            { value: "PLACEHOLDER", label: "PLACEHOLDER" },
            { value: "PROVISIONAL", label: "PROVISIONAL" },
            { value: "APPROVED", label: "APPROVED " },
            { value: "DEFERRED", label: "DEFERRED" },
            { value: "ARCHIVED", label: "ARCHIVED" },
          ]}
          required
          variant="Select"
        />
      )}
    </Form>
  );
}
