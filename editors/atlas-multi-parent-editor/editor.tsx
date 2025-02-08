/* eslint-disable react/jsx-max-depth */
import "../atlas.css";
import { EditorProps } from "document-model/document";
import {
  AtlasMultiParentState,
  AtlasMultiParentAction,
  AtlasMultiParentLocalState,
  actions,
  SetDocNumberInput,
} from "../../document-models/atlas-multi-parent";
import { utils as documentModelUtils } from "document-model/document";
import { SetDocNumberForm } from "./components/SetDocNumberForm";

export type IProps = EditorProps<
  AtlasMultiParentState,
  AtlasMultiParentAction,
  AtlasMultiParentLocalState
>;

export default function Editor(props: IProps) {
  // generate a random id
  // const id = documentModelUtils.hashKey();

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
      </div>
    </>
  );
}
