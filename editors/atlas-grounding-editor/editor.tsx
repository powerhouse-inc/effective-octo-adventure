import "../atlas.css";
import { EditorProps } from "document-model/document";
import {
  AtlasGroundingState,
  AtlasGroundingAction,
  AtlasGroundingLocalState,
  actions,
  SetDocNumberInput,
} from "../../document-models/atlas-grounding";
import { utils as documentModelUtils } from "document-model/document";
import { SetDocNumberForm } from "./components/SetDocNumberForm";

export type IProps = EditorProps<
  AtlasGroundingState,
  AtlasGroundingAction,
  AtlasGroundingLocalState
>;

export default function Editor(props: IProps) {
  // generate a random id
  // const id = documentModelUtils.hashKey();

  return (
    <>
      <h1 className="atlas-header">Grounding Document</h1>
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
