import { type BaseAction } from "document-model";
import {
  type SetGroundingNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type SetAtlasTypeInput,
  type SetParentInput,
} from "../types.js";

export type SetGroundingNameAction = BaseAction<
  "SET_GROUNDING_NAME",
  SetGroundingNameInput,
  "global"
>;
export type SetDocNumberAction = BaseAction<
  "SET_DOC_NUMBER",
  SetDocNumberInput,
  "global"
>;
export type SetContentAction = BaseAction<
  "SET_CONTENT",
  SetContentInput,
  "global"
>;
export type SetMasterStatusAction = BaseAction<
  "SET_MASTER_STATUS",
  SetMasterStatusInput,
  "global"
>;
export type SetAtlasTypeAction = BaseAction<
  "SET_ATLAS_TYPE",
  SetAtlasTypeInput,
  "global"
>;
export type SetParentAction = BaseAction<
  "SET_PARENT",
  SetParentInput,
  "global"
>;

export type AtlasGroundingGeneralAction =
  | SetGroundingNameAction
  | SetDocNumberAction
  | SetContentAction
  | SetMasterStatusAction
  | SetAtlasTypeAction
  | SetParentAction;
