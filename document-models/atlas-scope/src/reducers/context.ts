/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { type AtlasScopeContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasScopeContextOperations = {
  addContextDataOperation(state, action, dispatch) {
    const newContextData = {
      id: action.input.id,
      name: action.input.name || null,
      docNo: action.input.docNo || null,
    };
    state.originalContextData=[newContextData,...state.originalContextData];
  },

  removeContextDataOperation(state, action, dispatch) {
    state.originalContextData = []
  },
  setProvenanceOperation(state, action, dispatch) {
    state.provenance = action.input.provenance || null;
  },

  setNotionIdOperation(state, action, dispatch) {
    state.notionId = action.input.notionID || null;
  },
};
