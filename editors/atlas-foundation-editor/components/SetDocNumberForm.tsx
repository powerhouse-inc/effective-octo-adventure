 
import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { type SetDocNumberInput } from "document-models/atlas-foundation/index.js";

type Props = {
  readonly defaultValue: SetDocNumberInput;
  readonly dispatch: (input: SetDocNumberInput) => void;
};

export function SetDocNumberForm(props: Props) {
  function onSubmit(input: SetDocNumberInput) {
    props.dispatch(input);
  }

  return (
    <Form onSubmit={onSubmit} submitChangesOnly>
      {({ handleSubmit }) => (
        <StringField
          defaultValue={props.defaultValue.docNo}
          label="Doc №"
          name="docNo"
          /* @ts-expect-error */
          onBlur={() => handleSubmit(onSubmit)()}
          placeholder="A."
        />
      )}
    </Form>
  );
}
