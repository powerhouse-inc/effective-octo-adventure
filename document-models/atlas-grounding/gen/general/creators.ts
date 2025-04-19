import { createAction } from "document-model";
import {
  z,
  type SetNameInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type SetAtlasTypeInput,
  type SetParentInput,
  type SetDocumentNumberInput,
} from "../types.js";
import {
  type SetNameAction,
  type SetContentAction,
  type SetMasterStatusAction,
  type SetAtlasTypeAction,
  type SetParentAction,
  type SetDocumentNumberAction,
} from "./actions.js";

export const setName = (input: SetNameInput) =>
  createAction<SetNameAction>(
    "SET_NAME",
    { ...input },
    undefined,
    z.SetNameInputSchema,
    "global",
  );

export const setContent = (input: SetContentInput) =>
  createAction<SetContentAction>(
    "SET_CONTENT",
    { ...input },
    undefined,
    z.SetContentInputSchema,
    "global",
  );

export const setMasterStatus = (input: SetMasterStatusInput) =>
  createAction<SetMasterStatusAction>(
    "SET_MASTER_STATUS",
    { ...input },
    undefined,
    z.SetMasterStatusInputSchema,
    "global",
  );

export const setAtlasType = (input: SetAtlasTypeInput) =>
  createAction<SetAtlasTypeAction>(
    "SET_ATLAS_TYPE",
    { ...input },
    undefined,
    z.SetAtlasTypeInputSchema,
    "global",
  );

export const setParent = (input: SetParentInput) =>
  createAction<SetParentAction>(
    "SET_PARENT",
    { ...input },
    undefined,
    z.SetParentInputSchema,
    "global",
  );

export const setDocumentNumber = (input: SetDocumentNumberInput) =>
  createAction<SetDocumentNumberAction>(
    "SET_DOCUMENT_NUMBER",
    { ...input },
    undefined,
    z.SetDocumentNumberInputSchema,
    "global",
  );
