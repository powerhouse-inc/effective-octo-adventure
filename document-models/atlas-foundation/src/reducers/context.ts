import { type AtlasFoundationContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasFoundationContextOperations = {
  addContextDataOperation(state, action, dispatch) {
    state.originalContextData = state.originalContextData.filter(
      (ocd) => ocd.id !== action.input.id,
    );

    state.originalContextData.push({
      id: action.input.id,
      name: action.input.name || null,
      docNo: action.input.docNo || null,
    });
  },

  removeContextDataOperation(state, action, dispatch) {
    state.originalContextData = state.originalContextData.filter(
      (ocd) => ocd.id !== action.input.id,
    );
  },

  setProvenanceOperation(state, action, dispatch) {
    state.provenance = action.input.provenance;
  },

  setNotionIdOperation(state, action, dispatch) {
    state.notionId = action.input.notionID;
  },
};
