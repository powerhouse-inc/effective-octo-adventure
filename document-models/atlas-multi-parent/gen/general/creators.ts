import { createAction } from "document-model";
import {
  z,
  type SetNameInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type AddParentInput,
  type SetAtlasTypeInput,
  type RemoveParentInput,
  type ReplaceParentInput,
} from "../types.js";
import {
  type SetNameAction,
  type SetContentAction,
  type SetMasterStatusAction,
  type AddParentAction,
  type SetAtlasTypeAction,
  type RemoveParentAction,
  type ReplaceParentAction,
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

export const replaceParent = (input: ReplaceParentInput) =>
  createAction<ReplaceParentAction>(
    "REPLACE_PARENT",
    { ...input },
    undefined,
    z.ReplaceParentInputSchema,
    "global",
  );
