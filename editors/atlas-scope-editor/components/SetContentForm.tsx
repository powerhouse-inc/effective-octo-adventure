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
      if (data.content === props.defaultValue.content)

        return;


      props.dispatch(data);
    },
    [props.dispatch],
  );
  return (
    <Form onSubmit={onSubmit} submitChangesOnly>
      {({ triggerSubmit }) => (
        <StringField
          autoExpand
          defaultValue={props.defaultValue.content}
          rows={4}
          multiline
          name={props.name}
          onBlur={triggerSubmit}
          label={props.label}
          disabled={!props.isEditing}
          placeholder={props.placeholder}
        />
      )}
    </Form>
  );
}
