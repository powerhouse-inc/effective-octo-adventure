import { Form } from "@powerhousedao/design-system/scalars";
import { useFormMode } from "../../providers/FormModeProvider.js";
import { GenericTextForm } from "./generics/GenericTextForm.js";
import type { Maybe } from "document-model";
import { UrlDiffField } from "../diff-fields/url-diff-field.js";

interface ProvenanceFormProps {
  value: Maybe<string>;
  baselineValue: Maybe<string>;
  onSave: (value: string) => void;
}

// TODO: allow to handle multiple provenance urls
const ProvenanceForm = ({
  value,
  baselineValue,
  onSave,
}: ProvenanceFormProps) => {
  const formMode = useFormMode();
  const onSubmit = (data: { url: string }) => {
    if (data.url !== undefined && data.url !== value) {
      onSave(data.url);
    }
  };

  return (
    <Form onSubmit={onSubmit} submitChangesOnly defaultValues={{ url: value }}>
      {({ triggerSubmit }) => (
        <UrlDiffField
          name="url"
          label="Provenance"
          placeholder="Provenance"
          onBlur={triggerSubmit}
          platformIcons={{
            "notion.so": "Globe",
            "www.notion.so": "Globe",
          }}
          mode={formMode}
          baselineValue={baselineValue ?? ""}
        />
      )}
    </Form>
  );
};

export { ProvenanceForm };
