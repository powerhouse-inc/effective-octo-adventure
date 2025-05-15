import { type AtlasFoundationContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasFoundationContextOperations = {
  addContextDataOperation(state, action) {
    state.originalContextData = [...state.originalContextData, action.input.id];
  },

  removeContextDataOperation(state, action) {
    state.originalContextData = state.originalContextData.filter(
      (contextData) => contextData !== action.input.id,
    );
  },

  replaceContextDataOperation(state, action) {
    state.originalContextData = state.originalContextData.map((contextData) => {
      if (contextData === action.input.prevId) {
        return action.input.id;
      }
      return contextData;
    });
  },

  setNotionIdOperation(state, action) {
    state.notionId = action.input.notionID;
  },
};
