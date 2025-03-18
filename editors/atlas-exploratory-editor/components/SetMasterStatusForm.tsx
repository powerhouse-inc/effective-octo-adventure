 
import { EnumField, Form } from "@powerhousedao/design-system/scalars";
import { type SetMasterStatusInput } from "document-models/atlas-exploratory/index.js";

type Props = {
  readonly defaultValue: SetMasterStatusInput;
  readonly dispatch: (input: SetMasterStatusInput) => void;
};

export function SetMasterStatusForm(props: Props) {
  function onSubmit(input: SetMasterStatusInput) {
    props.dispatch(input);
  }

  return (
    <Form onSubmit={onSubmit} submitChangesOnly>
      {({ handleSubmit }) => (
        <EnumField
          defaultValue={props.defaultValue.masterStatus}
          label="Status"
          name="masterStatus"
          /* @ts-expect-error */
          onChange={() => handleSubmit(onSubmit)()}
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
