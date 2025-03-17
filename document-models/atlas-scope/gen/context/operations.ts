import { type SignalDispatch } from "document-model";
import {
  type AddContextDataAction,
  type RemoveContextDataAction,
  type SetProvenanceAction,
  type SetNotionIdAction,
} from "./actions.js";
import { type AtlasScopeState } from "../types.js";

export interface AtlasScopeContextOperations {
  addContextDataOperation: (
    state: AtlasScopeState,
    action: AddContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeContextDataOperation: (
    state: AtlasScopeState,
    action: RemoveContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  setProvenanceOperation: (
    state: AtlasScopeState,
    action: SetProvenanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  setNotionIdOperation: (
    state: AtlasScopeState,
    action: SetNotionIdAction,
    dispatch?: SignalDispatch,
  ) => void;
}
