import { type BaseAction } from "document-model";
import type {
  SetNameInput,
  SetContentInput,
  SetMasterStatusInput,
  AddParentInput,
  SetAtlasTypeInput,
  RemoveParentInput,
  ReplaceParentInput,
} from "../types.js";

export type SetNameAction = BaseAction<"SET_NAME", SetNameInput, "global">;
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
export type ReplaceParentAction = BaseAction<
  "REPLACE_PARENT",
  ReplaceParentInput,
  "global"
>;

export type AtlasMultiParentGeneralAction =
  | SetNameAction
  | SetContentAction
  | SetMasterStatusAction
  | AddParentAction
  | SetAtlasTypeAction
  | RemoveParentAction
  | ReplaceParentAction;
