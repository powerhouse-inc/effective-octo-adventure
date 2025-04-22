import { type AtlasFoundationContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasFoundationContextOperations = {
  addContextDataOperation(state, action) {
    const newContextData = {
      id: action.input.id,
      title: action.input.title ?? "",
      docNo: null,
    };
    state.originalContextData = [...state.originalContextData, newContextData];
  },

  removeContextDataOperation(state, action) {
    state.originalContextData = state.originalContextData.filter(
      (contextData) => contextData.id !== action.input.id,
    );
  },

  replaceContextDataOperation(state, action) {
    state.originalContextData = state.originalContextData.map((contextData) => {
      if (contextData.id === action.input.prevId) {
        return {
          id: action.input.id,
          title: action.input.title ?? "",
          docNo: null,
        };
      }
      return contextData;
    });
  },

  setNotionIdOperation(state, action) {
    state.notionId = action.input.notionID;
  },
};
