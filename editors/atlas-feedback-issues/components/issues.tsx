import { Issue } from "./issue";
import {
  AtlasFeedbackIssue as TIssue,
  AtlasFeedbackIssuesState,
  DeleteIssueInput,
} from "document-models/atlas-feedback-issues";
import { ViewNode } from "@powerhousedao/mips-parser";

type Props = {
  readonly issues: TIssue[];
  readonly scopes: ViewNode[];
  readonly selectedIssuePhid: string | null;
  readonly handleDeleteIssue: (input: DeleteIssueInput) => void;
  readonly selectedNotionId: string | null;
  readonly state: AtlasFeedbackIssuesState;
};
export function Issues(props: Props) {
  const {
    issues,
    scopes,
    selectedIssuePhid,
    handleDeleteIssue,
    selectedNotionId,
    state,
  } = props;
  return (
    <ul>
      {issues.map((issue, index) => (
        <Issue
          handleDeleteIssue={handleDeleteIssue}
          issue={issue}
          issueNumber={index + 1}
          key={issue.phid}
          scopes={scopes}
          selectedIssuePhid={selectedIssuePhid}
          selectedNotionId={selectedNotionId}
          state={state}
        />
      ))}
    </ul>
  );
}
