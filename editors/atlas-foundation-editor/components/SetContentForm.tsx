/* eslint-disable react/jsx-no-bind */
import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { SetContentInput } from "document-models/atlas-foundation";
import React from "react";

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
          onBlur={() => handleSubmit(onSubmit)()}
        />
      )}
    </Form>
  );
}
