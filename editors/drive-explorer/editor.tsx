import { type EditorProps } from "document-model";
import {
  type DriveEditorProps,
  DriveContextProvider,
} from "@powerhousedao/reactor-browser";
import { type DocumentDriveDocument } from "document-drive";
import { WagmiContext } from "@powerhousedao/design-system";

// TODO: enable this after Web Worker implementation
// import { AnalyticsProvider } from "@powerhousedao/reactor-browser/analytics/context";

import { DriverLayout } from "./components/driver-layout.js";
import { getRemoteDriveUrl } from "../shared/utils/utils.js";

export type IProps = DriveEditorProps<DocumentDriveDocument>;

export function BaseEditor(props: IProps) {
  return (
    <div className="atlas-drive-explorer" style={{ height: "100%" }}>
      <DriverLayout
        context={props.context}
        driveId={props.document.id}
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

// TODO: enable this after Web Worker implementation
// export default function Editor(props: IProps) {
//   return (
//     <DriveContextProvider value={props.context}>
//       <WagmiContext>
//         <AnalyticsProvider databaseName={props.context.analyticsDatabaseName}>
//           <BaseEditor {...props} />
//         </AnalyticsProvider>
//       </WagmiContext>
//     </DriveContextProvider>
//   );
// }

// TODO: remove this after Web Worker implementation
export default function Editor(props: IProps) {
  return (
    <DriveContextProvider value={props.context}>
      <WagmiContext>
        <BaseEditor {...props} />
      </WagmiContext>
    </DriveContextProvider>
  );
}
