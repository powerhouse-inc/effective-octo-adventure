import { type SignalDispatch } from "document-model";
import { type AddTagsAction, type RemoveTagsAction } from "./actions.js";
import { type AtlasExploratoryState } from "../types.js";

export interface AtlasExploratoryTagsOperations {
  addTagsOperation: (
    state: AtlasExploratoryState,
    action: AddTagsAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeTagsOperation: (
    state: AtlasExploratoryState,
    action: RemoveTagsAction,
    dispatch?: SignalDispatch,
  ) => void;
}
