import { createAction } from "document-model/core";
import {
  z,
  type CreateIssueInput,
  type DeleteIssueInput,
  type AddNotionIdInput,
  type RemoveNotionIdInput,
} from "../types.js";
import {
  type CreateIssueAction,
  type DeleteIssueAction,
  type AddNotionIdAction,
  type RemoveNotionIdAction,
} from "./actions.js";

export const createIssue = (input: CreateIssueInput) =>
  createAction<CreateIssueAction>(
    "CREATE_ISSUE",
    { ...input },
    undefined,
    z.CreateIssueInputSchema,
    "global",
  );

export const deleteIssue = (input: DeleteIssueInput) =>
  createAction<DeleteIssueAction>(
    "DELETE_ISSUE",
    { ...input },
    undefined,
    z.DeleteIssueInputSchema,
    "global",
  );

export const addNotionId = (input: AddNotionIdInput) =>
  createAction<AddNotionIdAction>(
    "ADD_NOTION_ID",
    { ...input },
    undefined,
    z.AddNotionIdInputSchema,
    "global",
  );

export const removeNotionId = (input: RemoveNotionIdInput) =>
  createAction<RemoveNotionIdAction>(
    "REMOVE_NOTION_ID",
    { ...input },
    undefined,
    z.RemoveNotionIdInputSchema,
    "global",
  );
