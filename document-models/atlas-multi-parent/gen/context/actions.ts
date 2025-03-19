import { type BaseAction } from "document-model";
import type {
  AddContextDataInput,
  RemoveContextDataInput,
  SetProvenanceInput,
  SetNotionIdInput,
  AddReferenceInput,
  RemoveReferenceInput,
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
export type AddReferenceAction = BaseAction<
  "ADD_REFERENCE",
  AddReferenceInput,
  "global"
>;
export type RemoveReferenceAction = BaseAction<
  "REMOVE_REFERENCE",
  RemoveReferenceInput,
  "global"
>;

export type AtlasMultiParentContextAction =
  | AddContextDataAction
  | RemoveContextDataAction
  | SetProvenanceAction
  | SetNotionIdAction
  | AddReferenceAction
  | RemoveReferenceAction;
