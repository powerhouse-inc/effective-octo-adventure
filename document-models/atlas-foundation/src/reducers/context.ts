import { type AtlasFoundationContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasFoundationContextOperations = {
  addContextDataOperation(state, action) {
    state.originalContextData = [...state.originalContextData, action.input.id];
  },

  removeContextDataOperation(state, action) {
    // Mark the value as deleted to filter it out in the form
    const index = state.originalContextData.indexOf(action.input.id);
    state.originalContextData[index] = "";
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
