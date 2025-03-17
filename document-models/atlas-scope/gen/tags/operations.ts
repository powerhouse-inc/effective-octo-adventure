import { type SignalDispatch } from "document-model";
import { type AddTagsAction, type RemoveTagsAction } from "./actions.js";
import { type AtlasScopeState } from "../types.js";

export interface AtlasScopeTagsOperations {
  addTagsOperation: (
    state: AtlasScopeState,
    action: AddTagsAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeTagsOperation: (
    state: AtlasScopeState,
    action: RemoveTagsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
