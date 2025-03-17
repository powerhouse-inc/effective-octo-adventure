import { type SignalDispatch } from "document-model";
import {
  type SetMultiparentNameAction,
  type SetDocNumberAction,
  type SetContentAction,
  type SetMasterStatusAction,
  type AddParentAction,
  type SetAtlasTypeAction,
  type RemoveParentAction,
} from "./actions.js";
import { type AtlasMultiParentState } from "../types.js";

export interface AtlasMultiParentGeneralOperations {
  setMultiparentNameOperation: (
    state: AtlasMultiParentState,
    action: SetMultiparentNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDocNumberOperation: (
    state: AtlasMultiParentState,
    action: SetDocNumberAction,
    dispatch?: SignalDispatch,
  ) => void;
  setContentOperation: (
    state: AtlasMultiParentState,
    action: SetContentAction,
    dispatch?: SignalDispatch,
  ) => void;
  setMasterStatusOperation: (
    state: AtlasMultiParentState,
    action: SetMasterStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  addParentOperation: (
    state: AtlasMultiParentState,
    action: AddParentAction,
    dispatch?: SignalDispatch,
  ) => void;
  setAtlasTypeOperation: (
    state: AtlasMultiParentState,
    action: SetAtlasTypeAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeParentOperation: (
    state: AtlasMultiParentState,
    action: RemoveParentAction,
    dispatch?: SignalDispatch,
  ) => void;
}
