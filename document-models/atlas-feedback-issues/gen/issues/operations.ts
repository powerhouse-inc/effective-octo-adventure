import { type SignalDispatch } from "document-model";
import {
  type CreateIssueAction,
  type DeleteIssueAction,
  type AddNotionIdAction,
  type RemoveNotionIdAction,
} from "./actions.js";
import { type AtlasFeedbackIssuesState } from "../types.js";

export interface AtlasFeedbackIssuesIssuesOperations {
  createIssueOperation: (
    state: AtlasFeedbackIssuesState,
    action: CreateIssueAction,
    dispatch?: SignalDispatch,
  ) => void;
  deleteIssueOperation: (
    state: AtlasFeedbackIssuesState,
    action: DeleteIssueAction,
    dispatch?: SignalDispatch,
  ) => void;
  addNotionIdOperation: (
    state: AtlasFeedbackIssuesState,
    action: AddNotionIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeNotionIdOperation: (
    state: AtlasFeedbackIssuesState,
    action: RemoveNotionIdAction,
    dispatch?: SignalDispatch,
  ) => void;
}
