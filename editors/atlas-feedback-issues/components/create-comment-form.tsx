import { generateId } from "document-model";
import {
  type AtlasFeedbackIssue as TIssue,
  type CreateCommentInput,
  type AtlasFeedbackIssuesState,
  makeNewCommentValidator,
} from "../../../document-models/atlas-feedback-issues/index.js";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { type z } from "zod";
import { Textarea } from "./text-area.js";
import { Form, FormField, FormItem, FormControl, FormMessage } from "./form.js";
export function CreateCommentForm(props: {
  readonly issue: TIssue;
  readonly notionId: string;
  readonly state: AtlasFeedbackIssuesState;
  readonly handleCreateComment: (input: CreateCommentInput) => void;
}) {
  const { issue, notionId, state, handleCreateComment } = props;
  const schema = makeNewCommentValidator(state);
  const defaultValues = {
    content: "",
    notionId,
    issuePhid: issue.phid,
    phid: generateId(),
  };
  const form = useForm<z.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const onSubmit = useCallback(
    (data: z.infer<typeof schema>) => {
      handleCreateComment({
        ...data,
        createdAt: new Date().toISOString(),
      });
    },
    [handleCreateComment],
  );

  const onKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
      if (event.key === "Escape") {
        event.preventDefault();
        event.currentTarget.blur();
      }
      if (event.key === "Enter" && !event.shiftKey) {
        event.preventDefault();
        form.handleSubmit(onSubmit)();
      }
    },
    [form, onSubmit],
  );

  useEffect(() => {
    if (form.formState.isSubmitSuccessful) {
      form.reset(defaultValues);
    }
  }, [form.formState.isSubmitSuccessful, form.reset, defaultValues]);

  return (
    <Form {...form}>
      <form
        className="bg-white p-3 rounded-md"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Textarea
                  {...field}
                  className="placeholder:text-gray-600 placeholder:text-sm text-sm"
                  onKeyDown={onKeyDown}
                  placeholder="Add comment"
                  rows={1}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <button
          className="bg-gray-100 rounded-md h-10 py-2 px-4 flex justify-center items-center w-full"
          type="submit"
        >
          Comment
        </button>
      </form>
    </Form>
  );
}
