import { type AtlasFoundationContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasFoundationContextOperations = {
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
};
