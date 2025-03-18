 
 
import { type EditorProps } from "document-model";
import {
  actions,
  type SetDocNumberInput,
  type SetMultiparentNameInput,
  type SetMasterStatusInput,
  type SetContentInput,
  type AddTagsInput,
  type AtlasMultiParentDocument,
} from "../../document-models/atlas-multi-parent/index.js";
import { SetDocNumberForm } from "./components/SetDocNumberForm.js";
import { SetMultiParentNameForm } from "./components/SetMultiParentNameForm.js";
import { SetMasterStatusForm } from "./components/SetMasterStatusForm.js";
import { SetContentForm } from "./components/SetContentForm.js";
import { SetTagsForm } from "./components/SetTagsForm.js";

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
