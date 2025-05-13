import {
  Icon,
  FileItem,
  type BaseUiFileNode,
  ToastContainer,
  CreateDocumentModal,
} from "@powerhousedao/design-system";
import {
  Sidebar,
  SidebarProvider,
  type NodeStatus,
  type SidebarNode,
} from "@powerhousedao/document-engineering/ui";
import { useCallback, useState, useRef, useMemo } from "react";
import { useDriveContext } from "@powerhousedao/reactor-browser";
import { type AtlasFeedbackIssue, type AtlasArticle } from "./types.js";
import { EditorContainer } from "./EditorContainer.js";
import { type DocumentModelModule, type EditorContext } from "document-model";
import { CreateDocument } from "./create-document.js";
import { Home } from "./home.js";
import { documentModel as AtlasFeedbackIssues } from "../../../document-models/atlas-feedback-issues/gen/document-model.js";
import type { Node } from "document-drive";
import { ShareDrive } from "../../shared/components/share-drive.js";
import type { AtlasMultiParentState } from "../../../document-models/atlas-multi-parent/index.js";

export interface DriverLayoutProps {
  readonly driveId: string;
  readonly children: React.ReactNode;
  readonly context: EditorContext;
  readonly nodes: Node[];
  readonly driveUrl?: string | null;
}

export function DriverLayout({
  children,
  driveId,
  context,
  nodes: driveNodes,
  driveUrl,
}: DriverLayoutProps) {
  const { useDriveDocumentStates, addDocument, documentModels } =
    useDriveContext();
  const [activeNodeId, setActiveNodeId] = useState<string | undefined>();
  const [openModal, setOpenModal] = useState(false);
  const selectedDocumentModel = useRef<DocumentModelModule | null>(null);

  const [state, fetchDocuments] = useDriveDocumentStates({ driveId });
  const { atlasNodes, feedbackIssues } = useMemo(() => {
    return Object.keys(state).reduce(
      (acc, curr) => {
        const document = state[curr];
        if (document.documentType.startsWith("sky/atlas")) {
          acc.atlasNodes[curr] = document as AtlasArticle;
        } else if (document.documentType === AtlasFeedbackIssues.id) {
          acc.feedbackIssues[curr] = document as AtlasFeedbackIssue;
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
    return buildSidebarTree(atlasNodes);
  }, [atlasNodes]);

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

  const onActiveNodeChange = useCallback((node: SidebarNode) => {
    setActiveNodeId(node.id);
  }, []);

  const onEditorClose = useCallback(() => {
    setActiveNodeId(undefined);
  }, []);

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
      await fetchDocuments(driveId, [node.id]);
      setActiveNodeId(node.id);
    },
    [addDocument, driveId, setActiveNodeId],
  );

  const onSelectDocumentModel = (documentModel: DocumentModelModule) => {
    selectedDocumentModel.current = documentModel;
    setOpenModal(true);
  };

  const filteredDocumentModels = documentModels.filter(
    (docModel) => docModel.documentModel.id !== "powerhouse/document-model",
  );

  return (
    <SidebarProvider>
      <ToastContainer position="bottom-right"></ToastContainer>
      <main className="flex overflow-hidden h-full">
        <Sidebar
          className="flex-0"
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
        />
        <div className="flex-1 bg-gray-50 p-4 dark:bg-slate-800 overflow-y-auto">
          <>
            {activeNodeId ? (
              <EditorContainer
                context={context}
                documentId={activeNodeId}
                documentType={state[activeNodeId].documentType}
                driveId={driveId}
                key={activeNodeId}
                onClose={onEditorClose}
                title={title}
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
                        {Object.entries(feedbackIssues).map(([id, issue]) => (
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
                            onSelectNode={(node) => setActiveNodeId(node.id)}
                            isAllowedToCreateDocuments={false}
                            onRenameNode={function (
                              name: string,
                              uiNode: BaseUiFileNode,
                            ): void {
                              throw new Error("Function not implemented.");
                            }}
                            onDuplicateNode={function (
                              uiNode: BaseUiFileNode,
                            ): void {
                              throw new Error("Function not implemented.");
                            }}
                            onDeleteNode={function (
                              uiNode: BaseUiFileNode,
                            ): void {
                              throw new Error("Function not implemented.");
                            }}
                          />
                        ))}
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
  );
}

function buildSidebarTree(allNodes: Record<string, AtlasArticle>) {
  const nodesById: Record<string, SidebarNode> = {};

  for (const [key, node] of Object.entries(allNodes)) {
    let icons = {};
    const type = node.global.atlasType?.toLowerCase() || "scope";

    if (node.documentType === "sky/atlas-set") {
      icons = {
        icon: "FolderClose",
        expandedIcon: "FolderOpen",
      };
    } else if (type === "neededResearch") {
      icons = {
        icon: "Tube",
      };
    } else if (type === "tenet") {
      icons = {
        icon: "Compass",
      };
    } else if (type === "annotation") {
      icons = {
        icon: "Pencil",
      };
    }

    let status = "UNCHANGED";

    if (!node.global.notionId) {
      status = "CREATED";
    } else if (node.revision.global > 7) {
      status = "MODIFIED";
    }

    // get the right title for the node depending on the document type
    const title =
      "sky/atlas-set" === node.documentType
        ? node.global.name
        : "sky/atlas-multiparent" === node.documentType
          ? `${(node.global as unknown as AtlasMultiParentState).parents?.[0]?.docNo} - ${node.global.name}`
          : `${node.global?.docNo} - ${node.global.name}`;

    nodesById[key] = {
      id: key,
      title,
      children: [],
      status: status as NodeStatus,
      ...icons,
    };
  }

  // Build the tree
  for (const [key, value] of Object.entries(allNodes)) {
    if (value.documentType === "sky/atlas-multiparent") {
      const parents = (value.global as unknown as AtlasMultiParentState)
        .parents;
      if (parents && parents.length > 0) {
        for (const parent of parents) {
          nodesById[parent.id]?.children?.push(nodesById[key]);
        }
      }
    } else if (
      value.global.parent &&
      !!value.global.parent.id &&
      nodesById[value.global.parent.id]
    ) {
      if (nodesById[key]) {
        nodesById[value.global.parent.id]?.children?.push(nodesById[key]);
      }
    }
  }

  const childrenIds = new Set<string>();

  Object.entries(nodesById).forEach(([id, node]) => {
    if (node?.children) {
      node?.children?.forEach((child) => {
        childrenIds.add(child.id);
      });
    }
  });

  const result = Object.values(nodesById).filter(
    (node) => !childrenIds.has(node.id),
  );

  return sortSidebarNodes(result);
}

function sortSidebarNodes(nodes: SidebarNode[]): SidebarNode[] {
  const sortedNodes = nodes.map((node) => {
    if (node?.children && node?.children?.length > 0) {
      return {
        ...node,
        children: sortSidebarNodes(node?.children),
      };
    }

    return node;
  });

  return sortedNodes.sort((a, b) => a.title.localeCompare(b.title));
}
