/* eslint-disable react/jsx-no-bind */
import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { SetFoundationNameInput } from "document-models/atlas-foundation";
import React from "react";

type Props = {
  readonly defaultValue: SetFoundationNameInput;
  readonly dispatch: (input: SetFoundationNameInput) => void;
};

export function SetFoundationNameForm(props: Props) {
  function onSubmit(input: SetFoundationNameInput) {
    props.dispatch(input);
  }

  return (
    <Form onSubmit={onSubmit} submitChangesOnly>
      {({ handleSubmit }) => (
        <StringField
          defaultValue={props.defaultValue.name}
          label="Name"
          name="name"
          onBlur={() => handleSubmit(onSubmit)()}
          placeholder="Enter the document name"
        />
      )}
    </Form>
  );
}
