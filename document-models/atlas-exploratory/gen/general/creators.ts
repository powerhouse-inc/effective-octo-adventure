import { createAction } from "document-model";
import {
  z,
  type SetExploratoryNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type SetParentInput,
  type RemoveParentInput,
  type SetAtlasTypeInput,
  type SetFindingsInput,
} from "../types.js";
import {
  type SetExploratoryNameAction,
  type SetDocNumberAction,
  type SetContentAction,
  type SetMasterStatusAction,
  type SetParentAction,
  type RemoveParentAction,
  type SetAtlasTypeAction,
  type SetFindingsAction,
} from "./actions.js";

export const setExploratoryName = (input: SetExploratoryNameInput) =>
  createAction<SetExploratoryNameAction>(
    "SET_EXPLORATORY_NAME",
    { ...input },
    undefined,
    z.SetExploratoryNameInputSchema,
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

export const setParent = (input: SetParentInput) =>
  createAction<SetParentAction>(
    "SET_PARENT",
    { ...input },
    undefined,
    z.SetParentInputSchema,
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

export const setAtlasType = (input: SetAtlasTypeInput) =>
  createAction<SetAtlasTypeAction>(
    "SET_ATLAS_TYPE",
    { ...input },
    undefined,
    z.SetAtlasTypeInputSchema,
    "global",
  );

export const setFindings = (input: SetFindingsInput) =>
  createAction<SetFindingsAction>(
    "SET_FINDINGS",
    { ...input },
    undefined,
    z.SetFindingsInputSchema,
    "global",
  );
