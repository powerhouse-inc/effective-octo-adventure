/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-max-depth */
import { type EditorProps } from "document-model";
import {
  actions,
  type SetDocNumberInput,
  type SetExploratoryNameInput,
  type SetMasterStatusInput,
  type SetContentInput,
  type AddTagsInput,
  type AtlasExploratoryDocument,
} from "../../document-models/atlas-exploratory/index.js";
import { SetDocNumberForm } from "./components/SetDocNumberForm.js";
import { SetExploratoryNameForm } from "./components/SetExploratoryNameForm.js";
import { SetMasterStatusForm } from "./components/SetMasterStatusForm.js";
import { SetContentForm } from "./components/SetContentForm.js";
import { SetTagsForm } from "./components/SetTagsForm.js";

export type IProps = EditorProps<AtlasExploratoryDocument>;

export default function Editor(props: IProps) {
  return (
    <>
      <h1 className="atlas-header">Exploratory Document</h1>
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
          <SetExploratoryNameForm
            defaultValue={{ name: props.document.state.global.name || "" }}
            dispatch={(input: SetExploratoryNameInput) => {
              props.dispatch(actions.setExploratoryName(input));
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
              newTags: props.document.state.global.globalTags,
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
