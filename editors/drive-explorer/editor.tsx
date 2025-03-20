import { type EditorProps } from "document-model";
import { EditorLayout } from "./components/editor-layout.js";
import { type DocumentDriveDocument } from "document-drive";
import { WagmiContext } from "@powerhousedao/design-system";

export type IProps = EditorProps<DocumentDriveDocument>;

export default function Editor(props: IProps) {
  return (
    <div
      className="atlas-drive-explorer"
      style={{ height: "100%" }}
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
