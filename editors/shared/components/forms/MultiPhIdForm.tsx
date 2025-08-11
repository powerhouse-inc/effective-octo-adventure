import { useCallback, useMemo, useRef } from "react";
import { FieldSkeleton } from "../field-skeleton.js";
import { Skeleton } from "../ui/skeleton.js";
import { ArrayField, type ArrayFieldProps } from "../ArrayField.js";
import { useFormMode } from "../../providers/FormModeProvider.js";
import type { PHIDOption } from "@powerhousedao/document-engineering/ui";
import {
  PHIDField,
  type PHIDFieldProps,
} from "@powerhousedao/document-engineering/scalars";
import type { MDocumentLink } from "document-models/atlas-multi-parent/index.js";
import type { AtlasDocument } from "../../utils/utils.js";
import {
  arrayDiffIndexMapping,
  parentToMappingOperations,
  getOperations,
} from "../../utils/array-diff.js";

type CommonDataProps = {
  id: string;
  initialOptions?: PHIDOption[];
};

interface MultiPhIdFormProps
  extends Omit<
    ArrayFieldProps<string, PHIDFieldProps>,
    "fields" | "componentProps" | "component"
  > {
  loading?: boolean;
  data: CommonDataProps[];
  fetchOptionsCallback: (value: string) => PHIDOption[];
  baselineValue?: MDocumentLink[];
  showAddField: boolean;
  document: AtlasDocument;
  isSplitMode: boolean;
}

const MultiPhIdForm = ({
  loading,
  label,
  data,
  onAdd,
  onRemove,
  onUpdate,
  fetchOptionsCallback,
  baselineValue,
  showAddField,
  document,
  isSplitMode,
}: MultiPhIdFormProps) => {
  const viewMode = useFormMode();

  const mapping = useMemo(() => {
    if (baselineValue === undefined) return [];
    const operations = getOperations(document, [
      "REPLACE_PARENT",
      "ADD_PARENT",
      "REMOVE_PARENT",
    ]);
    const baselineValueIds =
      baselineValue?.map((item) => `phd:${item.id}`) ?? [];
    const mapping = arrayDiffIndexMapping(
      baselineValueIds,
      parentToMappingOperations(operations),
    );
    return mapping;
  }, [baselineValue, document]);

  const fields = useMemo(() => {
    let fields = mapping.map((_, index) => ({
      id: index.toString(),
      value:
        mapping[index].currentIndex === undefined
          ? ""
          : data[mapping[index].currentIndex]?.id || "",
    }));

    fields = fields.filter((item, index) => {
      const baseValue =
        mapping[index].originalIndex === undefined
          ? undefined
          : baselineValue?.[mapping[index].originalIndex]?.id;

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
    (props: PHIDFieldProps) => {
      let baseValue = undefined;

      const mappingIndex = parseInt(props.name?.replace("item-", "") ?? "");
      const isRemoved =
        !isNaN(mappingIndex) &&
        mappingRef.current?.[mappingIndex]?.currentIndex === undefined;

      const actualDataIndex = mappingRef.current?.[mappingIndex]?.currentIndex;
      const element =
        props.name !== "item-new" && actualDataIndex !== undefined
          ? dataRef.current?.[actualDataIndex]
          : undefined;

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
          <FieldSkeleton className="h-[92px]" />
        ) : (
          <Skeleton className="h-[92px]" />
        )
      ) : (
        <PHIDField
          {...(isRemoved ? { ...props, placeholder: undefined } : props)}
          initialOptions={element?.initialOptions}
          viewMode={viewMode}
          baseValue={baseValue ? `phd:${baseValue.id}` : undefined}
          basePreviewTitle={baseValue?.title ?? undefined}
          basePreviewPath={baseValue?.documentType ?? undefined}
          disabled={isRemoved}
        />
      );
    },
    [loading, viewMode],
  );

  return (
    <ArrayField<string, PHIDFieldProps>
      onAdd={onAdd}
      onRemove={onRemove}
      onUpdate={onUpdate}
      showAddField={showAddField}
      fields={fields}
      label={label}
      component={renderComponent}
      componentProps={{
        placeholder: "phd:",
        variant: "withValueAndTitle",
        allowUris: true,
        fetchOptionsCallback,
        fetchSelectedOptionCallback: (val) => {
          const result = fetchOptionsCallback(val)[0];
          const element = data.find((d) => d.id === val);
          const elementIndex = data.findIndex((d) => d.id === val);

          if (result !== undefined && element !== undefined) {
            if (result.title !== element.initialOptions?.[0]?.title) {
              onUpdate({
                previousValue: element.id,
                value: result.value,
                id: element.id,
                index: elementIndex,
              });
            }
            return result;
          }
          return element?.initialOptions?.[0];
        },
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

export { MultiPhIdForm };
