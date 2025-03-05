/* eslint-disable react/jsx-no-bind */
/* eslint-disable react/jsx-max-depth */
import "../atlas.css";
import { EditorProps } from "document-model";
import {
  actions,
  SetDocNumberInput,
  SetFoundationNameInput,
  SetMasterStatusInput,
  SetContentInput,
  AddTagsInput,
  AtlasFoundationDocument,
} from "../../document-models/atlas-foundation";
import docsIndex from "../index.json";
import { SetDocNumberForm } from "./components/SetDocNumberForm";
import { SetFoundationNameForm } from "./components/SetFoundationNameForm";
import { SetMasterStatusForm } from "./components/SetMasterStatusForm";
import { SetContentForm } from "./components/SetContentForm";
import { SetTagsForm } from "./components/SetTagsForm";
import {
  Form,
  PHIDField,
  UrlField,
} from "@powerhousedao/design-system/scalars";
import { PHIDItem } from "node_modules/@powerhousedao/design-system/dist/src/scalars/components/phid-field/types";
import { EditorProps } from "document-model";

export type IProps = EditorProps<AtlasFoundationDocument>;

export default function Editor(props: IProps) {
  // generate a random id
  // const id = documentModelUtils.hashKey();

  const doc = props.document;

  const parentTitle = [
    doc.state.global.parent?.docNo || null,
    doc.state.global.parent?.name || null,
  ]
    .filter((el) => el !== null)
    .join(" - ");

  const parentInfo: PHIDItem = {
    phid: "phd:" + (doc.state.global.parent?.id || ""),
    title: parentTitle,
    path: "sky/atlas-scope",
    icon: "File" as const,
    description: " ",
  };

  // eslint-disable-next-line @typescript-eslint/require-await
  const cb = async (phid: string): Promise<PHIDItem[]> =>
    (docsIndex as PHIDItem[]).filter(
      (entry) =>
        entry.phid.includes(phid) || (entry.title || "").includes(phid),
    );

  return (
    <>
      <h1 className="atlas-header">Foundation Document</h1>
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
          <SetFoundationNameForm
            defaultValue={{ name: props.document.state.global.name || "" }}
            dispatch={(input: SetFoundationNameInput) => {
              props.dispatch(actions.setFoundationName(input));
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
        <div className="atlas-cell-parent">
          <Form
            onSubmit={function (data: any): void | Promise<void> {
              throw new Error("Function not implemented.");
            }}
          >
            <PHIDField
              defaultValue={parentInfo.phid}
              fetchOptionsCallback={cb}
              fetchSelectedOptionCallback={(x) => cb(x).then((x) => x[0])}
              initialOptions={[parentInfo]}
              label="Parent Document:"
              name="parentId"
              placeholder="phd:"
              variant="withIdTitleAndDescription"
            />
          </Form>
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
        <div className="atlas-cell-provenance">
          {props.document.state.global.provenance.map((provenanceUrl) => (
            <Form
              key={provenanceUrl}
              onSubmit={function (data: any): void | Promise<void> {
                throw new Error("Function not implemented.");
              }}
            >
              <UrlField
                defaultValue={provenanceUrl}
                label="Provenance"
                name="provenance"
                platformIcons={{
                  "notion.so": "Globe",
                  "www.notion.so": "Globe",
                }}
              />
            </Form>
          ))}
        </div>
      </div>
      <pre style={{ display: "block", margin: "2em 5%" }}>
        {JSON.stringify(props.document.state, null, 2)}
      </pre>
    </>
  );
}
