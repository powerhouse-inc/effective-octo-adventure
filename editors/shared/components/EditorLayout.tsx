import { useMemo, useState } from "react";
import ToggleSwitch from "./toggle-switch.js";
import type { Maybe } from "document-model";
import { useSidebar, type SidebarNode } from "@powerhousedao/design-system/ui";
import { Breadcrumbs } from "./breadcrumbs.js";
import { cn } from "@powerhousedao/design-system/scalars";

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

export const EditorLayout = ({
  children,
  title,
  notionId,
  splitModeEnabled = false,
  readOnlyModeEnabled = false,
}: EditorLayoutProps) => {
  const [isSplitMode, setIsSplitMode] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(true);

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
    <div className="min-h-screen h-screen bg-white flex flex-col rounded-2xl p-6 gap-4">
      <header>
        <div className="flex justify-between w-full">
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
        <div className="flex items-center justify-between flex-wrap gap-3">
          <div
            className={cn(
              "flex w-full ",
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
            />
            <ToggleSwitch
              options={readOnlyModeEnabled ? ["Read Only", "Edit"] : ["Edit"]}
              defaultSelected={readOnlyModeEnabled ? (isEditMode ? 1 : 0) : 0}
              onChange={(option) => {
                setIsEditMode(readOnlyModeEnabled ? option === 1 : true);
              }}
            />
          </div>
        </div>
      </div>

      {children({ isSplitMode, isEditMode })}
    </div>
  );
};
