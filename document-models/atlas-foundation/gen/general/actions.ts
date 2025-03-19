import { type BaseAction } from "document-model";
import type {
  SetFoundationNameInput,
  SetDocNumberInput,
  SetContentInput,
  SetMasterStatusInput,
  AddReferenceInput,
  SetAtlasTypeInput,
  RemoveReferenceInput,
  SetParentInput,
} from "../types.js";

export type SetFoundationNameAction = BaseAction<
  "SET_FOUNDATION_NAME",
  SetFoundationNameInput,
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
export type AddReferenceAction = BaseAction<
  "ADD_REFERENCE",
  AddReferenceInput,
  "global"
>;
export type SetAtlasTypeAction = BaseAction<
  "SET_ATLAS_TYPE",
  SetAtlasTypeInput,
  "global"
>;
export type RemoveReferenceAction = BaseAction<
  "REMOVE_REFERENCE",
  RemoveReferenceInput,
  "global"
>;
export type SetParentAction = BaseAction<
  "SET_PARENT",
  SetParentInput,
  "global"
>;

export type AtlasFoundationGeneralAction =
  | SetFoundationNameAction
  | SetDocNumberAction
  | SetContentAction
  | SetMasterStatusAction
  | AddReferenceAction
  | SetAtlasTypeAction
  | RemoveReferenceAction
  | SetParentAction;
