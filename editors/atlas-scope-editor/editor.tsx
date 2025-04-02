import React, { useState } from 'react';
import { Dropdown, DropdownContent, DropdownItem, DropdownTrigger, EnumField, Form, PHIDField, SelectField, UrlField, StringField } from "@powerhousedao/design-system/scalars"

import { type EditorProps } from "document-model";
import {
  actions,
  GlobalTag,
  Status,
  type AtlasScopeDocument,
} from "../../document-models/atlas-scope/index.js";
import { Icon } from '@powerhousedao/design-system';
import ToggleSwitch from '../share/components/toggle-switch.js';
import { getOriginalNotionDocument } from "../../document-models/utils.js";
import { SetDocNumberForm } from './components/SetDocNumberForm.js';
import { SetMasterStatusForm } from './components/SetMasterStatusForm.js';
import { SetScopeNameForm } from './components/SetScopeNameForm.js';
import { SetTagsForm } from './components/SetTagsForm.js';
import { SetContentForm } from './components/SetContentForm.js';
import { SetProvenanceFrom } from './components/SetProvenanceFrom.js';
import { SetOriginalContextDataForm } from './components/SetOriginalContextData.js';
import ContentCard from '../share/components/content-card.js';



export type IProps = EditorProps<AtlasScopeDocument>;
export default function Editor(props: IProps) {
  const [splitMode, setSplitMode] = useState(0);
  const [editMode, setIsEditMode] = useState(0)

  const isEditMode = editMode === 1
  const { document, dispatch } = props;
  const {
    state: { global: state },
  } = document;
  // TOOD: Remove this when the data is ready
  const stateGlobal = {
    "name": "Atlas Explorer - The Support Scope",
    "docNo": "A.4",
    "content": "USDS is the Stablecoin product of the Sky Protocol. It is designed to remain stable against USD, and its supply is regulated through the Peg Stability Module and the Allocation System, as governed by the Stability Scope.",
    "masterStatus": ["PROVISIONAL"],
    "newTags": ["DAO_TOOLKIT", "CAIS"],
    "originalContextData": ["phd://infra.powerhouse.io/baefc2a4-f9a0-4950-8161-fd8d8ca9eff6", "phd://product.powerhouse.io/baefc2a4-f9a0-4950-8161-fd8d8cb0bff4"],
    "provenance": "https://notion.so/p0hub....",
    "notionId": "693d4371c8424ea44974be425cf89aad",
    "scope": "The Governance Scope"
  }

  // function to get the values
  const originalNode = getOriginalNotionDocument(
    props.document.state.global.notionId || "1b3f2ff0-8d73-80e6-86b0-c28bf9a97896",
    "scope",
  );



  return (
    <div className="min-h-screen bg-white flex flex-col  rounded-2xl p-6 gap-4">
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

                options={["Unified", "Split"]} defaultSelected={0} onChange={(selectedIndex) => {

                  setSplitMode(selectedIndex)
                }} />
      
            
              <ToggleSwitch
                className='hidden'
                options={["Read Only", "Edit"]} defaultSelected={0} onChange={(option) => {
                  setIsEditMode(option);
                }} />
            
          </div>
        </div>
      </div>

      <ContentCard tagText="Official Atlas" variant="gray" className='mt-4'>
        <div className="flex flex-row justify-between gap-2">
          <div className="flex-1">
            <SetDocNumberForm defaultValue={{ docNo: stateGlobal.docNo }}
              dispatch={(input) => props.dispatch(actions.setDocNumber(input))}
              isEditing={isEditMode}
              name="docNo"
              placeholder="A."
              label="Doc no"
            />
          </div>

          <div className="flex-1">
            <SetScopeNameForm defaultValue={{ name: stateGlobal.name }}
              dispatch={(input) => props.dispatch(actions.setScopeName(input))}
              isEditing={isEditMode}
              name="name"
              placeholder="The Governance Scope"
              label="Scope"
            />
          </div>
          <div className="flex-1">
            <SetMasterStatusForm defaultValue={{ masterStatus: stateGlobal.masterStatus[0] as Status }}
              dispatch={(input) => props.dispatch(actions.setMasterStatus(input))}
              isEditing={isEditMode}
            />
          </div>

        </div>
        <div className="flex-1">
          <SetContentForm
            defaultValue={{ content: stateGlobal.content }}
            dispatch={(input) => props.dispatch(actions.setContent(input))}
            isEditing={isEditMode}
            name="content"
            label="Content"
            placeholder="Enter content"
          />

        </div>
        <div className="flex flex-col gap-4 w-1/2">
          <div className="flex flex-col gap-2 flex-1">
            <SetProvenanceFrom defaultValue={{ provenance: stateGlobal.provenance }}
              dispatch={(input) => props.dispatch(actions.setProvenance(input))}
              isEditing={isEditMode}
              name="provenance"
              label="Provenance"
              placeholder="Enter provenance"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">

            <SetOriginalContextDataForm
              defaultValue={stateGlobal.originalContextData[0]}
              dispatch={(input) => props.dispatch(actions.addContextData({
                id: input,
                name: "Original Context Data"
              }))}
              isEditing={isEditMode}
              name="originalContextData"
              label="Original Context Data"
              placeholder="Enter original context data"
            />
          </div>
          <div className="flex flex-col gap-2 flex-1">
            <SetTagsForm defaultValue={{ newTags: stateGlobal.newTags as GlobalTag[] }}
              dispatch={(input) => props.dispatch(actions.addTags(input))}
              isEditing={isEditMode}
              name="newTags"
              label="Tags"
              placeholder="Select tags"
            />

          </div>
        </div>
      </ContentCard>
    </div>
  );
}
