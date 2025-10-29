import {
  exportDocument,
} from "@powerhousedao/reactor-browser";
import {
  type EditorModule,
  type DocumentModelModule,
  type PHDocument,
} from "document-model";
import {
  DocumentToolbar,
  RevisionHistory,
  DefaultEditorLoader,
} from "@powerhousedao/design-system";
import { useState, Suspense, useCallback } from "react";
import { type Operation } from "document-model";

export interface EditorContainerProps {
  driveId: string;
  documentId: string;
  documentType: string;
  onClose: () => void;
  title: string;
  context: any; // TODO: Update when context types are available
  documentModelModule: DocumentModelModule<any>;
  editorModule: EditorModule;
}

export const EditorContainer: React.FC<EditorContainerProps> = (props) => {
  const {
    driveId,
    documentId,
    documentType,
    onClose,
    title,
    context,
    documentModelModule,
    editorModule,
  } = props;

  const [showRevisionHistory, setShowRevisionHistory] = useState(false);
  const [selectedTimelineItem, setSelectedTimelineItem] =
    useState<any | null>(null);

  const user = context.user;

  // TODO: enable this after Web Worker implementation
  // const timelineItems = useTimelineItems(documentId);

  // TODO: remove this after Web Worker implementation
  const timelineItems = {
    data: [],
  };

  // TODO: Replace with proper hook when available
  const dispatch = () => {};
  const error = null;
  const document = null;

  const onExport = useCallback(async () => {
    if (document) {
      await exportDocument(document);
    }
  }, [document]);

  const loadingContent = (
    <div className="flex h-full flex-1 items-center justify-center">
      <DefaultEditorLoader />
    </div>
  );

  if (!document) return loadingContent;

  const moduleWithComponent = editorModule as EditorModule<any>;
  const EditorComponent = moduleWithComponent.Component;

  const getRevisionFromDate = (
    startDate: Date | undefined,
    endDate: Date | undefined,
    operations: Operation[],
  ): number => {
    if (!startDate || !endDate) return operations.length > 0 ? operations[0].index : 0;
    const startTimestamp = startDate.getTime();
    const endTimestamp = endDate.getTime();
    for (let i = operations.length - 1; i >= 0; i--) {
      const opTimestamp = new Date(operations[i].timestampUtcMs).getTime();
      if (opTimestamp >= startTimestamp && opTimestamp <= endTimestamp) {
        return operations[i].index;
      }
    }
    return operations.length > 0 ? operations[0].index : 0;
  };

  // TODO: Re-enable when proper hooks are available
  return (
    <div className="flex h-full flex-1 items-center justify-center">
      <div className="text-center">
        <h2 className="text-lg font-medium mb-2">Drive Explorer</h2>
        <p className="text-sm text-gray-600">
          This editor is temporarily disabled pending API updates.
        </p>
      </div>
    </div>
  );

  // Original implementation - re-enable when APIs are available:
  // return showRevisionHistory ? (
  //   <RevisionHistory
  //     documentId={documentId}
  //     documentTitle={title}
  //     globalOperations={document?.operations.global || []}
  //     key={documentId}
  //     localOperations={document?.operations.local || []}
  //     onClose={() => setShowRevisionHistory(false)}
  //   />
  // ) : (
  //   <Suspense fallback={loadingContent}>
  //     <DocumentToolbar
  //       onClose={onClose}
  //       onExport={onExport}
  //       title={title}
  //     />
  //     <EditorComponent
  //       context={{
  //         ...context,
  //         readMode: !!selectedTimelineItem,
  //         selectedTimelineRevision: document ? getRevisionFromDate(
  //           selectedTimelineItem?.startDate,
  //           selectedTimelineItem?.endDate,
  //           document.operations.global,
  //         ) : 0,
  //       }}
  //       dispatch={dispatch}
  //       document={document}
  //       error={error}
  //     />
  //   </Suspense>
  // );
};
