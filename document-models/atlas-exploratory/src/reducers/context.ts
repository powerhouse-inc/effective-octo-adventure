/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { type AtlasExploratoryContextOperations } from "../../gen/context/operations.js";

export const reducer: AtlasExploratoryContextOperations = {
  addContextDataOperation(state, action, dispatch) {
    const newContextData = {
      id: action.input.id,
      name: action.input.name || null,
      docNo: action.input.docNo || null,
    };
    state.originalContextData = [...state.originalContextData, newContextData];
  },

  removeContextDataOperation(state, action, dispatch) {
    state.originalContextData = state.originalContextData.filter(
      (contextData) => contextData.id !== action.input.id,
    );
  },

  setNotionIdOperation(state, action, dispatch) {
    if (action.input.notionID) {
      state.notionId = action.input.notionID;
    } else {
      throw new Error("Notion ID missing from input.");
    }
  },
  addAdditionalGuidanceOperation(state, action, dispatch) {
    if (action.input.additionalGuidance) {
      state.additionalGuidance = action.input.additionalGuidance;
    } else {
      throw new Error("Additional guidance missing from input.");
    }
  },
  removeAdditionalGuidanceOperation(state, action, dispatch) {
    // TODO: Implement "removeAdditionalGuidanceOperation" reducer
    throw new Error(
      'Reducer "removeAdditionalGuidanceOperation" not yet implemented',
    );
  },
  setProvenanceOperation(state, action, dispatch) {
    state.provenance = action.input.provenance || "";
  },
};
