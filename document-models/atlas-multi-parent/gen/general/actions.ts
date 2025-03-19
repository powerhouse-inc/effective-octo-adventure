import { type BaseAction } from "document-model";
import type {
  SetMultiparentNameInput,
  SetDocNumberInput,
  SetContentInput,
  SetMasterStatusInput,
  AddParentInput,
  SetAtlasTypeInput,
  RemoveParentInput,
} from "../types.js";

export type SetMultiparentNameAction = BaseAction<
  "SET_MULTIPARENT_NAME",
  SetMultiparentNameInput,
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
export type AddParentAction = BaseAction<
  "ADD_PARENT",
  AddParentInput,
  "global"
>;
export type SetAtlasTypeAction = BaseAction<
  "SET_ATLAS_TYPE",
  SetAtlasTypeInput,
  "global"
>;
export type RemoveParentAction = BaseAction<
  "REMOVE_PARENT",
  RemoveParentInput,
  "global"
>;

export type AtlasMultiParentGeneralAction =
  | SetMultiparentNameAction
  | SetDocNumberAction
  | SetContentAction
  | SetMasterStatusAction
  | AddParentAction
  | SetAtlasTypeAction
  | RemoveParentAction;
