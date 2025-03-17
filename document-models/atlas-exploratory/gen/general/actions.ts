import { type BaseAction } from "document-model";
import {
  type SetExploratoryNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type SetParentInput,
  type RemoveParentInput,
  type SetAtlasTypeInput,
  type SetFindingsInput,
} from "../types.js";

export type SetExploratoryNameAction = BaseAction<
  "SET_EXPLORATORY_NAME",
  SetExploratoryNameInput,
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
export type SetParentAction = BaseAction<
  "SET_PARENT",
  SetParentInput,
  "global"
>;
export type RemoveParentAction = BaseAction<
  "REMOVE_PARENT",
  RemoveParentInput,
  "global"
>;
export type SetAtlasTypeAction = BaseAction<
  "SET_ATLAS_TYPE",
  SetAtlasTypeInput,
  "global"
>;
export type SetFindingsAction = BaseAction<
  "SET_FINDINGS",
  SetFindingsInput,
  "global"
>;

export type AtlasExploratoryGeneralAction =
  | SetExploratoryNameAction
  | SetDocNumberAction
  | SetContentAction
  | SetMasterStatusAction
  | SetParentAction
  | RemoveParentAction
  | SetAtlasTypeAction
  | SetFindingsAction;
