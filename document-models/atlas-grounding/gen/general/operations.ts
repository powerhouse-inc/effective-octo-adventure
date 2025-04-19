import { type SignalDispatch } from "document-model";
import {
  type SetNameAction,
  type SetContentAction,
  type SetMasterStatusAction,
  type SetAtlasTypeAction,
  type SetParentAction,
  type SetDocumentNumberAction,
} from "./actions.js";
import { type AtlasGroundingState } from "../types.js";

export interface AtlasGroundingGeneralOperations {
  setNameOperation: (
    state: AtlasGroundingState,
    action: SetNameAction,
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
  setDocumentNumberOperation: (
    state: AtlasGroundingState,
    action: SetDocumentNumberAction,
    dispatch?: SignalDispatch,
  ) => void;
}
