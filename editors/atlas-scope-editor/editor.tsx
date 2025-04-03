import React, { useState } from 'react';
import { EnumField, Form, PHIDField, SelectField, UrlField, StringField } from "@powerhousedao/design-system/scalars"
import { type EditorProps } from "document-model";
import {
  actions,
  type Status,
  type AtlasScopeDocument,
  type GlobalTag,
} from "../../document-models/atlas-scope/index.js";
import ToggleSwitch from '../shared/components/toggle-switch.js';
import Layout, { LayoutHeader, LayoutContent, LayoutMain } from '../shared/components/Layout.js';
import { cb, fetchPHIDOptions, fetchSelectedPHIDOption } from '../shared/components/utils/utils.js';

export type IProps = EditorProps<AtlasScopeDocument>;
export default function Editor(props: IProps) {
  const { document, dispatch } = props
  const documentState = props.document.state.global;
  const newMomentdocumentState={
    ...documentState,
    originalContextData: documentState.originalContextData?.[0]?.id || "",
    
  }
  
  const [splitMode, setSplitMode] = useState(0);
  const [editMode, setIsEditMode] = useState(1);
  const isEditMode = editMode === 1

  const headerActions = (
    <>
      <button
        className={`
          flex items-center justify-center h-8 px-3 rounded-md whitespace-nowrap min-w-fit
          font-medium text-sm cursor-pointer transition-all duration-200 outline-none
          bg-white text-gray-900 shadow-sm
        `}
      >
        Unified
      </button>
      <button
        onClick={() => {
          setIsEditMode(1)
        }}
        className={`
          flex items-center justify-center h-8 px-3 rounded-md whitespace-nowrap min-w-fit
          font-medium text-sm cursor-pointer transition-all duration-200 outline-none
          bg-white text-gray-900 shadow-sm
        `}
      >
        Edit
      </button>
      <ToggleSwitch
        className='hidden'
        options={["Unified", "Split"]}
        defaultSelected={0}
        onChange={(selectedIndex) => {
          setSplitMode(selectedIndex)
        }}
      />
      <ToggleSwitch
        className='hidden'
        options={["Read Only", "Edit"]}
        defaultSelected={0}
        onChange={(option) => {
          setIsEditMode(option);
        }}
      />
    </>
  );

  const onSubmit = (data: Record<string, any>) => {
    if (data['docNo'] !== undefined ) {
      dispatch(actions.setDocNumber({ docNo: data['docNo'] as string }));
    }
    if (data['name'] !== undefined) {
      dispatch(actions.setScopeName({ name: data['name'] as string }));
    }
    if (data['masterStatus'] !== undefined) {
      dispatch(actions.setMasterStatus({ masterStatus: data['masterStatus'] as Status }));
    }
    if (data['content'] !== undefined) {
      dispatch(actions.setContent({ content: data['content'] as string }));
    }
    if (data['provenance'] !== undefined) {
      dispatch(actions.setProvenance({ provenance: data['provenance'] as string }));
    }

    if (data['newTags'] !== undefined) {
      dispatch(actions.addTags({ newTags: data['newTags'] as GlobalTag[] }));
    }

  }

  return (
    <Layout>
      <Form onSubmit={onSubmit} submitChangesOnly defaultValues={{ ...newMomentdocumentState }}>
        {({ triggerSubmit }) => (
          <>
            <LayoutHeader>
              <div>
                <h1 className="text-xl font-semibold">Atlas Explorer - The Support Scope</h1>
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
              <div className="flex items-center gap-4">
                {headerActions}
              </div>
            </LayoutContent>
            <LayoutMain tagText="Official Atlas" variant="gray">
              <div className="flex flex-row justify-between gap-2">
                <div className="flex-1">
                <StringField name="docNo" label="Doc №" placeholder="A." onBlur={triggerSubmit}/>
                </div>

                <div className="flex-1">
                  <StringField name="name" label="Scope" placeholder="The Governance Scope" onBlur={triggerSubmit}/>
                </div>
                <div className="flex-1">
                  <EnumField label="Status" name="masterStatus" onChange={triggerSubmit} options={[
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
                <StringField autoExpand rows={4} multiline name="content" onBlur={triggerSubmit} label="Enter conten" readOnly={!isEditMode} placeholder="Enter content" />                
              </div>

              <div className="flex flex-col gap-4 w-1/2">
                <div className="flex flex-col gap-2 flex-1">
                  <UrlField
                    name="provenance"
                    onBlur={triggerSubmit}
                    label="Provenance"
                    readOnly={!isEditMode}
                    placeholder="Enter provenance" />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <PHIDField
                    readOnly={!isEditMode}
                    fetchOptionsCallback={fetchPHIDOptions}
                    fetchSelectedOptionCallback={fetchSelectedPHIDOption}
                    label="Original Context Data"
                    name="originalContextData"
                    placeholder="phd:"
                    variant="withValueTitleAndDescription"
                    onBlur={triggerSubmit}
                    allowUris={true}
                  />
                </div>
                <div className="flex flex-col gap-2 flex-1">
                  <EnumField
                    disabled={!isEditMode}
                    label="Tags"
                    multiple
                    name="newTags"
                    onChange={triggerSubmit}
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
                </div>
              </div>
            </LayoutMain></>
        )}
      </Form>
    </Layout>
  );
}


