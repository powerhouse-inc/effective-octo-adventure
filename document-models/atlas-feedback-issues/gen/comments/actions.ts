import { type BaseAction } from "document-model";
import type {
  CreateCommentInput,
  DeleteCommentInput,
  EditCommentInput,
} from "../types.js";

export type CreateCommentAction = BaseAction<
  "CREATE_COMMENT",
  CreateCommentInput,
  "global"
>;
export type DeleteCommentAction = BaseAction<
  "DELETE_COMMENT",
  DeleteCommentInput,
  "global"
>;
export type EditCommentAction = BaseAction<
  "EDIT_COMMENT",
  EditCommentInput,
  "global"
>;

export type AtlasFeedbackIssuesCommentsAction =
  | CreateCommentAction
  | DeleteCommentAction
  | EditCommentAction;
