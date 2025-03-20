import { type EditorProps } from "document-model";
import { EditorLayout } from "./components/editor-layout.js";
import { type DocumentDriveDocument } from "document-drive";
import { WagmiContext } from "@powerhousedao/design-system";

export type IProps = EditorProps<DocumentDriveDocument>;

export default function Editor(props: IProps) {
  return (
    <div
      className="atlas-drive-explorer"
      style={{ padding: "0.75rem 0.75rem 0 0.75rem", boxSizing: "content-box" }}
    >
      <WagmiContext>
        <EditorLayout
          context={props.context}
          driveId={props.document.state.global.id}
          nodes={props.document.state.global.nodes}
        >
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
        </EditorLayout>
      </WagmiContext>
    </div>
  );
}
