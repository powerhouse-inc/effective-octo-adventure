import {
  useDriveContext,
  exportDocument,
  type User,
} from "@powerhousedao/reactor-browser";
import {
  type DocumentModelModule,
  type EditorContext,
  type EditorProps,
  type PHDocument,
} from "document-model";
import {
  DocumentToolbar,
  RevisionHistory,
  DefaultEditorLoader,
} from "@powerhousedao/design-system";
import { useState, Suspense, type FC, useCallback, lazy } from "react";
import { ViewModeProvider } from "../../shared/context/view-mode-context.js";

import {
  AtlasExploratory,
  AtlasFoundation,
  AtlasGrounding,
  AtlasMultiParent,
  AtlasScope,
  AtlasFeedbackIssues,
  AtlasSet,
} from "../../../document-models/index.js";

export interface EditorContainerProps {
  driveId: string;
  documentId: string;
  documentType: string;
  onClose: () => void;
  title: string;
  context: EditorContext;
}

const documentModelsMap = {
  [AtlasExploratory.documentModel.id]: AtlasExploratory,
  [AtlasFoundation.documentModel.id]: AtlasFoundation,
  [AtlasGrounding.documentModel.id]: AtlasGrounding,
  [AtlasMultiParent.documentModel.id]: AtlasMultiParent,
  [AtlasScope.documentModel.id]: AtlasScope,
  [AtlasFeedbackIssues.documentModel.id]: AtlasFeedbackIssues,
  [AtlasSet.documentModel.id]: AtlasSet,
};

const documentEditorMap2 = {
  [AtlasExploratory.documentModel.id]: lazy(() =>
    import("../../atlas-exploratory-editor/index.js").then((m) => ({
      default: m.default.Component,
    })),
  ),
  [AtlasFoundation.documentModel.id]: lazy(() =>
    import("../../atlas-foundation-editor/index.js").then((m) => ({
      default: m.default.Component,
    })),
  ),
  [AtlasGrounding.documentModel.id]: lazy(() =>
    import("../../atlas-grounding-editor/index.js").then((m) => ({
      default: m.default.Component,
    })),
  ),
  [AtlasMultiParent.documentModel.id]: lazy(() =>
    import("../../atlas-multi-parent-editor/index.js").then((m) => ({
      default: m.default.Component,
    })),
  ),
  [AtlasScope.documentModel.id]: lazy(() =>
    import("../../atlas-scope-editor/index.js").then((m) => ({
      default: m.default.Component,
    })),
  ),
  [AtlasFeedbackIssues.documentModel.id]: lazy(() =>
    import("../../atlas-feedback-issues/index.js").then((m) => ({
      default: m.default.Component,
    })),
  ),
  [AtlasSet.documentModel.id]: lazy(() =>
    import("../../atlas-set-editor/index.js").then((m) => ({
      default: m.default.Component,
    })),
  ),
} as const;

function getDocumentModel(documentType: string) {
  return documentModelsMap[documentType];
}

function getDocumentEditor(documentType: string) {
  return documentEditorMap2[documentType];
}

export const EditorContainer: React.FC<EditorContainerProps> = (props) => {
  const { driveId, documentId, documentType, onClose, title, context } = props;

  const [showRevisionHistory, setShowRevisionHistory] = useState(false);

  const { useDocumentEditorProps } = useDriveContext();
  const user = context.user as User | undefined;

  const documentModelModule = getDocumentModel(
    documentType,
  ) as DocumentModelModule<PHDocument>;

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

  const Editor = getDocumentEditor(documentType);

  if (!Editor) {
    console.error("No editor found for document type:", documentType);
    return (
      <div className="flex-1">
        No editor found for document type: {documentType}
      </div>
    );
  }
  const EditorComponent = Editor as FC<EditorProps<PHDocument>>;

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
          />
          <EditorComponent
            context={context}
            dispatch={dispatch}
            document={document}
            error={error}
          />
        </Suspense>
      )}
    </ViewModeProvider>
  );
};
