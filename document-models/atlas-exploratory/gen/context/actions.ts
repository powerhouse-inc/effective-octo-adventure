import { type BaseAction } from "document-model";
import type {
  AddContextDataInput,
  RemoveContextDataInput,
  SetNotionIdInput,
  SetAdditionalGuidanceInput,
  ReplaceContextDataInput,
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
export type SetNotionIdAction = BaseAction<
  "SET_NOTION_ID",
  SetNotionIdInput,
  "global"
>;
export type SetAdditionalGuidanceAction = BaseAction<
  "SET_ADDITIONAL_GUIDANCE",
  SetAdditionalGuidanceInput,
  "global"
>;
export type ReplaceContextDataAction = BaseAction<
  "REPLACE_CONTEXT_DATA",
  ReplaceContextDataInput,
  "global"
>;

export type AtlasExploratoryContextAction =
  | AddContextDataAction
  | RemoveContextDataAction
  | SetNotionIdAction
  | SetAdditionalGuidanceAction
  | ReplaceContextDataAction;
