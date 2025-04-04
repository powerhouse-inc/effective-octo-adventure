import { type EditorProps } from "document-model";
import Layout, { LayoutContent, LayoutHeader, LayoutMain } from "../shared/components/Layout.js";
import ToggleSwitch from "../shared/components/toggle-switch.js";
import { useState } from "react";
import { EnumField, Form, PHIDField, SelectField, StringField, UrlField } from "@powerhousedao/design-system/scalars";
import { cb } from "../shared/utils/utils.js";
import { actions, type AtlasMultiParentDocument, type MGlobalTag, type MStatus, type MAtlasType } from "../../document-models/atlas-multi-parent/index.js";
import { EStatus } from "document-models/atlas-exploratory/index.js";
import { EditorLayout } from "../shared/components/EditorLayout.js";
import { SplitView } from "../shared/components/SplitView.js";
import { MultiParentForm } from "./components/MultiparentForm.js";

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
    if (data['parents'] !== undefined) {
      dispatch(actions.addParent({ id: data['parents'] as string }));
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
  return (
      <EditorLayout
        title="Multi-Parent Document"
        notionId={props.document.state.global.notionId}
      >
        {({ isSplitMode, isEditMode }) =>
          isSplitMode ? (
            <SplitView
              left={
                <MultiParentForm
                  onSubmit={onSubmit}
                  documentState={newMomentdocumentState}
                  mode={"SplitReadonly"}
                />
              }
              right={
                <MultiParentForm
                  onSubmit={onSubmit}
                  documentState={newMomentdocumentState}
                  mode={"SplitEdit"}
                />
              }
            />
          ) : (
            <MultiParentForm
              onSubmit={onSubmit}
              documentState={newMomentdocumentState}
              mode={isEditMode ? "UnifiedEdit" : "UnifiedReadonly"}
            />
          )
        }
      </EditorLayout>
    );
  }
   