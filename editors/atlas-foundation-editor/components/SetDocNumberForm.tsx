/* eslint-disable react/jsx-no-bind */
import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { SetDocNumberInput } from "document-models/atlas-foundation";
import React from "react";

type Props = {
  readonly defaultValue: SetDocNumberInput;
  readonly dispatch: (input: SetDocNumberInput) => void;
};

export function SetDocNumberForm(props: Props) {
  function onSubmit(input: SetDocNumberInput) {
    props.dispatch(input);
  }

  const formRef = React.createRef<any>();

  return (
    <Form onSubmit={onSubmit} ref={formRef} submitChangesOnly>
      <StringField
        defaultValue={props.defaultValue.docNo}
        label="Doc №"
        name="docNo"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        onBlur={() => formRef.current?.handleSubmit(onSubmit)()}
        placeholder="A."
      />
    </Form>
  );
}
