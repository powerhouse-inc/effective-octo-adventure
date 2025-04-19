/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { type AtlasExploratoryContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasExploratoryContextOperations = {
  addContextDataOperation(state, action) {
    const newContextData = {
      id: action.input.id,
      title: action.input.title ?? null,
      // TODO: should we add docNo? we're assuming it's not needed
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
          title: action.input.title ?? null,
          // TODO: should we add docNo? we're assuming it's not needed
          docNo: null,
        };
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
