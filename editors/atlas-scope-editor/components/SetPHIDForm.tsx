import { IconName } from "@powerhousedao/design-system";
import { Form, PHIDField, StringField } from "@powerhousedao/design-system/scalars";
import { AddContextDataInput, type SetScopeNameInput } from "document-models/atlas-scope/index.js";
import { useCallback } from "react";

export type IdAutocompleteOption = {
    value: string;
    path: string;
    icon: IconName;
    description: string;
    title: string;
};

type Props = {
    readonly dispatch: (input: AddContextDataInput) => void;
    readonly isEditing: boolean;
    readonly name: string;
    readonly placeholder: string;
    readonly label: string;
    readonly defaultValue: AddContextDataInput;
    readonly fetchOptionsCallback: (userInput: string, context?: Record<string, unknown>) => Promise<IdAutocompleteOption[]> | IdAutocompleteOption[];
    readonly fetchSelectedOptionCallback: (value: string) => Promise<IdAutocompleteOption | undefined> | IdAutocompleteOption | undefined;
    readonly initialOptions: IdAutocompleteOption[];
};

export function SetPHIDForm(props: Props) {
    const onSubmit = useCallback(
        (data: AddContextDataInput) => {
            const newValue = (data as any).originalContextData;
            if (!newValue || newValue === props.defaultValue.id) {
                return;
            }
            props.dispatch({
                id: newValue
            });
        },
        [props.dispatch, props.defaultValue.id],
    );
    return (
        <Form onSubmit={onSubmit} submitChangesOnly>
            {({ triggerSubmit }) => (
                <PHIDField
                    readOnly={!props.isEditing}
                    fetchOptionsCallback={props.fetchOptionsCallback}
                    fetchSelectedOptionCallback={props.fetchSelectedOptionCallback}
                    initialOptions={props.initialOptions}
                    label="Original Context Data"
                    name="originalContextData"
                    placeholder="phd:"
                    variant="withValueTitleAndDescription"
                    onBlur={triggerSubmit}
                    allowUris={true}
                />
            )}
        </Form>
    );
}
