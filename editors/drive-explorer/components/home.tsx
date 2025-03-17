import React from "react";
import { Atlas } from "./icons/atlas";
import { Skeleton } from "./icons/skeleton";

export interface HomeProps {
  readonly children?: React.ReactNode;
}

export const Home: React.FC<HomeProps> = ({ children }) => (
  <div>
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex gap-x-4">
      <div className="p-4 pt-2 rounded-2xl bg-slate-100 w-[184px] flex flex-col items-center">
        <h2 className="flex justify-start items-center mb-2">
          <Atlas />
          <div className="ml-1 text-sm font-semibold text-gray-700">
            Atlas Explorer
          </div>
        </h2>
        <div>
          <Skeleton />
        </div>
      </div>
      <div className="flex justify-center items-center bg-slate-100 flex-1 rounded-xl">
        <div className="bg-gray-200 rounded-md p-1">
          Select a document on the left to get started
        </div>
      </div>
    </div>
    <div className="mt-4">{children}</div>
  </div>
);
