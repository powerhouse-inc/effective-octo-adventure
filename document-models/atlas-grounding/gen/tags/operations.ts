import { type SignalDispatch } from "document-model";
import { type AddTagsAction, type RemoveTagsAction } from "./actions.js";
import { type AtlasGroundingState } from "../types.js";

export interface AtlasGroundingTagsOperations {
  addTagsOperation: (
    state: AtlasGroundingState,
    action: AddTagsAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeTagsOperation: (
    state: AtlasGroundingState,
    action: RemoveTagsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
