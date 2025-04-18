import { type SignalDispatch } from "document-model";
import {
  type SetNameAction,
  type SetContentAction,
  type SetMasterStatusAction,
  type SetDocumentNumberAction,
} from "./actions.js";
import { type AtlasScopeState } from "../types.js";

export interface AtlasScopeGeneralOperations {
  setNameOperation: (
    state: AtlasScopeState,
    action: SetNameAction,
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
  setDocumentNumberOperation: (
    state: AtlasScopeState,
    action: SetDocumentNumberAction,
    dispatch?: SignalDispatch,
  ) => void;
}
