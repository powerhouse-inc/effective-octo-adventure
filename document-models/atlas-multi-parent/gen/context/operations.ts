import { type SignalDispatch } from "document-model";
import {
  type AddContextDataAction,
  type RemoveContextDataAction,
  type SetProvenanceAction,
  type SetNotionIdAction,
  type AddReferenceAction,
  type RemoveReferenceAction,
} from "./actions.js";
import { type AtlasMultiParentState } from "../types.js";

export interface AtlasMultiParentContextOperations {
  addContextDataOperation: (
    state: AtlasMultiParentState,
    action: AddContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeContextDataOperation: (
    state: AtlasMultiParentState,
    action: RemoveContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  setProvenanceOperation: (
    state: AtlasMultiParentState,
    action: SetProvenanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  setNotionIdOperation: (
    state: AtlasMultiParentState,
    action: SetNotionIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  addReferenceOperation: (
    state: AtlasMultiParentState,
    action: AddReferenceAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeReferenceOperation: (
    state: AtlasMultiParentState,
    action: RemoveReferenceAction,
    dispatch?: SignalDispatch,
  ) => void;
}
