import {
  useDriveContext,
  exportDocument,
  type User,
  type DriveEditorContext,
} from "@powerhousedao/reactor-browser";
import {
  type EditorModule,
  type DocumentModelModule,
  type EditorContext,
  type PHDocument,
} from "document-model";
import {
  DocumentToolbar,
  RevisionHistory,
  DefaultEditorLoader,
  type TimelineItem,
} from "@powerhousedao/design-system";
import { useState, Suspense, useCallback } from "react";
import { getRevisionFromDate, useTimelineItems } from "@powerhousedao/common";

import { ViewModeProvider } from "../../shared/providers/ViewModeProvider.js";

export interface EditorContainerProps {
  driveId: string;
  documentId: string;
  documentType: string;
  onClose: () => void;
  title: string;
  context: Omit<DriveEditorContext, "getDocumentRevision"> &
    Pick<EditorContext, "getDocumentRevision">;
  documentModelModule: DocumentModelModule<PHDocument>;
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
    useState<TimelineItem | null>(null);

  const { useDocumentEditorProps } = useDriveContext();
  const user = context.user as User | undefined;

  // TODO: enable this after Web Worker implementation
  // const timelineItems = useTimelineItems(documentId);

  // TODO: remove this after Web Worker implementation
  const timelineItems = {
    data: [],
  };

  const { dispatch, error, document } = useDocumentEditorProps({
    documentId,
    documentType,
    driveId,
    documentModelModule,
    user,
  });

  const onExport = useCallback(async () => {
    if (document) {
      const ext = documentModelModule.documentModel.extension;
      await exportDocument(document, title, ext);
    }
  }, [document?.revision.global, document?.revision.local]);

  const loadingContent = (
    <div className="flex-1 flex justify-center items-center h-full">
      <DefaultEditorLoader />
    </div>
  );

  if (!document) return loadingContent;

  const moduleWithComponent = editorModule as EditorModule<PHDocument>;
  const EditorComponent = moduleWithComponent.Component;

  return (
    <ViewModeProvider>
      {showRevisionHistory ? (
        <RevisionHistory
          documentId={documentId}
          documentTitle={title}
          globalOperations={document.operations.global}
          key={documentId}
          localOperations={document.operations.local}
          onClose={() => setShowRevisionHistory(false)}
        />
      ) : (
        <Suspense fallback={loadingContent}>
          <DocumentToolbar
            onClose={onClose}
            onExport={onExport}
            onShowRevisionHistory={() => setShowRevisionHistory(true)}
            onSwitchboardLinkClick={() => {}}
            title={title}
            timelineItems={timelineItems.data}
            onTimelineItemClick={setSelectedTimelineItem}
            timelineButtonVisible={moduleWithComponent.config.timelineEnabled}
          />
          <EditorComponent
            context={{
              ...context,
              readMode: !!selectedTimelineItem,
              selectedTimelineRevision: getRevisionFromDate(
                selectedTimelineItem?.startDate,
                selectedTimelineItem?.endDate,
                document.operations.global,
              ),
            }}
            dispatch={dispatch}
            document={document}
            error={error}
          />
        </Suspense>
      )}
    </ViewModeProvider>
  );
};
