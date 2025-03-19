import { type BaseAction } from "document-model";
import type {
  SetScopeNameInput,
  SetDocNumberInput,
  SetContentInput,
  SetMasterStatusInput,
} from "../types.js";

export type SetScopeNameAction = BaseAction<
  "SET_SCOPE_NAME",
  SetScopeNameInput,
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

export type AtlasScopeGeneralAction =
  | SetScopeNameAction
  | SetDocNumberAction
  | SetContentAction
  | SetMasterStatusAction;
