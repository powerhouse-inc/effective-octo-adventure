import { type BaseAction } from "document-model";
import type {
  SetNameInput,
  SetContentInput,
  SetMasterStatusInput,
  SetDocumentNumberInput,
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
export type SetDocumentNumberAction = BaseAction<
  "SET_DOCUMENT_NUMBER",
  SetDocumentNumberInput,
  "global"
>;

export type AtlasScopeGeneralAction =
  | SetNameAction
  | SetContentAction
  | SetMasterStatusAction
  | SetDocumentNumberAction;
