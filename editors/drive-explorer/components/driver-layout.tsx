import {
  Icon,
  FileItem,
  type BaseUiFileNode,
  ToastContainer,
  CreateDocumentModal,
} from "@powerhousedao/design-system";
import {
  type NodeStatus,
  Sidebar,
  SidebarProvider,
  type SidebarNode,
} from "@powerhousedao/document-engineering/ui";
import { useCallback, useState, useRef, useMemo } from "react";
import {
  useDriveContext,
  type DriveEditorContext,
} from "@powerhousedao/reactor-browser";
import { type AtlasFeedbackIssue, type AtlasArticle } from "./types.js";
import { EditorContainer } from "./EditorContainer.js";
import { type DocumentModelModule } from "document-model";
import { CreateDocument } from "./create-document.js";
import { Home } from "./home.js";
import { documentModel as AtlasFeedbackIssues } from "../../../document-models/atlas-feedback-issues/gen/document-model.js";
import type { GetDocumentOptions, Node } from "document-drive";
import { ShareDrive } from "../../shared/components/share-drive.js";
import { buildSidebarTree } from "../sidebar-utils.js";
import { BaseDocumentCacheProvider } from "../../shared/providers/BaseDocumentCacheProvider.js";
import { ViewModeProvider } from "../../shared/providers/ViewModeProvider.js";
import { useSidebarWidth } from "../hooks/useSidebarWidth.js";

export interface DriverLayoutProps {
  readonly driveId: string;
  readonly children: React.ReactNode;
  readonly context: DriveEditorContext;
  readonly nodes: Node[];
  readonly driveUrl?: string | null;
  readonly nodeStatusMap?: Record<string, NodeStatus>;
  readonly activeNodeId?: string;
  readonly setActiveNodeId: (nodeId: string | undefined) => void;
}

export function DriverLayout({
  children,
  driveId,
  context,
  nodes: driveNodes,
  driveUrl,
  nodeStatusMap = {},
  activeNodeId,
  setActiveNodeId,
}: DriverLayoutProps) {
  const { getDocumentRevision } = context;
  const { useDriveDocumentStates, addDocument, documentModels } =
    useDriveContext();
  const [openModal, setOpenModal] = useState(false);
  const selectedDocumentModel = useRef<DocumentModelModule | null>(null);

  const { sidebarWidth, maxWidth } = useSidebarWidth(300);

  const [state] = useDriveDocumentStates({ driveId });
  const { atlasNodes, feedbackIssues } = useMemo(() => {
    return Object.keys(state).reduce(
      (acc, curr) => {
        const document = state[curr];
        if (document.documentType.startsWith("sky/atlas")) {
          acc.atlasNodes[curr] = document as unknown as AtlasArticle;
        } else if (document.documentType === AtlasFeedbackIssues.id) {
          acc.feedbackIssues[curr] = document as unknown as AtlasFeedbackIssue;
        }
        return acc;
      },
      {
        atlasNodes: {} as Record<string, AtlasArticle>,
        feedbackIssues: {} as Record<string, AtlasFeedbackIssue>,
      },
    );
  }, [state]);

  const nodes = useMemo(() => {
    return buildSidebarTree(atlasNodes, nodeStatusMap);
  }, [atlasNodes, nodeStatusMap]);

  const selectedNode = activeNodeId
    ? (state[activeNodeId] as AtlasArticle | AtlasFeedbackIssue) // TODO: atlas set doesn't have a docNo
    : null;

  // create drive-level title for the active document
  const title = useMemo(() => {
    if (!selectedNode) {
      return "Welcome to the Atlas Explorer";
    }
    if (selectedNode.documentType === "sky/atlas-set") {
      return (selectedNode as AtlasArticle).global.name;
    }

    if ("docNo" in selectedNode.global) {
      return `${selectedNode.global.docNo} - ${selectedNode.global.name}`;
    }

    if (selectedNode.documentType === "sky/atlas-multiparent") {
      return (selectedNode as AtlasArticle).global.name;
    }

    return "Atlas Feedback Issues";
  }, [selectedNode]);

  const onActiveNodeChange = useCallback(
    (node: SidebarNode) => {
      setActiveNodeId(node.id);
    },
    [setActiveNodeId],
  );

  const onEditorClose = useCallback(() => {
    setActiveNodeId(undefined);
  }, [setActiveNodeId]);

  const onCreateDocument = useCallback(
    async (fileName: string) => {
      setOpenModal(false);

      const documentModel = selectedDocumentModel.current;
      if (!documentModel) return;

      const node = await addDocument(
        driveId,
        fileName,
        documentModel.documentModel.id,
      );

      selectedDocumentModel.current = null;
      setActiveNodeId(node.id);
    },
    [addDocument, driveId, setActiveNodeId],
  );

  const onSelectDocumentModel = (documentModel: DocumentModelModule) => {
    selectedDocumentModel.current = documentModel;
    setOpenModal(true);
  };

  const onGetDocumentRevision = useCallback(
    (options?: GetDocumentOptions) => {
      if (!activeNodeId) return;
      return getDocumentRevision?.(activeNodeId, options);
    },
    [getDocumentRevision, activeNodeId],
  );

  const filteredDocumentModels = documentModels.filter(
    (docModel) => docModel.documentModel.id !== "powerhouse/document-model",
  );

  const documentModelModule = activeNodeId
    ? context.getDocumentModelModule(state[activeNodeId].documentType)
    : null;

  const editorModule = activeNodeId
    ? context.getEditor(state[activeNodeId].documentType)
    : null;

  return (
    <BaseDocumentCacheProvider>
      <ViewModeProvider>
        <SidebarProvider>
          <ToastContainer position="bottom-right"></ToastContainer>
          <main className="flex overflow-hidden h-full">
            <Sidebar
              activeNodeId={activeNodeId}
              enableMacros={4}
              nodes={nodes}
              onActiveNodeChange={onActiveNodeChange}
              showStatusFilter
              sidebarIcon={
                <div className="flex items-center justify-center rounded-md bg-gray-900 p-2">
                  <Icon className="text-gray-50" name="M" size={16} />
                </div>
              }
              sidebarTitle="Atlas"
              initialWidth={sidebarWidth}
              maxWidth={maxWidth}
            />
            <div className="flex-1 bg-gray-50 p-4 dark:bg-slate-800 overflow-y-auto">
              <>
                {activeNodeId && documentModelModule && editorModule ? (
                  <EditorContainer
                    context={{
                      ...context,
                      getDocumentRevision: onGetDocumentRevision,
                    }}
                    documentId={activeNodeId}
                    documentType={state[activeNodeId].documentType}
                    driveId={driveId}
                    key={activeNodeId}
                    onClose={onEditorClose}
                    title={title}
                    documentModelModule={documentModelModule}
                    editorModule={editorModule}
                  />
                ) : (
                  <>
                    <div className="flex items-center justify-between mt-1 mb-4 px-1">
                      <h1 className="text-lg text-gray-900 font-medium dark:text-gray-50">
                        {title}
                      </h1>
                      {driveUrl && <ShareDrive driveUrl={driveUrl} />}
                    </div>
                    <Home>
                      {Object.entries(feedbackIssues).length > 0 && (
                        <div className="my-4 px-6">
                          <h2 className="mb-3 mt-4 text-sm font-bold text-gray-600">
                            Feedback Issues
                          </h2>
                          <div className="flex flex-wrap gap-4">
                            {Object.entries(feedbackIssues).map(
                              ([id, issue]) => (
                                <FileItem
                                  key={id}
                                  uiNode={{
                                    kind: "FILE",
                                    id,
                                    name:
                                      driveNodes.find((node) => node.id === id)
                                        ?.name || "",
                                    documentType: issue.documentType,
                                    parentFolder: "",
                                    driveId,
                                    syncStatus: undefined,
                                  }}
                                  onSelectNode={(node) =>
                                    setActiveNodeId(node.id)
                                  }
                                  isAllowedToCreateDocuments={false}
                                  onRenameNode={function (
                                    name: string,
                                    uiNode: BaseUiFileNode,
                                  ): void {
                                    throw new Error(
                                      "Function not implemented.",
                                    );
                                  }}
                                  onDuplicateNode={function (
                                    uiNode: BaseUiFileNode,
                                  ): void {
                                    throw new Error(
                                      "Function not implemented.",
                                    );
                                  }}
                                  onDeleteNode={function (
                                    uiNode: BaseUiFileNode,
                                  ): void {
                                    throw new Error(
                                      "Function not implemented.",
                                    );
                                  }}
                                />
                              ),
                            )}
                          </div>
                        </div>
                      )}
                      <CreateDocument
                        /* @ts-expect-error */
                        createDocument={onSelectDocumentModel}
                        documentModels={filteredDocumentModels}
                      />
                    </Home>
                  </>
                )}
                {children}
                <CreateDocumentModal
                  onContinue={onCreateDocument}
                  onOpenChange={(open) => setOpenModal(open)}
                  open={openModal}
                />
              </>
            </div>
          </main>
        </SidebarProvider>
      </ViewModeProvider>
    </BaseDocumentCacheProvider>
  );
}
