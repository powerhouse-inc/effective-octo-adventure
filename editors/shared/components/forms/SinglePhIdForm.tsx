import { FieldSkeleton } from "../field-skeleton.js";
import { GenericPHIDForm } from "./generics/GenericPHIDForm.js";
import type { Maybe } from "document-model";
import type { PHIDOption } from "@powerhousedao/document-engineering/ui";
import type React from "react";

interface SinglePhIdFormProps {
  loading?: boolean;
  value: Maybe<string>;
  baselineValue: Maybe<string>;
  baselineIcon?: string | React.ReactElement;
  baselineTitle?: string;
  baselineType?: string;
  baselineDescription?: string;
  onSave: (value: string) => void;
  label: string;
  placeholder?: string;
  initialOptions?: PHIDOption[];
  fetchOptionsCallback: (value: string) => PHIDOption[];
}

const SinglePhIdForm = ({
  loading,
  value,
  baselineValue,
  baselineIcon,
  baselineTitle,
  baselineType,
  baselineDescription,
  onSave,
  label,
  placeholder = "phd:",
  initialOptions,
  fetchOptionsCallback,
}: SinglePhIdFormProps) => {
  return loading ? (
    <FieldSkeleton className="h-[92px]" />
  ) : (
    <GenericPHIDForm
      label={label}
      placeholder={placeholder}
      value={value ?? ""}
      baselineValue={baselineValue ?? ""}
      baselineIcon={baselineIcon}
      baselineTitle={baselineTitle}
      baselineType={baselineType}
      baselineDescription={baselineDescription}
      onSave={onSave}
      initialOptions={initialOptions}
      fetchOptionsCallback={fetchOptionsCallback}
    />
  );
};

export { SinglePhIdForm };
