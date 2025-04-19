import { type SignalDispatch } from "document-model";
import {
  type AddContextDataAction,
  type RemoveContextDataAction,
  type ReplaceContextDataAction,
  type SetNotionIdAction,
} from "./actions.js";
import { type AtlasMultiParentState } from "../types.js";

export interface AtlasMultiParentContextOperations {
  addContextDataOperation: (
    state: AtlasMultiParentState,
    action: AddContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeContextDataOperation: (
    state: AtlasMultiParentState,
    action: RemoveContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  replaceContextDataOperation: (
    state: AtlasMultiParentState,
    action: ReplaceContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  setNotionIdOperation: (
    state: AtlasMultiParentState,
    action: SetNotionIdAction,
    dispatch?: SignalDispatch,
  ) => void;
}
