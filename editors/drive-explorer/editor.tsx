import { type EditorProps } from "document-model";
import {
  type DriveEditorProps,
  DriveContextProvider,
} from "@powerhousedao/reactor-browser";
import { DriverLayout } from "./components/driver-layout.js";
import { type DocumentDriveDocument } from "document-drive";
import { WagmiContext } from "@powerhousedao/design-system";
import { getRemoteDriveUrl } from "../shared/utils/utils.js";

export type IProps = DriveEditorProps<DocumentDriveDocument>;

export function BaseEditor(props: IProps) {
  return (
    <div className="atlas-drive-explorer" style={{ height: "100%" }}>
      <DriverLayout
        context={props.context}
        driveId={props.document.state.global.id}
        nodes={props.document.state.global.nodes}
        driveUrl={getRemoteDriveUrl(props.document)}
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
      </DriverLayout>
    </div>
  );
}

export default function Editor(props: IProps) {
  return (
    <DriveContextProvider value={props.context}>
      <WagmiContext>
        <BaseEditor {...props} />
      </WagmiContext>
    </DriveContextProvider>
  );
}
