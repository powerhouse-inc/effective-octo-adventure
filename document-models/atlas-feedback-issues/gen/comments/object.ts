import { BaseDocumentClass } from "document-model";
import {
  type CreateCommentInput,
  type DeleteCommentInput,
  type EditCommentInput,
  type AtlasFeedbackIssuesState,
  type AtlasFeedbackIssuesLocalState,
} from "../types.js";
import { createComment, deleteComment, editComment } from "./creators.js";
import { type AtlasFeedbackIssuesAction } from "../actions.js";

export default class AtlasFeedbackIssues_Comments extends BaseDocumentClass<
  AtlasFeedbackIssuesState,
  AtlasFeedbackIssuesLocalState,
  AtlasFeedbackIssuesAction
> {
  public createComment(input: CreateCommentInput) {
    return this.dispatch(createComment(input));
  }

  public deleteComment(input: DeleteCommentInput) {
    return this.dispatch(deleteComment(input));
  }

  public editComment(input: EditCommentInput) {
    return this.dispatch(editComment(input));
  }
}
