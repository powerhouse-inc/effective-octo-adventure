import { type EditorProps } from "document-model";
import {
  type DriveEditorProps,
  DriveContextProvider,
} from "@powerhousedao/reactor-browser";
import { type DocumentDriveDocument, deleteNode } from "document-drive";
import { WagmiContext } from "@powerhousedao/design-system";
import { useCallback, useState } from "react";

// TODO: enable this after Web Worker implementation
// import { AnalyticsProvider } from "@powerhousedao/reactor-browser/analytics/context";

import { DriverLayout } from "./components/driver-layout.js";
import { getRemoteDriveUrl } from "../shared/utils/utils.js";
import { AnalyticsMenu } from "./components/AnalyticsMenu.js";
import { DateTime } from "@powerhousedao/reactor-browser/analytics";
import { useNodeStatusMap } from "./hooks/index.js";

export type IProps = DriveEditorProps<DocumentDriveDocument>;

export function BaseEditor(props: IProps) {
  const { dispatch } = props;

  const [activeNodeId, setActiveNodeId] = useState<string | undefined>();

  const [logAnalytics, setLogAnalytics] = useState({
    diff: false,
    drive: false,
    diffStatusMap: false,
    driveStatusMap: false,
    nodeStatusMap: false,
  });

  const [startDate, setStartDate] = useState<string | undefined>(
    props.document.created,
  );
  const [endDate, setEndDate] = useState<string | undefined>(
    DateTime.now().endOf("day").toISO(),
  );

  const onDeleteNode = useCallback(
    (nodeId: string) => {
      setActiveNodeId(undefined);
      dispatch(deleteNode({ id: nodeId }));
    },
    [dispatch],
  );

  const nodeStatusMap = useNodeStatusMap(
    startDate,
    endDate,
    props.document.id,
    logAnalytics,
  );

  return (
    <div className="atlas-drive-explorer" style={{ height: "100%" }}>
      <DriverLayout
        context={props.context}
        driveId={props.document.id}
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
      <AnalyticsMenu
        endDate={endDate}
        startDate={startDate}
        onDeleteNode={onDeleteNode}
        logAnalytics={logAnalytics}
        onEndDateChange={setEndDate}
        onStartDateChange={setStartDate}
        onLogAnalyticsChange={setLogAnalytics}
      />
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
