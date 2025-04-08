import { useMemo, useState } from "react";
import ToggleSwitch from "./toggle-switch.js";
import type { Maybe } from "document-model";
import { useSidebar, type SidebarNode } from "@powerhousedao/design-system/ui";
import { Breadcrumbs } from "@powerhousedao/design-system";
import { Button, Tooltip, TooltipProvider } from "@powerhousedao/design-system";
import { useDriveContext } from "../context/DriveContext.js";

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
  const { driveId } = useDriveContext();

  const { nodes, activeNodeId, onActiveNodeChange } = useSidebar();

  // node path from the root to the active node
  const nodePath = useMemo(() => {
    if (!nodes || !activeNodeId) return [];

    // Helper function to find the path to a node with the given id
    const findNodePath = (
      nodeList: SidebarNode[],
      targetId: string,
      currentPath: SidebarNode[] = []
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
              <div className="flex items-center gap-4">
                <TooltipProvider>
                  <Tooltip content={driveId ? `https://apps.powerhouse.io/sky-atlas/switchboard/d/${driveId}` : "No drive ID available"}>
                    <Button
                      size="small"
                      style={{ cursor: "pointer", position: "relative" }}
                      onClick={() => {
                        if (driveId) {
                          navigator.clipboard.writeText(
                            `https://apps.powerhouse.io/sky-atlas/switchboard/d/${driveId}`
                          );
                          const button =
                            document.querySelector(".clipboard-button");
                          if (button) {
                            const effect = document.createElement("span");
                            effect.textContent = "Copied!";
                            effect.style.position = "absolute";
                            effect.style.top = "-20px";
                            effect.style.right = "0";
                            effect.style.backgroundColor = "rgba(0, 0, 0, 0.7)";
                            effect.style.color = "white";
                            effect.style.padding = "2px 5px";
                            effect.style.borderRadius = "3px";
                            effect.style.fontSize = "12px";
                            effect.style.transition = "opacity 0.5s";
                            effect.style.opacity = "1";
                            button.appendChild(effect);
                            setTimeout(() => {
                              effect.style.opacity = "0";
                              setTimeout(() => button.removeChild(effect), 500);
                            }, 1000);
                          }
                        }
                      }}
                      className="clipboard-button"
                      disabled={!driveId}
                    >
                      Share Drive
                    </Button>
                  </Tooltip>
                </TooltipProvider>
                <div>
                  <span className="atlas-cell-notionId-label">Notion ID</span>
                  <span className="atlas-cell-notionId-value">
                    {notionId || <span className="px-4">-</span>}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div>
        <div className="flex items-center justify-between flex-wrap">
          <Breadcrumbs
            breadcrumbs={nodePath.map((node) => ({
              id: node.id,
              name: node.title,
            }))}
            onBreadcrumbSelected={(node) => {
              onActiveNodeChange(nodePath.find((n) => n.id === node.id)!);
            }}
            createEnabled={false}
            onCreate={() => {}}
          />
          <div className="flex items-center gap-4">
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
