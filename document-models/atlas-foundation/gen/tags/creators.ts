import { createAction } from "document-model";
import { z, type AddTagsInput, type RemoveTagsInput } from "../types.js";
import { type AddTagsAction, type RemoveTagsAction } from "./actions.js";

export const addTags = (input: AddTagsInput) =>
  createAction<AddTagsAction>(
    "ADD_TAGS",
    { ...input },
    undefined,
    z.AddTagsInputSchema,
    "global",
  );

export const removeTags = (input: RemoveTagsInput) =>
  createAction<RemoveTagsAction>(
    "REMOVE_TAGS",
    { ...input },
    undefined,
    z.RemoveTagsInputSchema,
    "global",
  );
