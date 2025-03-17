import { type SignalDispatch } from "document-model";
import {
  type SetFoundationNameAction,
  type SetDocNumberAction,
  type SetContentAction,
  type SetMasterStatusAction,
  type AddReferenceAction,
  type SetAtlasTypeAction,
  type RemoveReferenceAction,
  type SetParentAction,
} from "./actions.js";
import { type AtlasFoundationState } from "../types.js";

export interface AtlasFoundationGeneralOperations {
  setFoundationNameOperation: (
    state: AtlasFoundationState,
    action: SetFoundationNameAction,
    dispatch?: SignalDispatch,
  ) => void;
  setDocNumberOperation: (
    state: AtlasFoundationState,
    action: SetDocNumberAction,
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
  addReferenceOperation: (
    state: AtlasFoundationState,
    action: AddReferenceAction,
    dispatch?: SignalDispatch,
  ) => void;
  setAtlasTypeOperation: (
    state: AtlasFoundationState,
    action: SetAtlasTypeAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeReferenceOperation: (
    state: AtlasFoundationState,
    action: RemoveReferenceAction,
    dispatch?: SignalDispatch,
  ) => void;
  setParentOperation: (
    state: AtlasFoundationState,
    action: SetParentAction,
    dispatch?: SignalDispatch,
  ) => void;
}
