import { type SignalDispatch } from "document-model";
import {
  type SetNameAction,
  type SetContentAction,
  type SetMasterStatusAction,
  type SetAtlasTypeAction,
  type SetParentAction,
  type SetDocumentNumberAction,
} from "./actions.js";
import { type AtlasFoundationState } from "../types.js";

export interface AtlasFoundationGeneralOperations {
  setNameOperation: (
    state: AtlasFoundationState,
    action: SetNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setContentOperation: (
    state: AtlasFoundationState,
    action: SetContentAction,
    dispatch?: SignalDispatch,
  ) => void;
  setMasterStatusOperation: (
    state: AtlasFoundationState,
    action: SetMasterStatusAction,
    dispatch?: SignalDispatch,
  ) => void;
  setAtlasTypeOperation: (
    state: AtlasFoundationState,
    action: SetAtlasTypeAction,
    dispatch?: SignalDispatch,
  ) => void;
  setParentOperation: (
    state: AtlasFoundationState,
    action: SetParentAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDocumentNumberOperation: (
    state: AtlasFoundationState,
    action: SetDocumentNumberAction,
    dispatch?: SignalDispatch,
  ) => void;
}
