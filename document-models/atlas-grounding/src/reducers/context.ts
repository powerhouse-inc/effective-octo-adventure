/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { type AtlasGroundingContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasGroundingContextOperations = {
  // TODO: change this when the UI is updated
  addContextDataOperation(state, action, dispatch) {
    const newContextData = {
      id: action.input.id,
      name: action.input.name || null,
      docNo: action.input.docNo || null,
    };
    state.originalContextData = [newContextData];
  },
  removeContextDataOperation(state, action, dispatch) {
    state.originalContextData = [];
  },

  setProvenanceOperation(state, action, dispatch) {
    state.provenance = action.input.provenance;
  },
  setNotionIdOperation(state, action, dispatch) {
    state.notionId = action.input.notionID;
  },
  // TODO: change this when the UI is updated
  addReferenceOperation(state, action, dispatch) {
    const newReference = {
      id: action.input.id,
      name: action.input.name || null,
      docNo: action.input.docNo || null,
    };
    state.references = [newReference];
  },
  removeReferenceOperation(state, action, dispatch) {
    state.references = [];
  },
};
