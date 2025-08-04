import { formatEthAddress } from "@powerhousedao/design-system";
import {
  type EditCommentInput,
  type DeleteCommentInput,
  type AtlasFeedbackIssuesState,
  type AtlasFeedbackIssue as TIssue,
  type AtlasFeedbackComment as TComment,
} from "../../../document-models/atlas-feedback-issues/index.js";
import { Fragment, useCallback, useState } from "react";
import { type Address } from "viem";
import { useEnsName } from "wagmi";
import { EditCommentForm } from "./edit-comment-form.js";
import { formatDateForDisplay } from "../utils/date.js";
import { cn } from "../utils/style.js";
import { Avatar } from "./avatar.js";
import { CommentOptionsDropdown } from "./comment-options-dropdown.js";
import { type User } from "document-model";
import { dispatchSelectCommentEvent } from "../utils/events.js";

type Props = {
  readonly issue: TIssue;
  readonly comment: TComment;
  readonly user: User;
  readonly state: AtlasFeedbackIssuesState;
  readonly handleEditComment: (input: EditCommentInput) => void;
  readonly handleDeleteComment: (input: DeleteCommentInput) => void;
};
export function Comment(props: Props) {
  const {
    issue,
    comment,
    user,
    state,
    handleEditComment,
    handleDeleteComment,
  } = props;
  const [isEditing, setIsEditing] = useState(false);
  const ensNameResult = useEnsName({
    address: comment.creatorAddress as Address,
  });
  const ensName = ensNameResult.data ?? undefined;
  const formattedAddress = formatEthAddress(comment.creatorAddress);
  const userIsCreator = user.address === comment.creatorAddress;
  const displayName = ensName ?? (userIsCreator ? "You" : formattedAddress);

  const onSubmitEditComment = useCallback(
    (input: EditCommentInput) => {
      handleEditComment(input);
      setIsEditing(false);
    },
    [handleEditComment],
  );

  const onCancel = useCallback(() => {
    setIsEditing(false);
  }, []);

  const containerClass = userIsCreator
    ? "bg-gray-300 text-gray-900 ml-4 text-right"
    : "bg-gray-900 text-gray-50 mr-4";

  const timestampClass = userIsCreator
    ? "text-right text-gray-600"
    : "text-right text-gray-400";

  const formattedComment = comment.content.split("\n").map((line, index) => (
    <Fragment key={index}>
      {line}
      <br />
    </Fragment>
  ));

  return (
    <div
      className={cn(containerClass, "group rounded-lg p-2")}
      onClick={() => {
        dispatchSelectCommentEvent({
          phid: comment.phid,
          notionId: comment.notionId,
          issuePhid: issue.phid,
        });
      }}
    >
      <div
        className={cn(
          "flex items-center justify-between text-left",
          userIsCreator ? "text-gray-600" : "text-gray-400",
        )}
      >
        <div className="flex items-center gap-1">
          <Avatar address={comment.creatorAddress as Address} />
          {userIsCreator ? "You" : displayName}
        </div>
        <CommentOptionsDropdown
          comment={comment}
          handleDeleteComment={handleDeleteComment}
          issue={issue}
          onEditComment={() => setIsEditing(true)}
          userIsCreator={userIsCreator}
        />
      </div>
      {isEditing ? (
        <div className="px-2">
          <EditCommentForm
            comment={comment}
            handleDeleteComment={handleDeleteComment}
            isEditing={isEditing}
            issue={issue}
            onCancel={onCancel}
            onSubmitEditComment={onSubmitEditComment}
            state={state}
          />
        </div>
      ) : (
        <div className="px-2">
          <p className="pb-1.5 text-inherit">{formattedComment}</p>
        </div>
      )}
      <span className={cn(timestampClass, "mt-1 mr-1 block text-right")}>
        {formatDateForDisplay(comment.lastEditedAt)}
      </span>
    </div>
  );
}
