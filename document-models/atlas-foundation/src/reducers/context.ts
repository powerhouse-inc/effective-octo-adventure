import { type AtlasFoundationContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasFoundationContextOperations = {
  // TODO: Implement addContextDataOperation here and in schema
  // addContextDataOperation(state, action, dispatch) {
  //   state.originalContextData = state.originalContextData.filter(
  //     (ocd) => ocd.id !== action.input.id,
  //   );

  //   state.originalContextData.push({
  //     id: action.input.id,
  //     name: action.input.name || null,
  //     docNo: action.input.docNo || null,
  //   });
  // },
  // TODO: Implement addContextDataOperation here and in schema
  // removeContextDataOperation(state, action, dispatch) {
  //   state.originalContextData = state.originalContextData.filter(
  //     (ocd) => ocd.id !== action.input.id,
  //   );
  // }

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
