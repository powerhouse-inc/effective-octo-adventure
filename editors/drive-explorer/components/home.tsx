import type React from "react";
import { SearchByContent } from "./SearchByContent.js";
import { SearchByScope } from "./SearchByScope.js";

export interface HomeProps {
  driveId: string;
  readonly children?: React.ReactNode;
}

export const Home: React.FC<HomeProps> = ({ children, driveId }) => (
  <div>
    <div className="bg-gray-50 border border-gray-200 rounded-xl p-6 flex flex-col gap-x-4 gap-y-4">
      <div className="p-4 rounded-md bg-blue-100">
        <SearchByContent driveId={driveId} />
      </div>
      <div className="p-4 rounded-md bg-red-100">
        <SearchByScope driveId={driveId} />
      </div>
    </div>
    <div className="mt-4">{children}</div>
  </div>
);
