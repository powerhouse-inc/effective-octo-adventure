/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { type AtlasGroundingContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasGroundingContextOperations = {
  addContextDataOperation(state, action) {
    const newContextData = {
      id: action.input.id,
      title: action.input.title || null,
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
          title: action.input.title || null,
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
