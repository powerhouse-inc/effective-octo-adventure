import { type SignalDispatch } from "document-model";
import {
  type AddContextDataAction,
  type RemoveContextDataAction,
  type SetNotionIdAction,
  type ReplaceContextDataAction,
} from "./actions.js";
import { type AtlasGroundingState } from "../types.js";

export interface AtlasGroundingContextOperations {
  addContextDataOperation: (
    state: AtlasGroundingState,
    action: AddContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeContextDataOperation: (
    state: AtlasGroundingState,
    action: RemoveContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  setNotionIdOperation: (
    state: AtlasGroundingState,
    action: SetNotionIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  replaceContextDataOperation: (
    state: AtlasGroundingState,
    action: ReplaceContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
}
