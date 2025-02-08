/* eslint-disable react/jsx-no-bind */
import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { SetContentInput } from "document-models/atlas-exploratory";
import React from "react";

type Props = {
  readonly defaultValue: SetContentInput;
  readonly dispatch: (input: SetContentInput) => void;
};

export function SetContentForm(props: Props) {
  function onSubmit(input: SetContentInput) {
    props.dispatch(input);
  }

  const formRef = React.createRef<any>();

  return (
    <Form onSubmit={onSubmit} ref={formRef} submitChangesOnly>
      <StringField
        autoExpand
        defaultValue={props.defaultValue.content}
        multiline
        name="content"
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return, @typescript-eslint/no-unsafe-call, @typescript-eslint/no-unsafe-member-access
        onBlur={() => formRef.current?.handleSubmit(onSubmit)()}
      />
    </Form>
  );
}
