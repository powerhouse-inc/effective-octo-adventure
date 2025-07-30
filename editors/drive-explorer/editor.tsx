import {
  type DriveEditorProps,
  DriveContextProvider,
} from "@powerhousedao/reactor-browser";
import { type DocumentDriveDocument } from "document-drive";
import { WagmiContext } from "@powerhousedao/design-system";
import packageJson from "../../package.json" with { type: "json" };

// TODO: enable this after Web Worker implementation
// import { AnalyticsProvider } from "@powerhousedao/reactor-browser/analytics/context";

import { DriverLayout } from "./components/driver-layout.js";
import { getRemoteDriveUrl } from "../shared/utils/utils.js";
import { useEffect, useState } from "react";
import { useNodeStatusMap } from "./hooks/useNodeStatusMap.js";

export type IProps = DriveEditorProps<DocumentDriveDocument>;

export function BaseEditor(props: IProps) {
  const [activeNodeId, setActiveNodeId] = useState<string | undefined>();

  useEffect(() => {
    console.log("Atlas version", packageJson.version);
  }, []);

  const [logAnalytics] = useState({
    diff: false,
    drive: false,
    diffStatusMap: false,
    driveStatusMap: false,
    nodeStatusMap: false,
  });

  const nodeStatusMap = useNodeStatusMap(
    undefined,
    undefined,
    props.document.header.id,
    logAnalytics,
  );

  return (
    <div className="atlas-drive-explorer" style={{ height: "100%" }}>
      <DriverLayout
        context={props.context}
        driveId={props.document.header.id}
        nodes={props.document.state.global.nodes}
        driveUrl={getRemoteDriveUrl(props.document)}
        nodeStatusMap={nodeStatusMap}
        activeNodeId={activeNodeId}
        setActiveNodeId={setActiveNodeId}
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
