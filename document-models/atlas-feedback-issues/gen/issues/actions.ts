import { type BaseAction } from "document-model";
import type {
  CreateIssueInput,
  DeleteIssueInput,
  AddNotionIdInput,
  RemoveNotionIdInput,
} from "../types.js";

export type CreateIssueAction = BaseAction<
  "CREATE_ISSUE",
  CreateIssueInput,
  "global"
>;
export type DeleteIssueAction = BaseAction<
  "DELETE_ISSUE",
  DeleteIssueInput,
  "global"
>;
export type AddNotionIdAction = BaseAction<
  "ADD_NOTION_ID",
  AddNotionIdInput,
  "global"
>;
export type RemoveNotionIdAction = BaseAction<
  "REMOVE_NOTION_ID",
  RemoveNotionIdInput,
  "global"
>;

export type AtlasFeedbackIssuesIssuesAction =
  | CreateIssueAction
  | DeleteIssueAction
  | AddNotionIdAction
  | RemoveNotionIdAction;
