/* eslint-disable react/jsx-no-bind */
import { EnumField, Form } from "@powerhousedao/design-system/scalars";
import { SetMasterStatusInput } from "document-models/atlas-exploratory";
import React from "react";

type Props = {
  readonly defaultValue: SetMasterStatusInput;
  readonly dispatch: (input: SetMasterStatusInput) => void;
};

export function SetMasterStatusForm(props: Props) {
  function onSubmit(input: SetMasterStatusInput) {
    props.dispatch(input);
  }

  return (
    <Form onSubmit={onSubmit} submitChangesOnly>
      {({ handleSubmit }) => (
        <EnumField
          defaultValue={props.defaultValue.masterStatus}
          label="Status"
          name="masterStatus"
          onChange={() => handleSubmit(onSubmit)()}
          options={[
            { value: "PLACEHOLDER", label: "PLACEHOLDER" },
            { value: "PROVISIONAL", label: "PROVISIONAL" },
            { value: "APPROVED", label: "APPROVED " },
            { value: "DEFERRED", label: "DEFERRED" },
            { value: "ARCHIVED", label: "ARCHIVED" },
          ]}
          required
          variant="Select"
        />
      )}
    </Form>
  );
}
