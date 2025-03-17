import { type EditorProps } from "document-model";
import {
  actions,
  type SetDocNumberInput,
  type SetFoundationNameInput,
  type SetMasterStatusInput,
  type SetContentInput,
  type AddTagsInput,
  type AtlasFoundationDocument,
} from "../../document-models/atlas-foundation/index.js";
import docsIndex from "../../scripts/apply-changes/data/index.json" with { type: "json" };
import { SetDocNumberForm } from "./components/SetDocNumberForm.js";
import { SetFoundationNameForm } from "./components/SetFoundationNameForm.js";
import { SetMasterStatusForm } from "./components/SetMasterStatusForm.js";
import { SetContentForm } from "./components/SetContentForm.js";
import { SetTagsForm } from "./components/SetTagsForm.js";
import {
  Form,
  PHIDField,
  UrlField,
} from "@powerhousedao/design-system/scalars";
import { DiffField } from "../atlas-scope-editor/components/DiffField.js";
import {
  getOriginalNotionDocument,
  pndContentToString,
} from "../../document-models/utils.js";
import { type IconName } from "@powerhousedao/design-system";

export type IProps = EditorProps<AtlasFoundationDocument>;

type IdAutocompleteOption = {
  value: string;
  path: string;
  icon: IconName;
  description: string;
  title: string;
};

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

  const originalNode = getOriginalNotionDocument(
    props.document.state.global.notionId || "notion-id-not-set",
    "article",
  );

  const parentInfo = {
    value: "phd:" + (doc.state.global.parent?.id || ""),
    title: parentTitle,
    path: "sky/atlas-scope",
    icon: "File" as const,
    description: " ",
  };

  const cb = async (phid: string): Promise<IdAutocompleteOption[]> =>
    (docsIndex as IdAutocompleteOption[]).filter(
      (entry) =>
        entry.value.includes(phid) || (entry.title || "").includes(phid),
    );

  const provenance = props.document.state.global.provenance || [];

  return (
    <>
      <h1 className="atlas-header">
        {props.document.state.global.docNo
          ? props.document.state.global.docNo + " - "
          : ""}
        {props.document.state.global.name || "Foundation Document"}
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
        <div className="atlas-cell-parent">
          <Form
            onSubmit={function (data: any): void | Promise<void> {
              throw new Error("Function not implemented.");
            }}
          >
            <PHIDField
              defaultValue={parentInfo.value}
              /* @ts-expect-error */
              fetchOptionsCallback={cb}
              /* @ts-expect-error */
              fetchSelectedOptionCallback={(x) => cb(x).then((x) => x[0])}
              /* @ts-expect-error */
              initialOptions={[parentInfo]}
              label="Parent Document:"
              name="parentId"
              placeholder="phd:"
              variant="withValueTitleAndDescription"
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
          {provenance.map((provenanceUrl) => (
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
      <pre style={{ display: "none", margin: "2em 5%" }}>
        {JSON.stringify(props.document.state, null, 2)}
      </pre>
      <style>{`
      .atlas-header {
  margin: 1em 5%;
  font-size: xx-large;
  border-bottom: 4px solid #efefef;
}

.atlas-grid {
  display: grid;
  grid-template-columns: repeat(8, 1fr);
  gap: 1em;
  margin: 2em 5%;
}

.atlas-grid-double {
  display: grid;
  grid-template-columns: repeat(16, 1fr);
  gap: 0.5em;
  margin: 2em 5%;
}

.atlas-cell-docNo {
  grid-column: 1/2;
  min-width: 5em;
}

.atlas-cell-docNo-double {
  margin-top: 35px;
  grid-column: 9/10;
  min-width: 5em;
}

.atlas-cell-name {
  grid-column: 2/7;
}

.atlas-cell-parent {
  grid-column: 1/9;
}

.atlas-cell-provenance {
  grid-column: 1/9;
}

.atlas-cell-name-double {
  margin-top: 35px;
  grid-column: 10/15;
  min-width: 5em;
}

.atlas-cell-masterStatus {
  grid-column: 7/9;
  min-width: 10em;
}

.atlas-cell-masterStatus-double {
  grid-column: 15/17;
  min-width: 10em;
  margin-top: 35px;
  text-transform: uppercase;
}

.diff-field {
  padding: 8px 12px;
  font-size: 14px;
  border: 1px solid rgba(216, 217, 218, 0.5);
  border-radius: 6px;
  height: 100%;
  overflow: hidden;
  white-space-collapse: preserve;
}

.diff-add {
  padding: 0 0.2em;
  margin: 0 0.1em;
  background-color: rgb(190, 254, 190);
  color: darkgreen;
  border-radius: 4px;
}

.diff-del {
  padding: 0 0.2em;
  margin: 0 0.1em;
  background-color: rgb(255, 208, 216);
  color: darkred;
  border-radius: 4px;
}

.diff-strike {
  text-decoration: line-through;
  color: rgba(139, 0, 0, 0.3);
}

.atlas-cell-content {
  grid-column: 1/9;
}

.atlas-cell-content-double {
  grid-column: 9/17;
}

.atlas-cell-tags {
  grid-column: 1/9;
}

.atlas-cell-notionId {
  text-align: right;
  grid-column: 1/9;
  font-size: smaller;
  margin-bottom: 2em;
}

.atlas-grid-double .atlas-cell-notionId {
  grid-column: 1/17;
}

.atlas-cell-notionId-label {
  padding: 4px 0.3em 4px 0.5em;
  margin: 0;
  background-color: #f1f1f1;
  border-radius: 6px 0 0 6px;
  border: 1px solid #dddddd;
  font-weight: bold;
  user-select: none;
}

.atlas-cell-notionId-value {
  padding: 4px 0.5em 4px 0.3em;
  margin: 0;
  background-color: #f1f1f1;
  border-radius: 0 6px 6px 0;
  border: 1px solid #dddddd;
  border-left: none;
  user-select: all;
  text-transform: uppercase;
}

.flex-examples {
  margin-top: 5em;
  display: flex; /* flex */

  background-color: aqua;
  border: 0.5em solid turquoise;
  flex-direction: column;
  justify-content: space-between;
  height: 200px;
}

.flex-group-1 {
  display: flex;
  justify-content: flex-start;
  flex-wrap: wrap;
  gap: 1em;
}

.flex-group-2 {
  display: flex;
  justify-content: space-evenly;
  gap: 1em;
}

.flex-group-3 {
  display: flex;
  justify-content: flex-end;
  gap: 1em;
}

.flex-item {
  background-color: chocolate;
  padding: 1em;
  display: block;
  border: 1px solid brown;
  min-width: 3em;
}

.flex-group-1 .flex-item {
  flex-grow: 1;
}

.flex-group-1 .flex-item-C {
  flex-grow: 3;
}

.grid-examples {
  margin-top: 5em;
  display: grid; /* grid; */

  background-color: rgb(140, 0, 255);
  border: 0.5em solid purple;

  grid-template-columns: 1fr 2fr 2fr 1fr;
  gap: 1em;
  padding: 1em;
}

.grid-item {
  background-color: violet;
  padding: 1em;
  display: block;
  border: 1px solid indigo;
  min-width: 3em;
}

.grid-item-A {
  grid-column: 1/3;
  grid-row: 1/3;
}

.grid-item-B {
  grid-row: 1/3;
}

.shadow-lg {
  box-shadow:
    0 10px 15px -3px rgb(0 0 0 / 0.1),
    0 4px 6px -4px rgb(0 0 0 / 0.1);
}

      `}</style>
    </>
  );
}
