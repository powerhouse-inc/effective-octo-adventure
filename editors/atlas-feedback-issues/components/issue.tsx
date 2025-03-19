import { type ViewNode } from "../types/view-nodes.js";
import {
  type AtlasFeedbackIssue as TIssue,
  type AtlasFeedbackIssuesState,
  type DeleteIssueInput,
} from "../../../document-models/atlas-feedback-issues/index.js";
import { useMemo } from "react";
import { Scopes } from "./scopes.js";
import { filterViewNodesRecursively } from "../utils/index.js";
import { Chevron } from "./chevron.js";
import { IssueOptionsDropdown } from "./issue-options-dropdown.js";
import { dispatchSelectIssueEvent } from "../utils/events.js";

type Props = {
  readonly issue: TIssue;
  readonly issueNumber: number;
  readonly state: AtlasFeedbackIssuesState;
  readonly scopes: ViewNode[];
  readonly handleDeleteIssue: (input: DeleteIssueInput) => void;
  readonly selectedIssuePhid: string | null;
  readonly selectedNotionId: string | null;
};
export function Issue(props: Props) {
  const {
    issue,
    state,
    issueNumber,
    scopes,
    handleDeleteIssue,
    selectedIssuePhid,
    selectedNotionId,
  } = props;
  const open = selectedIssuePhid === issue.phid;
  const filteredScopes = useMemo(() => {
    return filterViewNodesRecursively(scopes, issue.notionIds);
  }, [scopes, issue.notionIds]);
  return (
    <li>
      <button
        className="flex items-center justify-between cursor-pointer text-gray-800 text-sm mb-3 group w-full"
        onClick={() => {
          dispatchSelectIssueEvent(issue.phid);
        }}
      >
        <div className="flex items-center gap-3">
          <Chevron className="ml-1" open={open} />
          <span className="font-medium">Issue #{issueNumber}</span>
        </div>
        <IssueOptionsDropdown
          handleDeleteIssue={handleDeleteIssue}
          issue={issue}
        />
      </button>
      {open ? (
        <div className="pl-2">
          <Scopes
            issue={issue}
            issues={state.issues}
            scopes={filteredScopes}
            selectedNotionId={selectedNotionId}
          />
        </div>
      ) : null}
    </li>
  );
}
