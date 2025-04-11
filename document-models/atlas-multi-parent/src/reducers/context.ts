import { type AtlasMultiParentContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasMultiParentContextOperations = {


  addContextDataOperation(state, action, dispatch) {
    const newContextData = {
      id: action.input.id,
      name: action.input.name || null,
      docNo: action.input.docNo || null,
    };
    state.originalContextData = [newContextData, ...state.originalContextData];
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

  addReferenceOperation(state, action, dispatch) {
    const newReference = {
      id: action.input.id,
      name: action.input.name || null,
      docNo: action.input.docNo || null,
    }
      state.references = [newReference, ...state.references];
  },

  removeReferenceOperation(state, action, dispatch) {
    state.references = [];
  },
};
