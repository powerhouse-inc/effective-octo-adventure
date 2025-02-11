/* eslint-disable react/jsx-max-depth */
import React from "react";
import { Icon } from "@powerhousedao/design-system";
import {
  Sidebar,
  SidebarProvider,
  type SidebarNode,
} from "@powerhousedao/design-system/scalars";
import mockedTree from "./mocked_tree.json";

export function EditorLayout({ children }: React.PropsWithChildren) {
  return (
    <SidebarProvider nodes={mockedTree as SidebarNode[]}>
      <main className="flex h-full w-full">
        <Sidebar
          activeNodeId="4281ab93-ef4f-4974-988d-7dad149a693d"
          enableMacros={4}
          extraFooterContent={
            <div className="flex flex-col gap-1">
              <div className="flex items-baseline gap-2 text-gray-900 dark:text-gray-200">
                <div>Login with</div>
                <Icon
                  className="cursor-pointer"
                  height={18}
                  name="Renown"
                  size="auto"
                />
              </div>
              <div className="text-xs text-gray-500 dark:text-gray-400">
                Auth integration example within sidebar content
              </div>
            </div>
          }
          // onActiveNodeChange={() => {}}
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
          {children}
        </div>
      </main>
    </SidebarProvider>
  );
}
