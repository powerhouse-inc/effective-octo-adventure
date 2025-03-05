import { EditorProps } from "document-model";

import { EditorLayout } from "./components/editor-layout";

import "../atlas.css";

import { GenericDriveExplorer } from "@powerhousedao/common";
import { DocumentDriveDocument } from "document-drive";

export type IProps = EditorProps<DocumentDriveDocument>;

const GenericDriveEditor = GenericDriveExplorer.Component;

export default function Editor(props: IProps) {
  return (
    <div
      className="atlas-drive-explorer"
      style={{ padding: "0.75rem 0.75rem 0 0.75rem", boxSizing: "content-box" }}
    >
      <EditorLayout driveId={props.document.state.global.id}>
        <style>
          {`
            .atlas-drive-explorer-header {
              margin-bottom: 1em;
            }
            .atlas-drive-explorer > main {
              border: 1px solid #EEEEEE;
            }
            
            .atlas-drive-explorer > main > aside {
              height: calc(100svh - 2.25rem - 18px);
            }
            .atlas-drive-explorer > main > div {
              height: calc(100svh - 2.25rem - 18px);
              overflow-y: auto;
            }
            .d-none {
              display: none;
            }
            #document-editor-context > div.flex:first-child {
              position: absolute;
              right: 0;
              top: 16px;
            }`}
        </style>
        <GenericDriveEditor {...props} />
      </EditorLayout>
    </div>
  );
}
