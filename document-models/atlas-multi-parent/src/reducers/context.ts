import { type AtlasMultiParentContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasMultiParentContextOperations = {
  addContextDataOperation(state, action) {
    const newContextData = {
      id: action.input.id,
      title: action.input.title || null,
      docNo: null,
    };
    state.originalContextData = [newContextData, ...state.originalContextData];
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
          title: action.input.title || null,
          docNo: null,
        };
      }
      return contextData;
    });
  },

  setNotionIdOperation(state, action) {
    state.notionId = action.input.notionId;
  },
};
