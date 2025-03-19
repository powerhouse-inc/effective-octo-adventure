import { type BaseAction } from "document-model";
import type {
  AddContextDataInput,
  RemoveContextDataInput,
  SetProvenanceInput,
  SetNotionIdInput,
  AddAdditionalGuidanceInput,
  RemoveAdditionalGuidanceInput,
} from "../types.js";

export type AddContextDataAction = BaseAction<
  "ADD_CONTEXT_DATA",
  AddContextDataInput,
  "global"
>;
export type RemoveContextDataAction = BaseAction<
  "REMOVE_CONTEXT_DATA",
  RemoveContextDataInput,
  "global"
>;
export type SetProvenanceAction = BaseAction<
  "SET_PROVENANCE",
  SetProvenanceInput,
  "global"
>;
export type SetNotionIdAction = BaseAction<
  "SET_NOTION_ID",
  SetNotionIdInput,
  "global"
>;
export type AddAdditionalGuidanceAction = BaseAction<
  "ADD_ADDITIONAL_GUIDANCE",
  AddAdditionalGuidanceInput,
  "global"
>;
export type RemoveAdditionalGuidanceAction = BaseAction<
  "REMOVE_ADDITIONAL_GUIDANCE",
  RemoveAdditionalGuidanceInput,
  "global"
>;

export type AtlasExploratoryContextAction =
  | AddContextDataAction
  | RemoveContextDataAction
  | SetProvenanceAction
  | SetNotionIdAction
  | AddAdditionalGuidanceAction
  | RemoveAdditionalGuidanceAction;
