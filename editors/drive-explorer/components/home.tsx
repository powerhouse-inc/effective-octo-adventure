import type React from "react";
import { Atlas } from "./icons/atlas.js";
import { Skeleton } from "./icons/skeleton.js";
import { SidebarArrows } from "./icons/sidebar-arrows.js";

export interface HomeProps {
  readonly children?: React.ReactNode;
}

export const Home: React.FC<HomeProps> = ({ children }) => (
  <div>
    <div className="flex gap-x-4 rounded-xl border border-gray-200 bg-gray-50 p-6">
      <div className="flex w-[184px] flex-col items-center rounded-2xl bg-slate-50 p-4 pt-2">
        <h2 className="mb-2 flex items-center justify-start">
          <Atlas />
          <div className="ml-1 text-sm font-semibold text-gray-700">
            Atlas Explorer
          </div>
        </h2>
        <div className="relative">
          <Skeleton />
          <div className="absolute -top-[1px] left-full">
            <SidebarArrows />
          </div>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center rounded-xl bg-slate-50">
        <div className="rounded-md bg-gray-200 px-1.5 py-1">
          Select a document on the left to get started
        </div>
      </div>
    </div>
    <div className="mt-4">{children}</div>
  </div>
);
