import {
  type DeleteIssueInput,
  type AtlasFeedbackIssue,
} from "../../../document-models/atlas-feedback-issues/index.js";
import { Command, CommandGroup, CommandItem, CommandList } from "./command.js";
import { Popover, PopoverContent, PopoverTrigger } from "./popover.js";
import { useState } from "react";
import { DotsMenuButton } from "./dots-menu-button.js";
import { useCopyLink } from "../hooks/use-copy-link.js";

type Props = {
  readonly issue: AtlasFeedbackIssue;
  readonly handleDeleteIssue: (input: DeleteIssueInput) => void;
};

export function IssueOptionsDropdown(props: Props) {
  const [open, setOpen] = useState(false);
  const { issue, handleDeleteIssue } = props;
  const copyLink = useCopyLink({
    issueId: issue.phid,
  });
  return (
    <Popover onOpenChange={setOpen} open={open}>
      <PopoverTrigger asChild>
        <DotsMenuButton open={open} />
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
              <CommandItem
                onSelect={() => {
                  copyLink();
                  setOpen(false);
                }}
              >
                Copy link
              </CommandItem>
              <CommandItem
                onSelect={() => {
                  handleDeleteIssue({
                    phid: issue.phid,
                  });
                  setOpen(false);
                }}
              >
                Delete issue
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
