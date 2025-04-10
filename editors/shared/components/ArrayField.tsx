import {
  Form,
  type InputBaseProps,
} from "@powerhousedao/design-system/scalars";
import type React from "react";
import type { HTMLAttributes } from "react";

interface ArrayFieldProps<TValue, TProps> {
  onAdd: (value: TValue) => void;
  onRemove: (value: TValue) => void;
  onUpdate: (value: TValue[]) => void;
  values: TValue[];
  label: string;
  component: (props: TProps) => React.ReactNode;
  componentProps: TProps;
}

const ArrayField = <TValue, TProps>({
  onAdd,
  onRemove,
  onUpdate,
  values,
  label,
  component: Component,
  componentProps,
}: ArrayFieldProps<TValue, TProps>) => {
  const onSubmit = (data: Record<`item-${number}` | "item-new", TValue>) => {
    alert("onSubmit");
    if (data["item-new"]) {
      onAdd(data["item-new"]);
    }

    for (const key in data) {
      if (key.startsWith("item-")) {
        // onUpdate(data[key], parseInt(key.split("-")[1]));
      }
    }
  };

  return (
    <Form
      onSubmit={onSubmit}
      submitChangesOnly
      extraFormProps={{ shouldFocusError: true }}
    >
      {({ triggerSubmit }) => (
        <div className="flex flex-col gap-3">
          {values.map((value, index) => (
            <Component
              {...componentProps}
              name={`item-${index}`}
              label={index === 0 ? label : undefined}
              key={index}
              defaultValue={value}
              onBlur={triggerSubmit}
            />
          ))}

          {/* Add field */}
          <Component
            {...componentProps}
            label={values.length === 0 ? label : undefined}
            name="item-new"
            onBlur={triggerSubmit}
          />
        </div>
      )}
    </Form>
  );
};

export { ArrayField };
