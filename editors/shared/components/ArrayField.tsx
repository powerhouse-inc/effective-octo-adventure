import { Form } from "@powerhousedao/design-system/scalars";
import type React from "react";
import { useEffect, useMemo, useRef } from "react";
import type { UseFormReturn } from "react-hook-form";

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
interface ArrayFieldProps<TValue, TProps> {
  onAdd: (value: TValue) => void;
  onRemove: (options: RemoveOptions<TValue>) => void;
  onUpdate: (options: UpdateOptions<TValue>) => void;
  fields: Field<TValue>[];
  label: string;
  component: (props: TProps) => React.ReactNode;
  componentProps: TProps;
}

const ArrayField = <TValue, TProps>({
  onAdd,
  onRemove,
  onUpdate,
  fields,
  label,
  component: Component,
  componentProps,
}: ArrayFieldProps<TValue, TProps>) => {
  const formRef = useRef<UseFormReturn>(null);
  const onSubmit = (data: Record<`item-${number}` | "item-new", TValue>) => {
    if (data["item-new"]) {
      // create a new field/item
      onAdd(data["item-new"]);
      formRef.current?.reset({ "item-new": "" }); // reset to empty to allow adding another items
      return;
    }

    Object.entries(data).forEach(([key, value]) => {
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
        return;
      }
    });
  };

  // create a default values object with the values and the new item
  const defaultValues = useMemo(() => {
    return {
      ...fields
        .map((field) => ({
          [`item-${field.id}`]: field.value,
        }))
        .reduce((acc, curr) => ({ ...acc, ...curr }), {}),
      [`item-new`]: "",
    };
  }, [fields]);

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
      extraFormProps={{ shouldFocusError: true }}
      defaultValues={defaultValues}
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

          {/* Add field */}
          <Component
            {...componentProps}
            label={fields.length === 0 ? label : undefined}
            name="item-new"
            onBlur={triggerSubmit}
            required={false}
          />
        </div>
      )}
    </Form>
  );
};

export { ArrayField };
