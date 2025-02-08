/* eslint-disable react/jsx-max-depth */
/* eslint-disable react/jsx-no-bind */
import "../atlas.css";
import { EditorProps } from "document-model/document";
import {
  AtlasScopeState,
  AtlasScopeAction,
  AtlasScopeLocalState,
  actions,
  SetScopeNameInput,
  SetDocNumberInput,
  SetContentInput,
  SetMasterStatusInput,
  AddTagsInput,
} from "../../document-models/atlas-scope";
import { utils as documentModelUtils } from "document-model/document";
import { SetScopeNameForm } from "./components/SetScopeNameForm";
import { SetDocNumberForm } from "./components/SetDocNumberForm";
import { SetContentForm } from "./components/SetContentForm";
import { SetMasterStatusForm } from "./components/SetMasterStatusForm";
import { SetTagsForm } from "./components/SetTagsForm";

export type IProps = EditorProps<
  AtlasScopeState,
  AtlasScopeAction,
  AtlasScopeLocalState
>;

export default function Editor(props: IProps) {
  // generate a random id
  // const id = documentModelUtils.hashKey();

  return (
    <>
      <h1 className="atlas-header">Scope Document</h1>
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
          <SetScopeNameForm
            defaultValue={{ name: props.document.state.global.name || "" }}
            dispatch={(input: SetScopeNameInput) => {
              props.dispatch(actions.setScopeName(input));
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
