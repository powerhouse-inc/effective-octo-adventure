/* eslint-disable react/jsx-no-bind */
import { EnumField, Form } from "@powerhousedao/design-system/scalars";
import { AddTagsInput } from "document-models/atlas-scope";
import React from "react";

type Props = {
  readonly defaultValue: AddTagsInput;
  readonly dispatch: (input: AddTagsInput) => void;
};

export function SetTagsForm(props: Props) {
  function onSubmit(input: AddTagsInput) {
    props.dispatch(input);
  }

  return (
    <Form onSubmit={onSubmit} submitChangesOnly>
      {({ handleSubmit }) => (
        <EnumField
          defaultValue={props.defaultValue.newTags}
          label="Tags"
          multiple
          name="newTags"
          onChange={() => handleSubmit(onSubmit)()}
          options={[
            {
              label: "RECURSIVE_IMPROVEMENT",
              value: "RECURSIVE_IMPROVEMENT",
            },
            { label: "SCOPE_ADVISOR", value: "SCOPE_ADVISOR" },
            { label: "DAO_TOOLKIT", value: "DAO_TOOLKIT" },
            { label: "PURPOSE_SYSTEM", value: "PURPOSE_SYSTEM" },
            { label: "ML_LOW_PRIORITY", value: "ML_LOW_PRIORITY" },
            { label: "EXTERNAL_REFERENCE", value: "EXTERNAL_REFERENCE" },
            { label: "ML_DEFER", value: "ML_DEFER" },
            { label: "SUBDAO_INCUBATION", value: "SUBDAO_INCUBATION" },
            { label: "V1_MIP", value: "V1_MIP" },
            { label: "ML_HIGH_PRIORITY", value: "ML_HIGH_PRIORITY" },
            {
              label: "ECOSYSTEM_INTELLIGENCE",
              value: "ECOSYSTEM_INTELLIGENCE",
            },
            {
              label: "LEGACY_TERM_USE_APPROVED",
              value: "LEGACY_TERM_USE_APPROVED",
            },
            { label: "CAIS", value: "CAIS" },
            { label: "INTERNAL_REFERENCE", value: "INTERNAL_REFERENCE" },
            { label: "FACILITATORDAO", value: "FACILITATORDAO" },
            { label: "ML_MED_PRIORITY", value: "ML_MED_PRIORITY" },
            { label: "AVC", value: "AVC" },
            { label: "P0_HUB_ENTRY_NEEDED", value: "P0_HUB_ENTRY_NEEDED" },
            { label: "ANON_WORKFORCE", value: "ANON_WORKFORCE" },
            { label: "NEWCHAIN", value: "NEWCHAIN" },
            {
              label: "ML_SUPPORT_DOCS_NEEDED",
              value: "ML_SUPPORT_DOCS_NEEDED",
            },
            { label: "SUBDAO_REWARDS", value: "SUBDAO_REWARDS" },
            { label: "TWO_STAGE_BRIDGE", value: "TWO_STAGE_BRIDGE" },
          ]}
        />
      )}
    </Form>
  );
}
