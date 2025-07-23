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
  showAddField?: boolean; // Controlar si mostrar el campo de agregar nuevos elementos
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

  const onSubmit = (data: Record<`item-${number}` | "item-new", TValue>) => {
    for (const [key, value] of Object.entries(data)) {
      if (key === "item-new") continue;

      const id = key.replace("item-", "");
      const field = fields.find((f) => f.id === id)!;
      const fieldIndex = fields.indexOf(field);
      if (value !== field?.value) {
        if (value === "" || value === null) {
          // remove the items when the value changes to empty
          onRemove({
            value: field.value,
            id: field.id,
            index: fieldIndex,
          }); // remove original value

          // unregister the field as it will be removed
          formRef.current?.unregister(`item-${field.id}`);
        } else {
          // update the item if the value changed
          onUpdate({
            previousValue: field.value,
            value,
            id: field.id,
            index: fieldIndex,
          });
        }
        break;
      }
    }
    if (data["item-new"] && showAddField) {
      // create a new field/item
      onAdd(data["item-new"]);
      formRef.current?.reset({ "item-new": "" }); // reset to empty to allow adding another items
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

          {/* Add field - solo mostrar si showAddField es true */}
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
