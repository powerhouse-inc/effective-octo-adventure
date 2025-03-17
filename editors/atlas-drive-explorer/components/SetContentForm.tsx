import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { type SetContentInput } from "document-models/atlas-scope/index.js";

type Props = {
  readonly defaultValue: SetContentInput;
  readonly dispatch: (input: SetContentInput) => void;
};

export function SetContentForm(props: Props) {
  function onSubmit(input: SetContentInput) {
    props.dispatch(input);
  }

  return (
    <Form onSubmit={onSubmit} submitChangesOnly>
      {({ handleSubmit }) => (
        <StringField
          autoExpand
          defaultValue={props.defaultValue.content}
          multiline
          name="content"
          /* @ts-expect-error */
          onBlur={() => handleSubmit(onSubmit)()}
        />
      )}
    </Form>
  );
}
