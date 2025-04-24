import { type SignalDispatch } from "document-model";
import {
  type CreateCommentAction,
  type DeleteCommentAction,
  type EditCommentAction,
} from "./actions.js";
import { type AtlasFeedbackIssuesState } from "../types.js";

export interface AtlasFeedbackIssuesCommentsOperations {
  createCommentOperation: (
    state: AtlasFeedbackIssuesState,
    action: CreateCommentAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteCommentOperation: (
    state: AtlasFeedbackIssuesState,
    action: DeleteCommentAction,
    dispatch?: SignalDispatch,
  ) => void;
  editCommentOperation: (
    state: AtlasFeedbackIssuesState,
    action: EditCommentAction,
    dispatch?: SignalDispatch,
  ) => void;
}
