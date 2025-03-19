import { Icon } from "@powerhousedao/design-system";
import {
  cn,
  type NodeStatus,
  Sidebar,
  SidebarProvider,
  type SidebarNode,
} from "@powerhousedao/design-system/scalars";
import { useCallback, useState, useRef, useMemo } from "react";
import { useDriveContext } from "@powerhousedao/reactor-browser";
import { type AtlasArticle } from "./types.js";
import { EditorContainer } from "./EditorContainer.js";
import { type DocumentModelModule, type EditorContext } from "document-model";
import { CreateDocumentModal } from "@powerhousedao/design-system";
import { CreateDocument } from "./create-document.js";
import { Home } from "./home.js";

export interface EditorLayoutProps {
  readonly driveId: string;
  readonly children: React.ReactNode;
  readonly context: EditorContext;
}

export function EditorLayout({
  children,
  driveId,
  context,
}: EditorLayoutProps) {
  const { useDriveDocumentStates, addDocument, documentModels } =
    useDriveContext();
  const [activeNodeId, setActiveNodeId] = useState<string | undefined>();
  const [openModal, setOpenModal] = useState(false);
  const selectedDocumentModel = useRef<DocumentModelModule | null>(null);

  const [state, fetchDocuments] = useDriveDocumentStates({ driveId });

  const nodes = useMemo(() => {
    return buildSidebarTree(state as Record<string, AtlasArticle>);
  }, [state]);

  const selectedNode = activeNodeId
    ? (state[activeNodeId] as AtlasArticle)
    : null;

  const title = selectedNode
    ? `${selectedNode.global.docNo} - ${selectedNode.global.name}`
    : "Welcome to the Atlas Explorer";

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
      <main className="-m-4 flex size-[calc(100%+32px)] overflow-hidden rounded-2xl">
        {/* 
          TODO: remove this div once we fix tailwind css issues
          we need to add classes that are not being applied correctly
          to the sidebar or other `design-system` components
        */}
        <div
          className={cn(
            "d-none relative h-full w-px translate-x-[5px] transition-colors group-hover/sidebar-resizer:bg-gray-500",
            "absolute right-0 top-14 size-4 translate-x-1/2 rounded-full bg-gray-500 opacity-0 transition-opacity group-hover/sidebar-resizer:opacity-100",
            "group/sidebar-resizer absolute right-0 top-0 h-full w-[10px] translate-x-1/2 cursor-ew-resize select-none",
            "flex h-9 w-full appearance-none rounded-md border border-gray-300 bg-white px-3 py-2 pl-8! font-sans text-sm font-normal leading-5 text-gray-900 placeholder:text-gray-500 focus:bg-gray-50 focus-visible:outline-hidden focus-visible:ring-1 focus-visible:ring-gray-900 focus-visible:ring-offset-0 focus-visible:ring-offset-white disabled:cursor-not-allowed disabled:border-gray-300 disabled:bg-white disabled:text-gray-700",
            "w-[26px] rounded-lg bg-slate-50 p-1 text-center text-xs text-slate-100 hover:bg-slate-100 hover:text-slate-200",
            "min-h-4 min-w-4",
          )}
        />
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
        />
        <div
          className="flex-1 bg-gray-50 p-4 dark:bg-slate-800"
          style={{
            width: "calc(100% - var(--sidebar-width))",
          }}
        >
          <>
            {!activeNodeId && (
              <h1 className="atlas-drive-explorer-header mt-12 text-base text-gray-900 dark:text-gray-50">
                {title}
              </h1>
            )}
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
              <Home>
                <CreateDocument
                  /* @ts-expect-error */
                  createDocument={onSelectDocumentModel}
                  documentModels={filteredDocumentModels}
                />
              </Home>
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

    if (type === "category") {
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

    nodesById[key] = {
      id: key,
      title: `${node.global.docNo} - ${node.global.name}`,
      children: [],
      status: status as NodeStatus,
      ...icons,
    };
  }

  // Build the tree
  for (const [key, value] of Object.entries(allNodes)) {
    if (
      value.global.parent &&
      !!value.global.parent.id &&
      nodesById[value.global.parent.id]
    ) {
      nodesById[value.global.parent.id].children?.push(nodesById[key]);
    }
  }

  const childrenIds = new Set<string>();

  Object.entries(nodesById).forEach(([id, node]) => {
    if (node.children) {
      node.children.forEach((child) => {
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
    if (node.children && node.children.length > 0) {
      return {
        ...node,
        children: sortSidebarNodes(node.children),
      };
    }

    return node;
  });

  return sortedNodes.sort((a, b) => a.title.localeCompare(b.title));
}
