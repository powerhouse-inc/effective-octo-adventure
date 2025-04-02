import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { type SetScopeNameInput } from "document-models/atlas-scope/index.js";
import { useCallback } from "react";

type Props = {
  readonly defaultValue: SetScopeNameInput;
  readonly dispatch: (input: SetScopeNameInput) => void;
  readonly isEditing: boolean;
  readonly name: string;
  readonly placeholder: string;
  readonly label: string;
};

export function SetScopeNameForm(props: Props) {
  const onSubmit = useCallback(
    (data: SetScopeNameInput) => {
      if (Object.keys(data).length === 0) return;

      props.dispatch({ name: data.name });
    },
    [props.dispatch],
  );

  return (
    <Form onSubmit={onSubmit} submitChangesOnly defaultValues={{ [props.name]: props.defaultValue.name }}>
      {({ triggerSubmit }) => (
        <StringField
          readOnly={!props.isEditing}
          label={props.label}
          name={props.name}
          onBlur={triggerSubmit}
          placeholder={props.placeholder}
        />
      )}
    </Form>
  );
}
