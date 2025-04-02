
import { Form, StringField } from "@powerhousedao/design-system/scalars";
import {
  actions,

  type SetDocNumberInput,
} from "document-models/atlas-scope/index.js";
import { useCallback } from "react";

type Props = {
  readonly defaultValue: SetDocNumberInput;
  readonly dispatch: (input: SetDocNumberInput) => void;
  readonly isEditing: boolean;
  readonly name: string;
  readonly label: string;
  readonly placeholder: string;
};

export function SetDocNumberForm(props: Props) {
  const onSubmit = useCallback(
    (data: SetDocNumberInput) => {
     
      if (Object.keys(data).length === 0) return;

      props.dispatch({ docNo: data.docNo });
    },
    [props.dispatch],
  );

  return (
    <Form onSubmit={onSubmit} submitChangesOnly defaultValues={{ [props.name]: props.defaultValue.docNo }}>
      {({ triggerSubmit }) => (
        <StringField
          disabled={!props.isEditing}
          name={props.name}
          label={props.label}
          onBlur={triggerSubmit}
          placeholder={props.placeholder}
        />
      )}
    </Form>
  );
}
