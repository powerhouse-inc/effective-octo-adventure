 
import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { type SetGroundingNameInput } from "document-models/atlas-grounding/index.js";

type Props = {
  readonly defaultValue: SetGroundingNameInput;
  readonly dispatch: (input: SetGroundingNameInput) => void;
};

export function SetGroundingNameForm(props: Props) {
  function onSubmit(input: SetGroundingNameInput) {
    props.dispatch(input);
  }

  return (
    <Form onSubmit={onSubmit} submitChangesOnly>
      {({ handleSubmit }) => (
        <StringField
          defaultValue={props.defaultValue.name}
          label="Name"
          name="name"
          /* @ts-expect-error */
          onBlur={() => handleSubmit(onSubmit)()}
          placeholder="Enter the document name"
        />
      )}
    </Form>
  );
}
