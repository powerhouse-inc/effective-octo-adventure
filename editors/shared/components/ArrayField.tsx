import { Form } from "@powerhousedao/document-engineering/scalars";
import type React from "react";
import { useEffect, useMemo, useRef } from "react";
import type { FieldValues, UseFormReturn } from "react-hook-form";

interface UpdateOptions<TValue> {
  previousValue: TValue;
  value: TValue;
  id: string;
  index: number;
}

interface RemoveOptions<TValue> {
  value: TValue;
  id: string;
  index: number;
}

interface Field<TValue> {
  id: string;
  value: TValue;
}

export interface ArrayFieldProps<TValue, TProps> {
  onAdd: (value: TValue) => void;
  onRemove: (options: RemoveOptions<TValue>) => void;
  onUpdate: (options: UpdateOptions<TValue>) => void;
  fields: Field<TValue>[];
  label: string;
  component: (props: TProps) => React.ReactNode;
  componentProps: TProps;
  showAddField?: boolean;
}

const ArrayField = <TValue, TProps>({
  onAdd,
  onRemove,
  onUpdate,
  fields,
  label,
  component: Component,
  componentProps,
  showAddField = true,
}: ArrayFieldProps<TValue, TProps>) => {
  const formRef = useRef<UseFormReturn<FieldValues>>(null);

  const onSubmit = (data: Record<string, TValue>) => {
    fields.forEach((field, index) => {
      const formKey = `item-${field.id}`;
      if (!(formKey in data)) {
        return;
      }

      const formValue = data[formKey];

      if (formValue !== field.value) {
        if (formValue === "" || formValue === null) {
          if (field.value !== "") {
            onRemove({ value: field.value, id: field.id, index });
            formRef.current?.unregister(formKey);
          }
        } else {
          onUpdate({
            previousValue: field.value,
            value: formValue,
            id: field.id,
            index,
          });
        }
      }
    });
    if (data["item-new"] && showAddField) {
      onAdd(data["item-new"]);
      formRef.current?.resetField("item-new", { defaultValue: "" });
    }
  };

  // create a default values object with the values and the new item
  const defaultValues = useMemo(() => {
    const fieldValues = fields
      .map((field) => ({
        [`item-${field.id}`]: field.value,
      }))
      .reduce((acc, curr) => ({ ...acc, ...curr }), {});

    return {
      ...fieldValues,
      ...(showAddField ? { [`item-new`]: "" } : {}),
    };
  }, [fields, showAddField]);

  // update the form in case the field name changes due to the number of items
  // also keep in sync the values with the state of the form
  useEffect(() => {
    formRef.current?.reset(defaultValues);
  }, [defaultValues]);

  return (
    <Form
      ref={formRef}
      onSubmit={onSubmit}
      submitChangesOnly
      extraFormProps={{ shouldFocusError: false }}
      defaultValues={defaultValues}
      submissionErrorMatcher={(error) => {
        return {
          "root.serverError": error.message,
        };
      }}
    >
      {({ triggerSubmit }) => (
        <div className="flex flex-col gap-3">
          {fields.map((field, index) => (
            <Component
              {...componentProps}
              name={`item-${field.id}`}
              label={index === 0 ? label : undefined}
              key={field.id}
              onBlur={triggerSubmit}
              required={false}
            />
          ))}
          {showAddField && (
            <Component
              {...componentProps}
              label={fields.length === 0 ? label : undefined}
              name="item-new"
              onBlur={triggerSubmit}
              required={false}
            />
          )}
        </div>
      )}
    </Form>
  );
};

export { ArrayField };
