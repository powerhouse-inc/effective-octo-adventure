import { type SignalDispatch } from "document-model";
import {
  type AddContextDataAction,
  type RemoveContextDataAction,
  type SetNotionIdAction,
  type SetAdditionalGuidanceAction,
  type ReplaceContextDataAction,
} from "./actions.js";
import { type AtlasExploratoryState } from "../types.js";

export interface AtlasExploratoryContextOperations {
  addContextDataOperation: (
    state: AtlasExploratoryState,
    action: AddContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeContextDataOperation: (
    state: AtlasExploratoryState,
    action: RemoveContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  setNotionIdOperation: (
    state: AtlasExploratoryState,
    action: SetNotionIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  setAdditionalGuidanceOperation: (
    state: AtlasExploratoryState,
    action: SetAdditionalGuidanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  replaceContextDataOperation: (
    state: AtlasExploratoryState,
    action: ReplaceContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
}
