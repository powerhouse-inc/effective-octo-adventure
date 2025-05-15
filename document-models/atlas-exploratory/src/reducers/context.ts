import { type AtlasExploratoryContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasExploratoryContextOperations = {
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
    if (action.input.notionID) {
      state.notionId = action.input.notionID;
    } else {
      throw new Error("Notion ID missing from input.");
    }
  },

  setAdditionalGuidanceOperation(state, action) {
    if (action.input.additionalGuidance) {
      state.additionalGuidance = action.input.additionalGuidance;
    } else {
      throw new Error("Additional guidance missing from input.");
    }
  },
};
