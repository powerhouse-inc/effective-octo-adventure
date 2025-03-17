import { type SignalDispatch } from "document-model";
import { type AddTagsAction, type RemoveTagsAction } from "./actions.js";
import { type AtlasMultiParentState } from "../types.js";

export interface AtlasMultiParentTagsOperations {
  addTagsOperation: (
    state: AtlasMultiParentState,
    action: AddTagsAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeTagsOperation: (
    state: AtlasMultiParentState,
    action: RemoveTagsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
