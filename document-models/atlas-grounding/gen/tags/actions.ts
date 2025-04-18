import { type BaseAction } from "document-model";
import type { AddTagsInput, RemoveTagsInput } from "../types.js";

export type AddTagsAction = BaseAction<"ADD_TAGS", AddTagsInput, "global">;
export type RemoveTagsAction = BaseAction<
  "REMOVE_TAGS",
  RemoveTagsInput,
  "global"
>;

export type AtlasGroundingTagsAction = AddTagsAction | RemoveTagsAction;
