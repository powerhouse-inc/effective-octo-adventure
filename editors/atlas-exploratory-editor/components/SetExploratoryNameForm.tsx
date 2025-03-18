 
import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { type SetExploratoryNameInput } from "document-models/atlas-exploratory/index.js";

type Props = {
  readonly defaultValue: SetExploratoryNameInput;
  readonly dispatch: (input: SetExploratoryNameInput) => void;
};

export function SetExploratoryNameForm(props: Props) {
  function onSubmit(input: SetExploratoryNameInput) {
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
