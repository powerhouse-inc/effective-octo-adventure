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
            // Solo despachar si hay cambios reales
            if (data.provenance === props.defaultValue.provenance) return;
            
            props.dispatch(data);
        },
        [props.dispatch, props.defaultValue.provenance],
    );
    return (
        <Form onSubmit={onSubmit} submitChangesOnly defaultValues={{ [props.name]: props.defaultValue.provenance }}>
            {({ triggerSubmit }) => (
                <UrlField
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
