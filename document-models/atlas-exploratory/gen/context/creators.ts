import { createAction } from "document-model";
import {
  z,
  type AddContextDataInput,
  type RemoveContextDataInput,
  type SetNotionIdInput,
  type SetAdditionalGuidanceInput,
  type ReplaceContextDataInput,
} from "../types.js";
import {
  type AddContextDataAction,
  type RemoveContextDataAction,
  type SetNotionIdAction,
  type SetAdditionalGuidanceAction,
  type ReplaceContextDataAction,
} from "./actions.js";

export const addContextData = (input: AddContextDataInput) =>
  createAction<AddContextDataAction>(
    "ADD_CONTEXT_DATA",
    { ...input },
    undefined,
    z.AddContextDataInputSchema,
    "global",
  );

export const removeContextData = (input: RemoveContextDataInput) =>
  createAction<RemoveContextDataAction>(
    "REMOVE_CONTEXT_DATA",
    { ...input },
    undefined,
    z.RemoveContextDataInputSchema,
    "global",
  );

export const setNotionId = (input: SetNotionIdInput) =>
  createAction<SetNotionIdAction>(
    "SET_NOTION_ID",
    { ...input },
    undefined,
    z.SetNotionIdInputSchema,
    "global",
  );

export const setAdditionalGuidance = (input: SetAdditionalGuidanceInput) =>
  createAction<SetAdditionalGuidanceAction>(
    "SET_ADDITIONAL_GUIDANCE",
    { ...input },
    undefined,
    z.SetAdditionalGuidanceInputSchema,
    "global",
  );

export const replaceContextData = (input: ReplaceContextDataInput) =>
  createAction<ReplaceContextDataAction>(
    "REPLACE_CONTEXT_DATA",
    { ...input },
    undefined,
    z.ReplaceContextDataInputSchema,
    "global",
  );
