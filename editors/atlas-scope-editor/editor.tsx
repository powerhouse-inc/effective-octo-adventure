import React, { useState } from 'react';
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger, EnumField, Form, PHIDField, SelectField, UrlField, StringField } from "@powerhousedao/design-system/scalars"

import { type EditorProps } from "document-model";
import {
  type AtlasScopeDocument,
} from "../../document-models/atlas-scope/index.js";
import { Button, Icon } from '@powerhousedao/design-system';
import ToggleSwitch from './components/ToggleSwitch.js';
import TagsStatus from './components/TagsStatus.js';


export type IProps = EditorProps<AtlasScopeDocument>;
export default function Editor(props: IProps) {

  // TOOD:Remove this when the data is ready
  const stateGlobal = {
    "name": "Atlas Explorer - The Support Scope",
    "docNo": "A.1",
    "content": "USDS is the Stablecoin product of the Sky Protocol. It is designed to remain stable against USD, and its supply is regulated through the Peg Stability Module and the Allocation System, as governed by the Stability Scope.",
    "masterStatus": ["PROVISIONAL"],
    "globalTags": ["DAO_TOOLKIT", "CAIS"],
    "originalContextData": ["https://notion.so/atlas-axis/666f666efff4b34b6895", "https://notion.so/atlas-axis/777g777gfff5c45c7906"],
    "provenance": "https://notion.so/p0hub....",
    "notionId": "693d4371c8424ea44974be425cf89aad"
  }
  const [isEditMode, setIsEditMode] = useState(false)
  // TODO: Implement this in future iterations
  const handleToggleChange = (option: string, index: number) => {}

  
  return (
    <Form onSubmit={() => { }}
      defaultValues={{
        docNo: stateGlobal.docNo,
        scope: stateGlobal.name,
        masterStatus: stateGlobal.masterStatus,
        content: stateGlobal.content,
        provenance: stateGlobal.provenance,
        originalContextData: stateGlobal.originalContextData[0],
        globalTags: stateGlobal.globalTags,
      }}
    >
      <div className="min-h-screen bg-white flex flex-col border-r-2 rounded-2xl p-6 gap-4">
        <header>
          <div className="flex justify-between w-full">
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
          </div>
        </header>

          <div className="">
            <div className="flex items-center justify-between flex-wrap">
              <h2 className="text-gray-700">A.2 / A.2.1 - Governance Process Support</h2>
              <div className="flex items-center gap-4">
                <Dropdown>
                  <DropdownTrigger>
                    Dowload
                  </DropdownTrigger>
                  <DropdownContent>

                    <DropdownItem>
                      <Icon name="DownloadFile" />
                      Download html
                    </DropdownItem>

                  </DropdownContent>
                </Dropdown>
                <div >
                  <ToggleSwitch options={["Split", "Unified"]} defaultSelected={1} onChange={handleToggleChange} />
                </div>
                <div>
                  <Button style={{ backgroundColor: "white", color: "#0084FF", border: "1px solid #99CEFF", fontSize: "14px", lineHeight: "20x", height: 36, width: 50, borderRadius: "8px" }} onClick={() => setIsEditMode(!isEditMode)}>
                    {isEditMode ? "Done" : "Edit"}
                  </Button>
                </div>
              </div>
            </div>
          </div>
        <div className="relative overflow-visible flex flex-col gap-4 w-full border border-gray-200 pt-6 pl-4 pr-4 pb-4 rounded-[6px]">
          <div className="absolute left-4" style={{top: "-12px"}}>
            <TagsStatus />
          </div>
          <div className="flex flex-row justify-between gap-2">
            <div className="flex-1">
              <StringField
                disabled={!isEditMode}
                className="w-full"
                name="docNo"
                label="Doc No"
                defaultValue={stateGlobal.docNo}
              />
            </div>
            <div className="flex-1">
              <StringField
                disabled={!isEditMode}
                className="w-full"
                name="scope"
                label="Scope"
                defaultValue={stateGlobal.name}
              />
            </div>
            <div className="flex-1">
              <SelectField
                disabled={!isEditMode}
                className="w-full"
                name="masterStatus"
                label="Status"
                defaultValue={stateGlobal.masterStatus}
                options={[
                  { label: "PLACEHOLDER", value: "PLACEHOLDER" },
                  { label: "PROVISIONAL", value: "PROVISIONAL" },
                  { label: "APPROVED", value: "APPROVED" },
                  { label: "DEFERRED", value: "DEFERRED" },
                  { label: "ARCHIVED", value: "ARCHIVED" },
                ]}
              />
            </div>

          </div>
          <div className="flex-1">

            <StringField
              rows={4}
              disabled={!isEditMode}
              style={{ height: "76px" }}
              name="content"
              multiline
            />
          </div>
          <div className="flex flex-col gap-4 w-1/2">
            <div className="flex flex-col gap-2 flex-1">
              <UrlField
                disabled={!isEditMode}
                label="Provenance"
                name="provenance"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <UrlField
                disabled={!isEditMode}
                label="Original Context Data"
                name="originalContextData"
              />
            </div>
            <div className="flex flex-col gap-2 flex-1">
              <SelectField
                disabled={!isEditMode}
                label="Tags"
                name="globalTags"
                defaultValue={stateGlobal.globalTags}
                options={[
                  { label: "RECURSIVE_IMPROVEMENT", value: "RECURSIVE_IMPROVEMENT" },
                  { label: "SCOPE_ADVISOR", value: "SCOPE_ADVISOR" },
                  { label: "DAO_TOOLKIT", value: "DAO_TOOLKIT" },
                  { label: "PURPOSE_SYSTEM", value: "PURPOSE_SYSTEM" },
                  { label: "ML_LOW_PRIORITY", value: "ML_LOW_PRIORITY" },
                  { label: "EXTERNAL_REFERENCE", value: "EXTERNAL_REFERENCE" },
                  { label: "ML_DEFER", value: "ML_DEFER" },
                  { label: "SUBDAO_INCUBATION", value: "SUBDAO_INCUBATION" },
                  { label: "V1_MIP", value: "V1_MIP" },
                  { label: "ML_HIGH_PRIORITY", value: "ML_HIGH_PRIORITY" },
                  { label: "ECOSYSTEM_INTELLIGENCE", value: "ECOSYSTEM_INTELLIGENCE" },
                  { label: "LEGACY_TERM__USE_APPROVED", value: "LEGACY_TERM__USE_APPROVED" },
                  { label: "CAIS", value: "CAIS" },
                  { label: "INTERNAL_REFERENCE", value: "INTERNAL_REFERENCE" },
                  { label: "FACILITATORDAO", value: "FACILITATORDAO" },
                  { label: "ML_MED_PRIORITY", value: "ML_MED_PRIORITY" },
                  { label: "AVC", value: "AVC" },
                  { label: "P0_HUB_ENTRY_NEEDED", value: "P0_HUB_ENTRY_NEEDED" },
                  { label: "ANON_WORKFORCE", value: "ANON_WORKFORCE" },
                  { label: "NEWCHAIN", value: "NEWCHAIN" },
                  { label: "ML_SUPPORT_DOCS_NEEDED", value: "ML_SUPPORT_DOCS_NEEDED" },
                  { label: "SUBDAO_REWARDS", value: "SUBDAO_REWARDS" },
                  { label: "TWO_STAGE_BRIDGE", value: "TWO_STAGE_BRIDGE" },
                ]}
              />
            </div>
            <div className="flex-col gap-2 flex-1 hidden">
              <UrlField
                disabled={!isEditMode}
                label="Document Information"
                name="documentInformation"
              />
            </div>
          </div>

        </div>
      </div>
    </Form>


  );
}
