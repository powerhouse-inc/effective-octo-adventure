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
import { SetScopeNameForm } from "./components/SetScopeNameForm";
import { SetDocNumberForm } from "./components/SetDocNumberForm";
import { SetContentForm } from "./components/SetContentForm";
import { SetMasterStatusForm } from "./components/SetMasterStatusForm";
import { SetTagsForm } from "./components/SetTagsForm";
import {
  getOriginalNotionDocument,
  pndContentToString,
} from "../../document-models/utils";
import { DiffField } from "./components/DiffField";

export type IProps = EditorProps<
  AtlasScopeState,
  AtlasScopeAction,
  AtlasScopeLocalState
>;

export default function Editor(props: IProps) {
  const originalNode = getOriginalNotionDocument(
    props.document.state.global.notionId || "notion-id-not-set",
    "scope",
  );

  return (
    <>
      <h1 className="atlas-header">
        {props.document.state.global.docNo
          ? props.document.state.global.docNo + " - "
          : ""}
        {props.document.state.global.name || "Scope Document"}
      </h1>
      <div className="atlas-grid-double">
        <div className="atlas-cell-notionId">
          <span className="atlas-cell-notionId-label">Notion ID</span>
          <span className="atlas-cell-notionId-value">
            {props.document.state.global.notionId}
          </span>
        </div>
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
        <div className="atlas-cell-docNo-double">
          <DiffField
            original={originalNode.docNo}
            value={props.document.state.global.docNo || ""}
          />
        </div>
        <div className="atlas-cell-name-double">
          <DiffField
            original={originalNode.name}
            value={props.document.state.global.name || ""}
          />
        </div>
        <div className="atlas-cell-masterStatus-double">
          <DiffField
            hideAdditions={!!originalNode.masterStatusNames[0]}
            original={(originalNode.masterStatusNames[0] || "").toUpperCase()}
            value={props.document.state.global.masterStatus || "PLACEHOLDER"}
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
        <div className="atlas-cell-content-double">
          <DiffField
            original={originalNode.content
              .map((c) => pndContentToString(c))
              .join("\n")}
            value={props.document.state.global.content || ""}
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
      <pre style={{ display: "none", margin: "2em 5%" }}>
        {JSON.stringify(originalNode, null, 2)}
      </pre>
    </>
  );
}
