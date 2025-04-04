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
import { cb, fetchPHIDOptions, fetchSelectedPHIDOption } from '../shared/utils/utils.js';
import { EditorLayout } from '../shared/components/EditorLayout.js';
import { SplitView } from '../shared/components/SplitView.js';
import { ScopeForm } from './components/ScopeForm.js';

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
    if (data['docNo'] !== undefined) {
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
    if (data['originalContextData'] !== undefined) {
      dispatch(actions.addContextData({ id: data['originalContextData'] as string }));
    }

  }

  return (
    <EditorLayout
    title="Atlas Explorer - The Support Scope"
    notionId={props.document.state.global.notionId}
  >
    {({ isSplitMode, isEditMode }) =>
      isSplitMode ? (
        <SplitView
          left={
            <ScopeForm
              onSubmit={onSubmit}
              documentState={newMomentdocumentState}
              mode={"SplitReadonly"}
            />
          }
          right={
            <ScopeForm
              onSubmit={onSubmit}
              documentState={newMomentdocumentState}
              mode={"SplitEdit"}
            />
          }
        />
      ) : (
        <ScopeForm
          onSubmit={onSubmit}
          documentState={newMomentdocumentState}
          mode={isEditMode ? "UnifiedEdit" : "UnifiedReadonly"}
        />
      )
    }
  </EditorLayout>
  );
}