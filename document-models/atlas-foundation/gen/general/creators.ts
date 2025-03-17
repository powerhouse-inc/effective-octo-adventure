import { createAction } from "document-model";
import {
  z,
  type SetFoundationNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type AddReferenceInput,
  type SetAtlasTypeInput,
  type RemoveReferenceInput,
  type SetParentInput,
} from "../types.js";
import {
  type SetFoundationNameAction,
  type SetDocNumberAction,
  type SetContentAction,
  type SetMasterStatusAction,
  type AddReferenceAction,
  type SetAtlasTypeAction,
  type RemoveReferenceAction,
  type SetParentAction,
} from "./actions.js";

export const setFoundationName = (input: SetFoundationNameInput) =>
  createAction<SetFoundationNameAction>(
    "SET_FOUNDATION_NAME",
    { ...input },
    undefined,
    z.SetFoundationNameInputSchema,
    "global",
  );

export const setDocNumber = (input: SetDocNumberInput) =>
  createAction<SetDocNumberAction>(
    "SET_DOC_NUMBER",
    { ...input },
    undefined,
    z.SetDocNumberInputSchema,
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

export const addReference = (input: AddReferenceInput) =>
  createAction<AddReferenceAction>(
    "ADD_REFERENCE",
    { ...input },
    undefined,
    z.AddReferenceInputSchema,
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

export const removeReference = (input: RemoveReferenceInput) =>
  createAction<RemoveReferenceAction>(
    "REMOVE_REFERENCE",
    { ...input },
    undefined,
    z.RemoveReferenceInputSchema,
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
