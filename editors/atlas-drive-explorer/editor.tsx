 
 
import { type EditorProps } from "document-model";
import {
  actions,
  type SetScopeNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type AddTagsInput,
  type AtlasScopeDocument,
} from "../../document-models/atlas-scope/index.js";
import { SetScopeNameForm } from "./components/SetScopeNameForm.js";
import { SetDocNumberForm } from "./components/SetDocNumberForm.js";
import { SetContentForm } from "./components/SetContentForm.js";
import { SetMasterStatusForm } from "./components/SetMasterStatusForm.js";
import { SetTagsForm } from "./components/SetTagsForm.js";
import { EditorLayout } from "./components/EditorLayout.js";

export type IProps = EditorProps<AtlasScopeDocument>;

export default function Editor(props: IProps) {
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
