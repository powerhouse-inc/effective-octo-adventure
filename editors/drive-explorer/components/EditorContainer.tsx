import {
  useDriveContext,
  exportDocument,
  type User,
} from "@powerhousedao/reactor-browser";
import { DocumentModelModule, EditorContext, PHDocument } from "document-model";
import {
  DocumentToolbar,
  RevisionHistory,
  DefaultEditorLoader,
} from "@powerhousedao/design-system";
import { useState, Suspense, useCallback, lazy } from "react";

import {
  AtlasExploratory,
  AtlasFoundation,
  AtlasGrounding,
  AtlasMultiParent,
  AtlasScope,
  AtlasFeedbackIssues,
} from "../../../document-models";

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
};

const documentEditorMap = {
  [AtlasExploratory.documentModel.id]: lazy(() =>
    import("../../atlas-exploratory-editor").then((m) => ({
      default: m.default.Component,
    })),
  ),
  [AtlasFoundation.documentModel.id]: lazy(() =>
    import("../../atlas-foundation-editor").then((m) => ({
      default: m.default.Component,
    })),
  ),
  [AtlasGrounding.documentModel.id]: lazy(() =>
    import("../../atlas-grounding-editor").then((m) => ({
      default: m.default.Component,
    })),
  ),
  [AtlasMultiParent.documentModel.id]: lazy(() =>
    import("../../atlas-multi-parent-editor").then((m) => ({
      default: m.default.Component,
    })),
  ),
  [AtlasScope.documentModel.id]: lazy(() =>
    import("../../atlas-scope-editor").then((m) => ({
      default: m.default.Component,
    })),
  ),
  [AtlasFeedbackIssues.documentModel.id]: lazy(() =>
    import("../../atlas-feedback-issues").then((m) => ({
      default: m.default.Component,
    })),
  ),
} as const;

function getDocumentModel(documentType: string) {
  return documentModelsMap[documentType];
}

function getDocumentEditor(documentType: string) {
  return documentEditorMap[documentType];
}

export const EditorContainer: React.FC<EditorContainerProps> =
  function EditorContainer(props) {
    const { driveId, documentId, documentType, onClose, title, context } =
      props;

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

    return showRevisionHistory ? (
      <RevisionHistory
        documentId={documentId}
        documentTitle={title}
        globalOperations={document.operations.global}
        key={documentId}
        localOperations={document.operations.local}
        onClose={function handleRevisionHistoryClose() {
          setShowRevisionHistory(false);
        }}
      />
    ) : (
      <Suspense fallback={loadingContent}>
        <DocumentToolbar
          onClose={onClose}
          onExport={onExport}
          onShowRevisionHistory={function handleRevisionHistory() {
            setShowRevisionHistory(true);
          }}
          title={title}
        />
        <Editor
          context={context}
          dispatch={dispatch}
          document={document}
          error={error}
        />
      </Suspense>
    );
  };
