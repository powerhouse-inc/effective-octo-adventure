/* eslint-disable react/jsx-no-bind */
import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { SetGroundingNameInput } from "document-models/atlas-grounding";
import React from "react";

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
          onBlur={() => handleSubmit(onSubmit)()}
          placeholder="Enter the document name"
        />
      )}
    </Form>
  );
}
