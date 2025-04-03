import { type EditorProps } from "document-model";
import Layout, { LayoutContent, LayoutHeader, LayoutMain } from "../shared/components/Layout.js";
import ToggleSwitch from "../shared/components/toggle-switch.js";
import { useState } from "react";
import { EnumField, Form, PHIDField, SelectField, StringField, UrlField } from "@powerhousedao/design-system/scalars";
import { cb } from "../shared/components/utils/utils.js";
import { AtlasMultiParentDocument } from "document-models/atlas-multi-parent/index.js";

export type IProps = EditorProps<AtlasMultiParentDocument>;
export default function Editor(props: IProps) {
  const [splitMode, setSplitMode] = useState(0);
  const [editMode, setIsEditMode] = useState(1);
  const isEditMode = editMode === 1;
  
  const stateGlobal = {
    name: "Slippery Slope Misalignment",
    docNo: "A.1.1.2",
    parent: ["https://sky-atlas.powerhouse.io/A.1.1.2_Interpretation_Of_The_Spirit_Of_The_Atlas/6c73467e-04d3-41ff-8f6e-7de403fbd6bd%7C0db310f6"],
    atlasType: "ANNOTATION",
    content: "The element \"slippery slope misalignment\" refers to the potential for incremental deviations from Sky's core principles to gradually lead to significant and undesirable shifts, ultimately steering the Ecosystem away from its intended purpose and vision.",
    masterStatus: "PROVISIONAL",
    globalTags: ["PURPOSE_SYSTEM_", "RECURSIVE_IMPROVEMENT_"],
    references: [],
    provenance: "https://sky-atlas.powerhouse.io/A.1.1.2_Slippery_Slope_Misalignment/e2d90c40-79eb-47d5-a6cc-b92f4b53b997%7C0db310f6d6bd",
    notionId: "0db310f6d6bd"
  };

  const headerActions = (
    <>
      <button className="flex items-center justify-center h-8 px-3 rounded-md whitespace-nowrap min-w-fit font-medium text-sm cursor-pointer transition-all duration-200 outline-none bg-white text-gray-900 shadow-sm">
        Unified
      </button>
      <button
        onClick={() => setIsEditMode(1)}
        className="flex items-center justify-center h-8 px-3 rounded-md whitespace-nowrap min-w-fit font-medium text-sm cursor-pointer transition-all duration-200 outline-none bg-white text-gray-900 shadow-sm"
      >
        Edit
      </button>
      <ToggleSwitch
        className="hidden"
        options={["Unified", "Split"]}
        defaultSelected={0}
        onChange={(selectedIndex) => setSplitMode(selectedIndex)}
      />
      <ToggleSwitch
        className="hidden"
        options={["Read Only", "Edit"]}
        defaultSelected={0}
        onChange={(option) => setIsEditMode(option)}
      />
    </>
  );

  return (
    <div className="h-screen flex flex-col overflow-hidden">
      <Layout>
        {/* TODO implment  onSubmit in next PR */}
        <Form onSubmit={() => {}} defaultValues={{ stateGlobal }}>
          <LayoutHeader>
            <div>
              <h1 className="text-xl font-semibold">{stateGlobal.name}</h1>
            </div>
            <div className="flex items-center gap-2">
              <div className="atlas-cell-notionId">
                <span className="atlas-cell-notionId-label">Notion ID</span>
                <span className="atlas-cell-notionId-value">
                  {props.document.state.global.notionId || "4281AB93-EF4F-4974-988D-7DAD19A693D"}
                </span>
              </div>
            </div>
          </LayoutHeader>

          <LayoutContent>
            <h2 className="text-gray-700">A.2 / A.2.1 - Governance Process Support</h2>
            <div className="flex items-center gap-4">{headerActions}</div>
          </LayoutContent>

          <div className="flex-1 overflow-y-auto">
            <LayoutMain tagText="Official Atlas" variant="gray">
              <div className="flex flex-col gap-6 p-6">
                <div className="flex flex-row justify-between gap-2">
                  <div className="flex-1">
                    <StringField name="docNo" placeholder="A." label="Doc no" />
                  </div>
                  <div className="flex-1">
                    <StringField name="name" placeholder="Atlas Preamble" label="Grounding" />
                  </div>
                  <div className="flex-1">
                    <EnumField
                      name="atlasType"
                      placeholder="Select Atlas Type"
                      label="Type"
                      options={[
                        { value: "ANNOTATION", label: "Annotation" },
                        { value: "SCOPE", label: "Scope" },
                      ]}
                      required
                      variant="Select"
                    />
                  </div>
                  <div className="flex-1">
                    <EnumField
                      label="Status"
                      placeholder="Select Status"
                      name="masterStatus"
                      options={[
                        { value: "PLACEHOLDER", label: "PLACEHOLDER" },
                        { value: "PROVISIONAL", label: "PROVISIONAL" },
                        { value: "APPROVED", label: "APPROVED " },
                        { value: "DEFERRED", label: "DEFERRED" },
                        { value: "ARCHIVED", label: "ARCHIVED" },
                      ]}
                      required
                      variant="Select"
                    />
                  </div>
                </div>

                <div className="flex-1">
                  <StringField
                    autoExpand
                    multiline
                    name="content"
                    /* @ts-expect-error */
                    onBlur={() => handleSubmit(onSubmit)()}
                  />
                </div>

                <div className="flex flex-col gap-4 w-1/2">
                  <div className="flex flex-col gap-2 flex-1">
                    <PHIDField
                      name="parent"
                      fetchOptionsCallback={cb}
                      fetchSelectedOptionCallback={(x) => cb(x).then((x) => x[5])}
                      label="Parent Document"
                      placeholder="phd:"
                      variant="withValueTitleAndDescription"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <UrlField name="provenance" label="Provenance" placeholder="Provenance" />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <PHIDField
                      name="originalContextData"
                      fetchOptionsCallback={cb}
                      fetchSelectedOptionCallback={(x) => cb(x).then((x) => x[5])}
                      label="Original Context Data"
                      placeholder="phd:"
                      variant="withValueTitleAndDescription"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <PHIDField
                      name="references"
                      fetchOptionsCallback={cb}
                      fetchSelectedOptionCallback={(x) => cb(x).then((x) => x[5])}
                      label="Atlas References"
                      placeholder="phd:"
                      variant="withValueTitleAndDescription"
                    />
                  </div>
                  <div className="flex flex-col gap-2 flex-1">
                    <EnumField
                      label="Tags"
                      multiple
                      name="globalTags"
                      options={[
                        { value: "SCOPE_ADVISOR_", label: "SCOPE_ADVISOR_" },
                        { value: "AVC_", label: "AVC_" },
                        { value: "CAIS_", label: "CAIS_" },
                        { value: "ML___LOW_PRIORITY_", label: "ML___LOW_PRIORITY_" },
                        { value: "EXTERNAL_REFERENCE_", label: "EXTERNAL_REFERENCE_" },
                        { value: "DAO_TOOLKIT_", label: "DAO_TOOLKIT_" },
                        { value: "ML___DEFER_", label: "ML___DEFER_" },
                        { value: "PURPOSE_SYSTEM_", label: "PURPOSE_SYSTEM_" },
                        { value: "NEWCHAIN_", label: "NEWCHAIN_" },
                        { value: "ML___SUPPORT_DOCS_NEEDED_", label: "ML___SUPPORT_DOCS_NEEDED_" },
                        { value: "TWO_STAGE_BRIDGE_", label: "TWO_STAGE_BRIDGE_" },
                        { value: "ECOSYSTEM_INTELLIGENCE_", label: "ECOSYSTEM_INTELLIGENCE_" },
                        { value: "RECURSIVE_IMPROVEMENT_", label: "RECURSIVE_IMPROVEMENT_" },
                        { value: "LEGACY_TERM___USE_APPROVED_", label: "LEGACY_TERM___USE_APPROVED_" },
                      ]}
                    />
                  </div>
                </div>
              </div>
            </LayoutMain>
          </div>
        </Form>
      </Layout>
    </div>
  );
}
