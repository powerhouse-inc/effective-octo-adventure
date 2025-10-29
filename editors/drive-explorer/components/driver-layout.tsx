import {
  Icon,
  FileItem,
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
  useDocumentModelModules,
  addDocument,
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
  readonly context: any; // TODO: Update when DriveEditorContext is available
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
  const documentModels = useDocumentModelModules() || [];
  const [openModal, setOpenModal] = useState(false);
  const selectedDocumentModel = useRef<DocumentModelModule | null>(null);

  const { sidebarWidth, maxWidth } = useSidebarWidth(300);

  // TODO: Replace with proper state management when API is available
  const state: Record<string, any> = {};
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

      // TODO: Implement fully when API is available
      try {
        const node = await addDocument(
          driveId,
          fileName,
          (documentModel.documentModel as any).id,
        );

        selectedDocumentModel.current = null;
        if (node) {
          setActiveNodeId(node.id);
        }
      } catch (error) {
        console.error("Failed to create document:", error);
      }
    },
    [driveId, setActiveNodeId],
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
    (docModel: any) => docModel.documentModel?.id !== "powerhouse/document-model",
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
          <main className="flex h-full overflow-hidden">
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
            <div className="flex-1 overflow-y-auto bg-gray-50 p-4 dark:bg-slate-800">
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
                    <div className="mt-1 mb-4 flex items-center justify-between px-1">
                      <h1 className="text-lg font-medium text-gray-900 dark:text-gray-50">
                        {title}
                      </h1>
                      {driveUrl && <ShareDrive driveUrl={driveUrl} />}
                    </div>
                    <Home>
                      {Object.entries(feedbackIssues).length > 0 && (
                        <div className="my-4 px-6">
                          <h2 className="mt-4 mb-3 text-sm font-bold text-gray-600">
                            Feedback Issues
                          </h2>
                          <div className="flex flex-wrap gap-4">
                            {/* TODO: Re-enable when FileItem API is updated */}
                            {Object.entries(feedbackIssues).map(
                              ([id, issue]) => (
                                <div
                                  key={id}
                                  className="cursor-pointer p-2 border rounded"
                                  onClick={() => setActiveNodeId(id)}
                                >
                                  {driveNodes.find((node) => node.id === id)?.name || id}
                                </div>
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
