import { EditorProps } from "document-model/document";

import { EditorLayout } from "./components/editor-layout";

import "../atlas.css";
import {
  DocumentDriveAction,
  DocumentDriveLocalState,
  DocumentDriveState,
} from "document-model-libs/document-drive";
import { GenericDriveExplorer } from "@powerhousedao/common";

export type IProps = EditorProps<
  DocumentDriveState,
  DocumentDriveAction,
  DocumentDriveLocalState
>;

const GenericDriveEditor = GenericDriveExplorer.Component;

export default function Editor(props: IProps) {
  return (
    <div
      className="atlas-drive-explorer"
      style={{ padding: "0.75rem 0.75rem 0 0.75rem", boxSizing: "content-box" }}
    >
      <EditorLayout>
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
        <h1 className="atlas-drive-explorer-header mt-12 text-2xl font-bold text-gray-900 dark:text-gray-50">
          Altas Drive Explorer
        </h1>
        <GenericDriveEditor {...props} />
      </EditorLayout>
    </div>
  );
}
