/* eslint-disable react/jsx-no-bind */
import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { SetMultiparentNameInput } from "document-models/atlas-multi-parent";
import React from "react";

type Props = {
  readonly defaultValue: SetMultiparentNameInput;
  readonly dispatch: (input: SetMultiparentNameInput) => void;
};

export function SetMultiParentNameForm(props: Props) {
  function onSubmit(input: SetMultiparentNameInput) {
    props.dispatch(input);
  }

  const formRef = React.createRef<any>();

  return (
    <Form onSubmit={onSubmit} ref={formRef} submitChangesOnly>
      <StringField
        defaultValue={props.defaultValue.name}
        label="Scope"
        name="name"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        onBlur={() => formRef.current?.handleSubmit(onSubmit)()}
        placeholder="Enter the scope name"
      />
    </Form>
  );
}
