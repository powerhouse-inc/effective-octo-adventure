/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-max-depth */
import "../atlas.css";
import { EditorProps } from "document-model";
import {
  actions,
  SetDocNumberInput,
  SetMultiparentNameInput,
  SetMasterStatusInput,
  SetContentInput,
  AddTagsInput,
  AtlasMultiParentDocument,
} from "../../document-models/atlas-multi-parent";
import { SetDocNumberForm } from "./components/SetDocNumberForm";
import { SetMultiParentNameForm } from "./components/SetMultiParentNameForm";
import { SetMasterStatusForm } from "./components/SetMasterStatusForm";
import { SetContentForm } from "./components/SetContentForm";
import { SetTagsForm } from "./components/SetTagsForm";
import { EditorProps } from "document-model";

export type IProps = EditorProps<AtlasMultiParentDocument>;

export default function Editor(props: IProps) {
  return (
    <>
      <h1 className="atlas-header">MultiParent Document</h1>
      <div className="atlas-grid">
        <div className="atlas-cell-docNo">
          <SetDocNumberForm
            defaultValue={{ docNo: props.document.state.global.docNo || "" }}
            dispatch={(input: SetDocNumberInput) => {
              props.dispatch(actions.setDocNumber(input));
            }}
          />
        </div>
        <div className="atlas-cell-name">
          <SetMultiParentNameForm
            defaultValue={{ name: props.document.state.global.name || "" }}
            dispatch={(input: SetMultiparentNameInput) => {
              props.dispatch(actions.setMultiparentName(input));
            }}
          />
        </div>
        <div className="atlas-cell-masterStatus">
          <SetMasterStatusForm
            defaultValue={{
              masterStatus:
                props.document.state.global.masterStatus || "PLACEHOLDER",
            }}
            dispatch={(input: SetMasterStatusInput) => {
              props.dispatch(actions.setMasterStatus(input));
            }}
          />
        </div>
        <div className="atlas-cell-content">
          <SetContentForm
            defaultValue={{
              content: props.document.state.global.content || "",
            }}
            dispatch={(input: SetContentInput) => {
              props.dispatch(actions.setContent(input));
            }}
          />
        </div>
        <div className="atlas-cell-tags">
          <SetTagsForm
            defaultValue={{
              tags: props.document.state.global.globalTags,
            }}
            dispatch={(input: AddTagsInput) => {
              props.dispatch(actions.addTags(input));
            }}
          />
        </div>
      </div>
    </>
  );
}
