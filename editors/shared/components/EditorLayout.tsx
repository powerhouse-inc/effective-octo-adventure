import { useState } from "react";
import ToggleSwitch from "./toggle-switch.js";
import type { Maybe } from "document-model";

const splitModeEnabled = false;
const readOnlyModeEnabled = false;

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
}

export const EditorLayout = ({
  children,
  title,
  notionId,
}: EditorLayoutProps) => {
  const [isSplitMode, setIsSplitMode] = useState<boolean>(false);
  const [isEditMode, setIsEditMode] = useState<boolean>(true);

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
        <div className="flex items-center justify-between flex-wrap">
          <h2 className="text-gray-700">
            A.2 / A.2.1 - Governance Process Support
          </h2>
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
