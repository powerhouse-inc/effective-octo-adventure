import {
  type AtlasFeedbackIssuesState,
  type DeleteCommentInput,
  type EditCommentInput,
  type AtlasFeedbackIssue,
  AtlasFeedbackComment as TComment,
} from "document-models/atlas-feedback-issues/index.js";
import { type User } from "document-model";
import { Comment } from "./comment.js";
type Props = {
  readonly notionId: string;
  readonly issue: AtlasFeedbackIssue;
  readonly handleDeleteComment: (input: DeleteCommentInput) => void;
  readonly handleEditComment: (input: EditCommentInput) => void;
  readonly state: AtlasFeedbackIssuesState;
  readonly user: User;
};
export function Comments(props: Props) {
  const {
    notionId,
    issue,
    handleDeleteComment,
    handleEditComment,
    state,
    user,
  } = props;
  const comments = state.issues.find((i) => i.phid === issue.phid)?.comments;
  if (!comments) return null;

  return (
    <ul>
      {comments
        .filter((c) => c.notionId === notionId)
        .map((comment) => (
          <li className="my-2" key={comment.phid}>
            <Comment
              comment={comment}
              handleDeleteComment={handleDeleteComment}
              handleEditComment={handleEditComment}
              issue={issue}
              state={state}
              user={user}
            />
          </li>
        ))}
    </ul>
  );
}
