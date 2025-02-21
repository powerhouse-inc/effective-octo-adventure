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
import { EditorLayout } from "./components/EditorLayout";

export type IProps = EditorProps<
  AtlasScopeState,
  AtlasScopeAction,
  AtlasScopeLocalState
>;

export default function Editor(props: IProps) {
  // generate a random id
  // const id = documentModelUtils.hashKey();

  return (
    <EditorLayout>
      <style>
        {`
          #document-editor-context > div.flex:first-child {
            position: absolute;
            right: 0;
            top: 16px;
          }`}
      </style>
      <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-50 mt-12">
        Scope Document
      </h1>

      <div className="flex flex-col gap-4 max-w-3xl mx-auto mt-4">
        <div className="flex flex-wrap gap-4">
          <div className="min-w-[150px] flex-1">
            <SetDocNumberForm
              defaultValue={{ docNo: props.document.state.global.docNo || "" }}
              dispatch={(input: SetDocNumberInput) => {
                props.dispatch(actions.setDocNumber(input));
              }}
            />
          </div>
          <div className="min-w-[150px] flex-1">
            <SetScopeNameForm
              defaultValue={{ name: props.document.state.global.name || "" }}
              dispatch={(input: SetScopeNameInput) => {
                props.dispatch(actions.setScopeName(input));
              }}
            />
          </div>
          <div className="min-w-[150px] flex-1">
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
        </div>
        <SetContentForm
          defaultValue={{
            content: props.document.state.global.content || "",
          }}
          dispatch={(input: SetContentInput) => {
            props.dispatch(actions.setContent(input));
          }}
        />
        <SetTagsForm
          defaultValue={{
            newTags: props.document.state.global.globalTags,
          }}
          dispatch={(input: AddTagsInput) => {
            props.dispatch(actions.addTags(input));
          }}
        />
      </div>
    </EditorLayout>
  );
}
