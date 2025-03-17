import { createAction } from "document-model";
import {
  z,
  type AddContextDataInput,
  type RemoveContextDataInput,
  type SetProvenanceInput,
  type SetNotionIdInput,
  type AddReferenceInput,
  type RemoveReferenceInput,
} from "../types.js";
import {
  type AddContextDataAction,
  type RemoveContextDataAction,
  type SetProvenanceAction,
  type SetNotionIdAction,
  type AddReferenceAction,
  type RemoveReferenceAction,
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

export const setProvenance = (input: SetProvenanceInput) =>
  createAction<SetProvenanceAction>(
    "SET_PROVENANCE",
    { ...input },
    undefined,
    z.SetProvenanceInputSchema,
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

export const addReference = (input: AddReferenceInput) =>
  createAction<AddReferenceAction>(
    "ADD_REFERENCE",
    { ...input },
    undefined,
    z.AddReferenceInputSchema,
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
