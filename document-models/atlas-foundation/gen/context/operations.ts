import { type SignalDispatch } from "document-model";
import {
  type AddContextDataAction,
  type RemoveContextDataAction,
  type SetNotionIdAction,
  type ReplaceContextDataAction,
} from "./actions.js";
import { type AtlasFoundationState } from "../types.js";

export interface AtlasFoundationContextOperations {
  addContextDataOperation: (
    state: AtlasFoundationState,
    action: AddContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeContextDataOperation: (
    state: AtlasFoundationState,
    action: RemoveContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  setNotionIdOperation: (
    state: AtlasFoundationState,
    action: SetNotionIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  replaceContextDataOperation: (
    state: AtlasFoundationState,
    action: ReplaceContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
}
