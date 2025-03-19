import {
  type DeleteCommentInput,
  type AtlasFeedbackComment as Comment,
  type AtlasFeedbackIssue as Issue,
} from "../../../document-models/atlas-feedback-issues/index.js";
import { Command, CommandGroup, CommandItem, CommandList } from "./command.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";
import { useState } from "react";
import { DotsMenuButton } from "./dots-menu-button.js";
import { useCopyLink } from "../hooks/use-copy-link.js";
import { cn } from "../utils/style.js";
type Props = {
  readonly comment: Comment;
  readonly issue: Issue;
  readonly userIsCreator: boolean;
  readonly onEditComment: () => void;
  readonly handleDeleteComment: (input: DeleteCommentInput) => void;
};

export function CommentOptionsDropdown(props: Props) {
  const [open, setOpen] = useState(false);
  const { comment, issue, userIsCreator, onEditComment, handleDeleteComment } =
    props;
  const copyLink = useCopyLink({
    issueId: issue.phid,
    commentId: comment.phid,
    notionId: comment.notionId,
  });
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <DotsMenuButton
          className={cn(!userIsCreator && "text-gray-400 hover:text-gray-200")}
          open={open}
        />
      </PopoverTrigger>
      <PopoverContent
        className="p-0"
        onClick={(e) => {
          e.stopPropagation();
        }}
      >
        <Command>
          <CommandList>
            <CommandGroup>
              {userIsCreator ? (
                <>
                  <CommandItem
                    onSelect={() => {
                      onEditComment();
                      setOpen(false);
                    }}
                  >
                    Edit comment
                  </CommandItem>
                  <CommandItem
                    onSelect={() => {
                      handleDeleteComment({
                        issuePhid: issue.phid,
                        phid: comment.phid,
                      });
                      setOpen(false);
                    }}
                  >
                    Delete comment
                  </CommandItem>
                </>
              ) : null}
              <CommandItem
                key="copy-link"
                onSelect={() => {
                  copyLink();
                  setOpen(false);
                }}
              >
                Copy link
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
