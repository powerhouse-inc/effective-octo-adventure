import { Form, StringField } from "@powerhousedao/design-system/scalars";
import { type SetContentInput } from "document-models/atlas-scope/index.js";
import { useCallback } from "react";

type Props = {
  readonly defaultValue: SetContentInput;
  readonly dispatch: (input: SetContentInput) => void;
  readonly isEditing: boolean;
  readonly name: string;
  readonly label: string;
  readonly placeholder: string;
};

export function SetContentForm(props: Props) {
  const onSubmit = useCallback(
    (data: SetContentInput) => {
      if (Object.keys(data).length === 0) return;
      props.dispatch({ content: data.content });
    },
    [props.dispatch, props.defaultValue.content],
  );

  return (
    <Form onSubmit={onSubmit} submitChangesOnly defaultValues={{ [props.name]: props.defaultValue.content }}>
      {({ triggerSubmit }) => (
        <StringField
          autoExpand
          rows={4}
          multiline
          name={props.name}
          onBlur={triggerSubmit}
          label={props.label}
          readOnly={!props.isEditing}
          placeholder={props.placeholder}
        />
      )}
    </Form>
  );
}
