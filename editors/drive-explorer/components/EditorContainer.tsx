import {
  useDriveContext,
  exportDocument,
  type User,
} from "@powerhousedao/reactor-browser";
import {
  DocumentModelModule,
  EditorContext,
  EditorProps,
  PHDocument,
} from "document-model";
import {
  DocumentToolbar,
  RevisionHistory,
  DefaultEditorLoader,
} from "@powerhousedao/design-system";
import { useState, Suspense, FC, useCallback } from "react";

import {
  AtlasExploratory,
  AtlasFoundation,
  AtlasGrounding,
  AtlasMultiParent,
  AtlasScope,
} from "../../../document-models";
import {
  AtlasExploratoryEditor,
  AtlasFoundationEditor,
  AtlasGroundingEditor,
  AtlasMultiParentEditor,
  AtlasScopeEditor,
} from "../../index";

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
};

const documentEditorMap = {
  [AtlasExploratory.documentModel.id]: AtlasExploratoryEditor,
  [AtlasFoundation.documentModel.id]: AtlasFoundationEditor,
  [AtlasGrounding.documentModel.id]: AtlasGroundingEditor,
  [AtlasMultiParent.documentModel.id]: AtlasMultiParentEditor,
  [AtlasScope.documentModel.id]: AtlasScopeEditor,
};

function getDocumentModel(documentType: string) {
  return documentModelsMap[documentType];
}

function getDocumentEditor(documentType: string) {
  return documentEditorMap[documentType];
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

  if (!document) return null;

  const editor = getDocumentEditor(documentType);
  const EditorComponent = editor.Component as FC<EditorProps<PHDocument>>;

  return (
    <div>
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
        <Suspense fallback={<DefaultEditorLoader />}>
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
    </div>
  );
};
