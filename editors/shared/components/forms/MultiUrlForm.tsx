import { useCallback, useMemo, useRef } from "react";
import { FieldSkeleton } from "../field-skeleton.js";
import { Skeleton } from "../ui/skeleton.js";
import { ArrayField, type ArrayFieldProps } from "../ArrayField.js";
import {
  UrlField,
  type UrlFieldProps,
  type ViewMode,
} from "@powerhousedao/document-engineering/scalars";
import type { AtlasDocument } from "../../utils/utils.js";
import {
  arrayDiffIndexMapping,
  contextDataToMappingOperations,
  getOperations,
} from "../../utils/array-diff.js";

interface MultiUrlFormProps
  extends Omit<
    ArrayFieldProps<string, UrlFieldProps>,
    "fields" | "componentProps" | "component"
  > {
  loading?: boolean;
  data: string[];
  document: AtlasDocument;
  viewMode: ViewMode;
  baselineValue?: string[];
  isSplitMode: boolean;
}

const MultiUrlForm = ({
  loading,
  label,
  data,
  onAdd,
  onRemove,
  onUpdate,
  viewMode,
  baselineValue,
  showAddField,
  document,
  isSplitMode,
}: MultiUrlFormProps) => {
  const mapping = useMemo(() => {
    if (baselineValue === undefined) return [];
    const operations = getOperations(document, [
      "REPLACE_CONTEXT_DATA",
      "ADD_CONTEXT_DATA",
      "REMOVE_CONTEXT_DATA",
    ]);
    const mapping = arrayDiffIndexMapping(
      baselineValue,
      contextDataToMappingOperations(operations),
    );
    return mapping;
  }, [baselineValue, document]);

  const fields = useMemo(() => {
    let fields = mapping.map((_, index) => ({
      id: index.toString(),
      value:
        mapping[index].currentIndex === undefined
          ? ""
          : data[mapping[index].currentIndex],
    }));

    fields = fields.filter((item, index) => {
      const baseValue =
        mapping[index].originalIndex === undefined
          ? undefined
          : baselineValue?.[mapping[index].originalIndex];

      if (!isSplitMode && viewMode === "edition") {
        return item.value !== "";
      } else {
        return !(
          item.value === "" &&
          (baseValue === "" || baseValue === undefined)
        );
      }
    });

    return fields;
  }, [mapping, isSplitMode, viewMode, data, baselineValue]);

  const mappingRef = useRef(mapping);
  const baselineValueRef = useRef(baselineValue);
  const fieldsRef = useRef(fields);
  const dataRef = useRef(data);

  mappingRef.current = mapping;
  baselineValueRef.current = baselineValue;
  fieldsRef.current = fields;
  dataRef.current = data;

  const renderComponent = useCallback(
    (props: UrlFieldProps) => {
      let baseValue = undefined;

      const mappingIndex = parseInt(props.name?.replace("item-", "") ?? "");
      const isRemoved =
        !isNaN(mappingIndex) &&
        mappingRef.current?.[mappingIndex]?.currentIndex === undefined;

      if (props.name !== "item-new") {
        baseValue =
          mappingRef.current?.[mappingIndex]?.originalIndex === undefined
            ? undefined
            : baselineValueRef.current?.[
                mappingRef.current[mappingIndex].originalIndex
              ];
      }

      const isFirstField =
        (fieldsRef.current.length === 0 && props.name === "item-new") ||
        props.name === `item-${fieldsRef.current?.[0]?.id}`;

      return loading ? (
        isFirstField ? (
          <FieldSkeleton />
        ) : (
          <Skeleton />
        )
      ) : (
        <UrlField
          {...(isRemoved ? { ...props, placeholder: undefined } : props)}
          viewMode={viewMode}
          baseValue={baseValue}
          platformIcons={
            !isRemoved || (isRemoved && viewMode !== "edition")
              ? { "example.com": "File" }
              : undefined
          }
          disabled={isRemoved}
          style={{
            paddingLeft: "32px",
          }}
        />
      );
    },
    [loading, viewMode],
  );

  return (
    <ArrayField<string, UrlFieldProps>
      onAdd={onAdd}
      onRemove={onRemove}
      onUpdate={onUpdate}
      showAddField={showAddField}
      fields={fields}
      label={label}
      component={renderComponent}
      componentProps={{
        placeholder: "https://www.example.com",
        validators: [
          (value: string, formState) => {
            if (!value) return true;

            // Check for duplicates in the current form
            const values = Object.values(formState);
            const isDuplicateInForm =
              values.filter((v) => v === value).length > 1;

            if (isDuplicateInForm) {
              return "This value is already being used in the form";
            }

            return true;
          },
        ],
      }}
    />
  );
};

export { MultiUrlForm };
