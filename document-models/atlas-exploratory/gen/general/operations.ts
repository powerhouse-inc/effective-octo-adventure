import { type SignalDispatch } from "document-model";
import {
  type SetNameAction,
  type SetContentAction,
  type SetMasterStatusAction,
  type SetParentAction,
  type SetAtlasTypeAction,
  type SetFindingsAction,
  type SetDocumentNumberAction,
} from "./actions.js";
import { type AtlasExploratoryState } from "../types.js";

export interface AtlasExploratoryGeneralOperations {
  setNameOperation: (
    state: AtlasExploratoryState,
    action: SetNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setContentOperation: (
    state: AtlasExploratoryState,
    action: SetContentAction,
    dispatch?: SignalDispatch,
  ) => void;
  setMasterStatusOperation: (
    state: AtlasExploratoryState,
    action: SetMasterStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  setParentOperation: (
    state: AtlasExploratoryState,
    action: SetParentAction,
    dispatch?: SignalDispatch,
  ) => void;
  setAtlasTypeOperation: (
    state: AtlasExploratoryState,
    action: SetAtlasTypeAction,
    dispatch?: SignalDispatch,
  ) => void;
  setFindingsOperation: (
    state: AtlasExploratoryState,
    action: SetFindingsAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDocumentNumberOperation: (
    state: AtlasExploratoryState,
    action: SetDocumentNumberAction,
    dispatch?: SignalDispatch,
  ) => void;
}
