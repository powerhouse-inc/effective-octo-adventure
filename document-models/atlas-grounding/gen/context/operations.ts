import { type SignalDispatch } from "document-model";
import {
  type AddContextDataAction,
  type RemoveContextDataAction,
  type SetProvenanceAction,
  type SetNotionIdAction,
  type AddReferenceAction,
  type RemoveReferenceAction,
} from "./actions.js";
import { type AtlasGroundingState } from "../types.js";

export interface AtlasGroundingContextOperations {
  addContextDataOperation: (
    state: AtlasGroundingState,
    action: AddContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeContextDataOperation: (
    state: AtlasGroundingState,
    action: RemoveContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  setProvenanceOperation: (
    state: AtlasGroundingState,
    action: SetProvenanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  setNotionIdOperation: (
    state: AtlasGroundingState,
    action: SetNotionIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  addReferenceOperation: (
    state: AtlasGroundingState,
    action: AddReferenceAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeReferenceOperation: (
    state: AtlasGroundingState,
    action: RemoveReferenceAction,
    dispatch?: SignalDispatch,
  ) => void;
}
