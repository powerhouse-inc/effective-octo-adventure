import { type SignalDispatch } from "document-model";
import {
  type AddContextDataAction,
  type RemoveContextDataAction,
  type SetProvenanceAction,
  type SetNotionIdAction,
  type AddAdditionalGuidanceAction,
  type RemoveAdditionalGuidanceAction,
} from "./actions.js";
import { type AtlasExploratoryState } from "../types.js";

export interface AtlasExploratoryContextOperations {
  addContextDataOperation: (
    state: AtlasExploratoryState,
    action: AddContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeContextDataOperation: (
    state: AtlasExploratoryState,
    action: RemoveContextDataAction,
    dispatch?: SignalDispatch,
  ) => void;
  setProvenanceOperation: (
    state: AtlasExploratoryState,
    action: SetProvenanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  setNotionIdOperation: (
    state: AtlasExploratoryState,
    action: SetNotionIdAction,
    dispatch?: SignalDispatch,
  ) => void;
  addAdditionalGuidanceOperation: (
    state: AtlasExploratoryState,
    action: AddAdditionalGuidanceAction,
    dispatch?: SignalDispatch,
  ) => void;
  removeAdditionalGuidanceOperation: (
    state: AtlasExploratoryState,
    action: RemoveAdditionalGuidanceAction,
    dispatch?: SignalDispatch,
  ) => void;
}
