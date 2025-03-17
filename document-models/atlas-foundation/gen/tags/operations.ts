import { type SignalDispatch } from "document-model";
import { type AddTagsAction, type RemoveTagsAction } from "./actions.js";
import { type AtlasFoundationState } from "../types.js";

export interface AtlasFoundationTagsOperations {
  addTagsOperation: (
    state: AtlasFoundationState,
    action: AddTagsAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeTagsOperation: (
    state: AtlasFoundationState,
    action: RemoveTagsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
