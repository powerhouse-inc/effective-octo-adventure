import { type Action } from "document-model";
import type {
  CreateIssueInput,
  DeleteIssueInput,
  AddNotionIdInput,
  RemoveNotionIdInput,
} from "../types.js";

export type CreateIssueAction = Action & {
  type: "CREATE_ISSUE";
  input: CreateIssueInput;
};
export type DeleteIssueAction = Action & {
  type: "DELETE_ISSUE";
  input: DeleteIssueInput;
};
export type AddNotionIdAction = Action & {
  type: "ADD_NOTION_ID";
  input: AddNotionIdInput;
};
export type RemoveNotionIdAction = Action & {
  type: "REMOVE_NOTION_ID";
  input: RemoveNotionIdInput;
};

export type AtlasFeedbackIssuesIssuesAction =
  | CreateIssueAction
  | DeleteIssueAction
  | AddNotionIdAction
  | RemoveNotionIdAction;
