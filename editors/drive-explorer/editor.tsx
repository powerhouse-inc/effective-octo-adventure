import { type EditorProps } from "document-model";
import {
  type DriveEditorProps,
  DriveContextProvider,
} from "@powerhousedao/reactor-browser";
import { type DocumentDriveDocument } from "document-drive";
import { WagmiContext } from "@powerhousedao/design-system";
import { useState } from "react";

// TODO: enable this after Web Worker implementation
// import { AnalyticsProvider } from "@powerhousedao/reactor-browser/analytics/context";

import { DriverLayout } from "./components/driver-layout.js";
import { getRemoteDriveUrl } from "../shared/utils/utils.js";
import { AnalyticsMenu } from "./components/AnalyticsMenu.js";
import { DateTime } from "@powerhousedao/reactor-browser/analytics";

export type IProps = DriveEditorProps<DocumentDriveDocument>;

export function BaseEditor(props: IProps) {
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

  return (
    <div className="atlas-drive-explorer" style={{ height: "100%" }}>
      <DriverLayout
        context={props.context}
        driveId={props.document.id}
        nodes={props.document.state.global.nodes}
        driveUrl={getRemoteDriveUrl(props.document)}
        startDate={startDate}
        endDate={endDate}
        logAnalytics={logAnalytics}
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
        startDate={startDate}
        endDate={endDate}
        onEndDateChange={setEndDate}
        onStartDateChange={setStartDate}
        logAnalytics={logAnalytics}
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
