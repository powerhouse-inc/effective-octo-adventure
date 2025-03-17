import { createAction } from "document-model";
import {
  z,
  type SetMultiparentNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type AddParentInput,
  type SetAtlasTypeInput,
  type RemoveParentInput,
} from "../types.js";
import {
  type SetMultiparentNameAction,
  type SetDocNumberAction,
  type SetContentAction,
  type SetMasterStatusAction,
  type AddParentAction,
  type SetAtlasTypeAction,
  type RemoveParentAction,
} from "./actions.js";

export const setMultiparentName = (input: SetMultiparentNameInput) =>
  createAction<SetMultiparentNameAction>(
    "SET_MULTIPARENT_NAME",
    { ...input },
    undefined,
    z.SetMultiparentNameInputSchema,
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

export const addParent = (input: AddParentInput) =>
  createAction<AddParentAction>(
    "ADD_PARENT",
    { ...input },
    undefined,
    z.AddParentInputSchema,
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

export const removeParent = (input: RemoveParentInput) =>
  createAction<RemoveParentAction>(
    "REMOVE_PARENT",
    { ...input },
    undefined,
    z.RemoveParentInputSchema,
    "global",
  );
