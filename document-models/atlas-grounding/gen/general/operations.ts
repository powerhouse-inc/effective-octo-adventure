import { type SignalDispatch } from "document-model";
import {
  type SetGroundingNameAction,
  type SetDocNumberAction,
  type SetContentAction,
  type SetMasterStatusAction,
  type SetAtlasTypeAction,
  type SetParentAction,
} from "./actions.js";
import { type AtlasGroundingState } from "../types.js";

export interface AtlasGroundingGeneralOperations {
  setGroundingNameOperation: (
    state: AtlasGroundingState,
    action: SetGroundingNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDocNumberOperation: (
    state: AtlasGroundingState,
    action: SetDocNumberAction,
    dispatch?: SignalDispatch,
  ) => void;
  setContentOperation: (
    state: AtlasGroundingState,
    action: SetContentAction,
    dispatch?: SignalDispatch,
  ) => void;
  setMasterStatusOperation: (
    state: AtlasGroundingState,
    action: SetMasterStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  setAtlasTypeOperation: (
    state: AtlasGroundingState,
    action: SetAtlasTypeAction,
    dispatch?: SignalDispatch,
  ) => void;
  setParentOperation: (
    state: AtlasGroundingState,
    action: SetParentAction,
    dispatch?: SignalDispatch,
  ) => void;
}
