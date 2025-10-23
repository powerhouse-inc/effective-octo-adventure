import { type Action } from "document-model";
import type {
  CreateCommentInput,
  DeleteCommentInput,
  EditCommentInput,
} from "../types.js";

export type CreateCommentAction = Action & {
  type: "CREATE_COMMENT";
  input: CreateCommentInput;
};
export type DeleteCommentAction = Action & {
  type: "DELETE_COMMENT";
  input: DeleteCommentInput;
};
export type EditCommentAction = Action & {
  type: "EDIT_COMMENT";
  input: EditCommentInput;
};

export type AtlasFeedbackIssuesCommentsAction =
  | CreateCommentAction
  | DeleteCommentAction
  | EditCommentAction;
