import { Form, StringField, UrlField } from "@powerhousedao/design-system/scalars";
import { SetProvenanceInput, type SetContentInput } from "document-models/atlas-scope/index.js";
import { useCallback } from "react";

type Props = {
    readonly defaultValue: SetProvenanceInput;
    readonly dispatch: (input: SetProvenanceInput) => void;
    readonly isEditing: boolean;
    readonly name: string;
    readonly label: string;
    readonly placeholder: string;
};

export function SetProvenanceFrom(props: Props) {
    const onSubmit = useCallback(
        (data: SetProvenanceInput) => {
            if (Object.keys(data).length === 0) return;

            props.dispatch(data);
        },
        [props.dispatch],
    );
    return (
        <Form onSubmit={onSubmit} submitChangesOnly>
            {({ triggerSubmit }) => (
                <UrlField
                    defaultValue={props.defaultValue.provenance ?? undefined}
                    name={props.name}
                    onBlur={() => triggerSubmit()}
                    label={props.label}
                    disabled={!props.isEditing}
                    placeholder={props.placeholder}
                />
            )}
        </Form>
    );
}
