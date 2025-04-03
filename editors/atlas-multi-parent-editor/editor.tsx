import { type EditorProps } from "document-model";
import Layout, { LayoutContent, LayoutHeader, LayoutMain } from "../shared/components/Layout.js";
import ToggleSwitch from "../shared/components/toggle-switch.js";
import { useState } from "react";
import { EnumField, Form, PHIDField, SelectField, StringField, UrlField } from "@powerhousedao/design-system/scalars";
import { cb } from "../shared/utils/utils.js";
import { actions, type AtlasMultiParentDocument, type MGlobalTag, type MStatus, type MAtlasType } from "../../document-models/atlas-multi-parent/index.js";
import { EStatus } from "document-models/atlas-exploratory/index.js";

export type IProps = EditorProps<AtlasMultiParentDocument>;
export default function Editor(props: IProps) {
  const { dispatch } = props;
  const documentState = props.document.state.global;
//TODO: fix this the URL field waiting for a string but it's an array
 const newMomentdocumentState={
  ...documentState,
  provenance: documentState.provenance?.[0] || "",
  originalContextData: documentState.originalContextData?.[0]?.id || "",
  parents: documentState.parents?.[0]?.id || "",
}

  const [splitMode, setSplitMode] = useState(0);
  const [editMode, setIsEditMode] = useState(1);
  const isEditMode = editMode === 1;
  const onSubmit = (data: Record<string, any>) => {
    
    if (data['globalTags'] !== undefined) {
      dispatch(actions.addTags({ tags: data['globalTags'] as MGlobalTag[] }));
    }
    if (data['docNo'] !== undefined) {
      dispatch(actions.setDocNumber({ docNo: data['docNo'] as string }));
    }
    if (data['name'] !== undefined) {
      dispatch(actions.setMultiparentName({ name: data['name'] as string }));
    }
    if (data['masterStatus'] !== undefined) {
      dispatch(actions.setMasterStatus({ masterStatus: data['masterStatus'] as MStatus }));
    }
    if (data['content'] !== undefined) {
      dispatch(actions.setContent({ content: data['content'] as string }));
    }
    if (data['parent'] !== undefined) {
      dispatch(actions.addParent({ id: data['parent'] as string }));
    }
    if (data['originalContextData'] !== undefined) {
      dispatch(actions.addContextData({ id: data['originalContextData'] as string }));
    }

    if (data['provenance'] !== undefined) {
      dispatch(actions.setProvenance({ provenance: [data['provenance'] as string] }));
    }
    if (data['notionId'] !== undefined) {
      dispatch(actions.setNotionId({ notionID: data['notionId'] as string }));
    }
    if (data['atlasType'] !== undefined) {
      dispatch(actions.setAtlasType({ atlasType: data['atlasType'] as MAtlasType }));
    }
  }

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
        <Form onSubmit={onSubmit} defaultValues={{ ...newMomentdocumentState }} submitChangesOnly>
          {({ triggerSubmit }) => (
            <>
              <LayoutHeader>
                <div>
                  <h1 className="text-xl font-semibold">Atlas Explorer - Foundation Entity Title</h1>
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
                        <StringField
                          name="docNo"
                          placeholder="A."
                          label="Doc no"
                          onBlur={triggerSubmit}
                        />
                      </div>
                      <div className="flex-1">
                        <StringField
                          name="name"
                          placeholder="Atlas Preamble"
                          label="Grounding"
                          onBlur={triggerSubmit}
                        />
                      </div>
                      <div className="flex-1">
                        <EnumField
                          name="atlasType"
                          placeholder="Select Atlas Type"
                          label="Type"
                          options={[
                            { value: "NEEDED_RESEARCH", label: "Needed Research" },
                            { value: "ANNOTATION", label: "Annotation" },
                          ]}
                          required
                          variant="Select"
                          onChange={triggerSubmit}
                        />
                      </div>
                      <div className="flex-1">
                        <EnumField
                          label="Status"
                          name="masterStatus"
                          onChange={triggerSubmit}
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
                      <StringField name="content" multiline={true} label="Content" placeholder="Content" onBlur={triggerSubmit} />
                    </div>

                    <div className="flex flex-col gap-4 w-1/2">
                      <div className="flex flex-col gap-2 flex-1">
                        <PHIDField
                          name="parents"
                          fetchOptionsCallback={cb}
                          fetchSelectedOptionCallback={(x) => cb(x).then((x) => x[5])}
                          label="Parent Document"
                          placeholder="phd:"
                          variant="withValueTitleAndDescription"
                          allowUris={true}
                          onBlur={triggerSubmit}
                        />
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <UrlField 
                          name="provenance" 
                          label="Provenance" 
                          placeholder="Provenance" 
                          onBlur={triggerSubmit}
                        />
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <PHIDField
                          name="originalContextData"
                          fetchOptionsCallback={cb}
                          fetchSelectedOptionCallback={(x) => cb(x).then((x) => x[5])}
                          label="Original Context Data"
                          placeholder="phd:"
                          variant="withValueTitleAndDescription"
                          allowUris={true}
                          onBlur={triggerSubmit}
                        />
                      </div>
                      <div className="flex flex-col gap-2 flex-1">
                        <EnumField
                          label="Tags"
                          onChange={triggerSubmit}
                          multiple
                          name="globalTags"
                          options={[
                            { value: "SCOPE_ADVISOR", label: "SCOPE_ADVISOR" },
                            { value: "AVC", label: "AVC" },
                            { value: "CAIS", label: "CAIS" },
                            { value: "ML_LOW_PRIORITY", label: "ML_LOW_PRIORITY" },
                            { value: "EXTERNAL_REFERENCE", label: "EXTERNAL_REFERENCE" },
                            { value: "DAO_TOOLKIT", label: "DAO_TOOLKIT" },
                            { value: "ML_DEFER", label: "ML_DEFER" },
                            { value: "PURPOSE_SYSTEM", label: "PURPOSE_SYSTEM" },
                            { value: "NEWCHAIN", label: "NEWCHAIN" },
                            { value: "ML_SUPPORT_DOCS_NEEDED", label: "ML_SUPPORT_DOCS_NEEDED" },
                            { value: "TWO_STAGE_BRIDGE", label: "TWO_STAGE_BRIDGE" },
                            { value: "ECOSYSTEM_INTELLIGENCE", label: "ECOSYSTEM_INTELLIGENCE" },
                            { value: "RECURSIVE_IMPROVEMENT", label: "RECURSIVE_IMPROVEMENT" },
                            { value: "LEGACY_TERM_USE_APPROVED", label: "LEGACY_TERM_USE_APPROVED" },
                          ]}
                        />
                      </div>
                    </div>
                  </div>
                </LayoutMain>
              </div>
            </>
          )}
        </Form>
      </Layout>
    </div>
  );
}
