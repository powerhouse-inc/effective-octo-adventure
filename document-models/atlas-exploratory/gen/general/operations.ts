import { type SignalDispatch } from "document-model";
import {
  type SetExploratoryNameAction,
  type SetDocNumberAction,
  type SetContentAction,
  type SetMasterStatusAction,
  type SetParentAction,
  type RemoveParentAction,
  type SetAtlasTypeAction,
  type SetFindingsAction,
} from "./actions.js";
import { type AtlasExploratoryState } from "../types.js";

export interface AtlasExploratoryGeneralOperations {
  setExploratoryNameOperation: (
    state: AtlasExploratoryState,
    action: SetExploratoryNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDocNumberOperation: (
    state: AtlasExploratoryState,
    action: SetDocNumberAction,
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
  removeParentOperation: (
    state: AtlasExploratoryState,
    action: RemoveParentAction,
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
}
