import { type BaseAction } from "document-model";
import type {
  SetNameInput,
  SetContentInput,
  SetMasterStatusInput,
  SetParentInput,
  SetAtlasTypeInput,
  SetFindingsInput,
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
export type SetParentAction = BaseAction<
  "SET_PARENT",
  SetParentInput,
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
export type SetDocumentNumberAction = BaseAction<
  "SET_DOCUMENT_NUMBER",
  SetDocumentNumberInput,
  "global"
>;

export type AtlasExploratoryGeneralAction =
  | SetNameAction
  | SetContentAction
  | SetMasterStatusAction
  | SetParentAction
  | SetAtlasTypeAction
  | SetFindingsAction
  | SetDocumentNumberAction;
