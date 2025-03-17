import { createAction } from "document-model";
import {
  z,
  type SetScopeNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
} from "../types.js";
import {
  type SetScopeNameAction,
  type SetDocNumberAction,
  type SetContentAction,
  type SetMasterStatusAction,
} from "./actions.js";

export const setScopeName = (input: SetScopeNameInput) =>
  createAction<SetScopeNameAction>(
    "SET_SCOPE_NAME",
    { ...input },
    undefined,
    z.SetScopeNameInputSchema,
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
