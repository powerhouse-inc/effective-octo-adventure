import { type SignalDispatch } from "document-model";
import {
  type SetScopeNameAction,
  type SetDocNumberAction,
  type SetContentAction,
  type SetMasterStatusAction,
} from "./actions.js";
import { type AtlasScopeState } from "../types.js";

export interface AtlasScopeGeneralOperations {
  setScopeNameOperation: (
    state: AtlasScopeState,
    action: SetScopeNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDocNumberOperation: (
    state: AtlasScopeState,
    action: SetDocNumberAction,
    dispatch?: SignalDispatch,
  ) => void;
  setContentOperation: (
    state: AtlasScopeState,
    action: SetContentAction,
    dispatch?: SignalDispatch,
  ) => void;
  setMasterStatusOperation: (
    state: AtlasScopeState,
    action: SetMasterStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
}
