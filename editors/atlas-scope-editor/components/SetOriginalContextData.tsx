import { Form, PHIDField } from "@powerhousedao/design-system/scalars";
import { useCallback } from "react";

type Props = {
  readonly defaultValue: string;
  readonly dispatch: (input: string) => void;
  readonly isEditing: boolean;
  readonly name: string;
  readonly placeholder: string;
  readonly label: string;
};

export function SetOriginalContextDataForm(props: Props) {
  const onSubmit = useCallback(
    (data: string) => {
      if (Object.keys(data).length === 0) return;
      
      props.dispatch(data);
    },
    [props.dispatch],
  );

  return (
    <Form onSubmit={onSubmit} submitChangesOnly defaultValues={{ [props.name]: props.defaultValue }}>
      {({ triggerSubmit }) => (
        <PHIDField
          label={props.label}
          disabled={!props.isEditing}
          name={props.name}
          onBlur={triggerSubmit}
          allowUris={true}
          placeholder={props.placeholder}
        />
      )}
    </Form>
  );
}
