import {
  type StateReducer,
  isDocumentAction,
  createReducer,
} from "document-model";
import { type AtlasMultiParentDocument, z } from "./types.js";

import { reducer as GeneralReducer } from "../src/reducers/general.js";
import { reducer as TagsReducer } from "../src/reducers/tags.js";
import { reducer as ContextReducer } from "../src/reducers/context.js";

const stateReducer: StateReducer<AtlasMultiParentDocument> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "SET_MULTIPARENT_NAME":
      z.SetMultiparentNameInputSchema().parse(action.input);
      GeneralReducer.setMultiparentNameOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "SET_DOC_NUMBER":
      z.SetDocNumberInputSchema().parse(action.input);
      GeneralReducer.setDocNumberOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "SET_CONTENT":
      z.SetContentInputSchema().parse(action.input);
      GeneralReducer.setContentOperation(state[action.scope], action, dispatch);
      break;

    case "SET_MASTER_STATUS":
      z.SetMasterStatusInputSchema().parse(action.input);
      GeneralReducer.setMasterStatusOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "ADD_PARENT":
      z.AddParentInputSchema().parse(action.input);
      GeneralReducer.addParentOperation(state[action.scope], action, dispatch);
      break;

    case "SET_ATLAS_TYPE":
      z.SetAtlasTypeInputSchema().parse(action.input);
      GeneralReducer.setAtlasTypeOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "REMOVE_PARENT":
      z.RemoveParentInputSchema().parse(action.input);
      GeneralReducer.removeParentOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "ADD_TAGS":
      z.AddTagsInputSchema().parse(action.input);
      TagsReducer.addTagsOperation(state[action.scope], action, dispatch);
      break;

    case "REMOVE_TAGS":
      z.RemoveTagsInputSchema().parse(action.input);
      TagsReducer.removeTagsOperation(state[action.scope], action, dispatch);
      break;

    case "ADD_CONTEXT_DATA":
      z.AddContextDataInputSchema().parse(action.input);
      ContextReducer.addContextDataOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "REMOVE_CONTEXT_DATA":
      z.RemoveContextDataInputSchema().parse(action.input);
      ContextReducer.removeContextDataOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "SET_PROVENANCE":
      z.SetProvenanceInputSchema().parse(action.input);
      ContextReducer.setProvenanceOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "SET_NOTION_ID":
      z.SetNotionIdInputSchema().parse(action.input);
      ContextReducer.setNotionIdOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "ADD_REFERENCE":
      z.AddReferenceInputSchema().parse(action.input);
      ContextReducer.addReferenceOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "REMOVE_REFERENCE":
      z.RemoveReferenceInputSchema().parse(action.input);
      ContextReducer.removeReferenceOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<AtlasMultiParentDocument>(stateReducer);
