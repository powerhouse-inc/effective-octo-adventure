import { useMemo, useContext } from "react";
import ToggleSwitch from "./toggle-switch.js";
import type { Maybe } from "document-model";
import {
  useSidebar,
  type SidebarNode,
} from "@powerhousedao/document-engineering/ui";
import { Breadcrumbs } from "./breadcrumbs.js";
import { cn } from "@powerhousedao/document-engineering/scalars";
import {
  useViewMode,
  ViewModeContext,
  ViewModeProvider,
} from "../providers/ViewModeProvider.js";
import { BaseDocumentCacheProvider } from "../providers/BaseDocumentCacheProvider.js";

export type ChildrenFn = ({
  isSplitMode,
  isEditMode,
}: {
  isSplitMode: boolean;
  isEditMode: boolean;
}) => React.ReactNode;

interface EditorLayoutProps {
  children: ChildrenFn;
  title: string;
  notionId?: Maybe<string>;
  splitModeEnabled?: boolean;
  readOnlyModeEnabled?: boolean;
}

const EditorLayoutContent = ({
  children,
  title,
  notionId,
  splitModeEnabled = false,
  readOnlyModeEnabled = false,
}: EditorLayoutProps) => {
  const { isSplitMode, setIsSplitMode, isEditMode, setIsEditMode } =
    useViewMode();

  const { nodes, activeNodeId, onActiveNodeChange } = useSidebar();

  // node path from the root to the active node
  const nodePath = useMemo(() => {
    if (!nodes || !activeNodeId) return [];

    // Helper function to find the path to a node with the given id
    const findNodePath = (
      nodeList: SidebarNode[],
      targetId: string,
      currentPath: SidebarNode[] = [],
    ): SidebarNode[] | null => {
      for (const node of nodeList) {
        // Check if current node is the target
        if (node.id === targetId) {
          return [...currentPath, node];
        }

        // If node has children, search them
        if (node.children && node.children.length > 0) {
          const childPath = findNodePath(node.children, targetId, [
            ...currentPath,
            node,
          ]);
          if (childPath) {
            return childPath;
          }
        }
      }

      // Node not found in this branch
      return null;
    };

    // Start the search from the root nodes
    return findNodePath(nodes, activeNodeId) || [];
  }, [nodes, activeNodeId]);

  return (
    <div className="mt-4 flex h-screen min-h-screen flex-col gap-4 rounded-2xl bg-white p-6">
      <header>
        <div className="flex h-9 w-full items-center justify-between">
          <div>
            <h1 className="text-xl font-semibold">{title}</h1>
          </div>
          <div className="flex items-center gap-2">
            <div className="atlas-cell-notionId">
              <span className="atlas-cell-notionId-label">Notion ID</span>
              <span className="atlas-cell-notionId-value">
                {notionId || <span className="px-4">-</span>}
              </span>
            </div>
          </div>
        </div>
      </header>

      <div>
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div
            className={cn(
              "flex w-full flex-1",
              nodePath.length > 2
                ? "xl:w-[calc(100%-300px)]"
                : "lg:w-[calc(100%-300px)]",
            )}
          >
            <Breadcrumbs
              breadcrumbs={nodePath.map((node) => ({
                id: node.id,
                name: node.title,
              }))}
              onBreadcrumbSelected={(node) => {
                onActiveNodeChange(nodePath.find((n) => n.id === node.id)!);
              }}
            />
          </div>
          <div className="flex items-center gap-4 lg:ml-auto">
            <ToggleSwitch
              options={splitModeEnabled ? ["Unified", "Split"] : ["Unified"]}
              defaultSelected={splitModeEnabled ? (isSplitMode ? 1 : 0) : 0}
              onChange={(selectedIndex) => {
                setIsSplitMode(splitModeEnabled ? selectedIndex === 1 : false);
              }}
              className={cn(!splitModeEnabled && "p-0")}
            />
            <ToggleSwitch
              options={readOnlyModeEnabled ? ["Read Only", "Edit"] : ["Edit"]}
              defaultSelected={readOnlyModeEnabled ? (isEditMode ? 1 : 0) : 0}
              onChange={(option) => {
                setIsEditMode(readOnlyModeEnabled ? option === 1 : true);
              }}
              className={cn(!readOnlyModeEnabled && "p-0")}
            />
          </div>
        </div>
      </div>

      {children({ isSplitMode, isEditMode })}
    </div>
  );
};

export const EditorLayout = (props: EditorLayoutProps) => {
  const viewModeContext = useContext(ViewModeContext);

  // if there is a ViewModeProvider, use directly EditorLayoutContent
  if (viewModeContext) {
    return <EditorLayoutContent {...props} />;
  }

  // if there is no ViewModeProvider, wrap with a new one
  return (
    <BaseDocumentCacheProvider>
      <ViewModeProvider>
        <EditorLayoutContent {...props} />
      </ViewModeProvider>
    </BaseDocumentCacheProvider>
  );
};
