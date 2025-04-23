import { createAction } from "document-model";
import {
  z,
  type CreateCommentInput,
  type DeleteCommentInput,
  type EditCommentInput,
} from "../types.js";
import {
  type CreateCommentAction,
  type DeleteCommentAction,
  type EditCommentAction,
} from "./actions.js";

export const createComment = (input: CreateCommentInput) =>
  createAction<CreateCommentAction>(
    "CREATE_COMMENT",
    { ...input },
    undefined,
    z.CreateCommentInputSchema,
    "global",
  );

export const deleteComment = (input: DeleteCommentInput) =>
  createAction<DeleteCommentAction>(
    "DELETE_COMMENT",
    { ...input },
    undefined,
    z.DeleteCommentInputSchema,
    "global",
  );

export const editComment = (input: EditCommentInput) =>
  createAction<EditCommentAction>(
    "EDIT_COMMENT",
    { ...input },
    undefined,
    z.EditCommentInputSchema,
    "global",
  );
