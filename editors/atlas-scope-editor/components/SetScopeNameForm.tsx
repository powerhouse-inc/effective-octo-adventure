/* eslint-disable react/jsx-no-bind */
import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { type SetScopeNameInput } from "document-models/atlas-scope/index.js";
import { useRef } from "react";

type Props = {
  readonly defaultValue: SetScopeNameInput;
  readonly dispatch: (input: SetScopeNameInput) => void;
};

export function SetScopeNameForm(props: Props) {
  function onSubmit(input: SetScopeNameInput) {
    props.dispatch(input);
  }

  // use "useRef" over "createRef" to avoid new refs on every render
  // https://www.geeksforgeeks.org/difference-between-useref-and-createref-in-reactjs/
  const formRef = useRef<any>(null);

  return (
    <Form onSubmit={onSubmit} submitChangesOnly>
      {({ handleSubmit }) => (
        <StringField
          defaultValue={props.defaultValue.name}
          label="Scope"
          name="name"
          /* @ts-expect-error */
          onBlur={() => handleSubmit(onSubmit)()}
          placeholder="Enter the scope name"
        />
      )}
    </Form>
  );
}
