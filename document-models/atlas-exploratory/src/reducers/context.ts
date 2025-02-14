/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { AtlasExploratoryContextOperations } from "../../gen/context/operations";

export const reducer: AtlasExploratoryContextOperations = {
  addContextDataOperation(state, action, dispatch) {
    // TODO: Implement "addContextDataOperation" reducer
    throw new Error('Reducer "addContextDataOperation" not yet implemented');
  },
  removeContextDataOperation(state, action, dispatch) {
    // TODO: Implement "removeContextDataOperation" reducer
    throw new Error('Reducer "removeContextDataOperation" not yet implemented');
  },
  setProvenanceOperation(state, action, dispatch) {
    // TODO: Implement "setProvenanceOperation" reducer
    throw new Error('Reducer "setProvenanceOperation" not yet implemented');
  },
  setNotionIdOperation(state, action, dispatch) {
    if (action.input.notionID) {
      state.notionId = action.input.notionID;
    } else {
      throw new Error("Notion ID missing from input.");
    }
  },
  addAdditionalGuidanceOperation(state, action, dispatch) {
    // TODO: Implement "addAdditionalGuidanceOperation" reducer
    throw new Error(
      'Reducer "addAdditionalGuidanceOperation" not yet implemented',
    );
  },
  removeAdditionalGuidanceOperation(state, action, dispatch) {
    // TODO: Implement "removeAdditionalGuidanceOperation" reducer
    throw new Error(
      'Reducer "removeAdditionalGuidanceOperation" not yet implemented',
    );
  },
};
