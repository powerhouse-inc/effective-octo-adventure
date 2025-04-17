import { MultiPhIdForm } from "./MultiPhIdForm.js";

interface ContextDataFormProps<RefType = { id: string }> {
  onAdd: (value: string) => void;
  onRemove: (value: string) => void;
  onUpdate: (value: string) => void;
  data: RefType[];
}

const ContextDataForm = ({
  data,
  onAdd,
  onRemove,
  onUpdate,
}: ContextDataFormProps) => {
  return (
    <MultiPhIdForm
      label="Original Context Data"
      data={data}
      onAdd={onAdd}
      onRemove={onRemove}
      onUpdate={onUpdate}
    />
  );
};

export { ContextDataForm };
