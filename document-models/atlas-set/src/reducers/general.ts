/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import type { AtlasSetGeneralOperations } from "../../gen/general/operations.js";

export const reducer: AtlasSetGeneralOperations = {
  setSetNameOperation(state, action) {
    state.name = action.input.name;
  },
  setSetParentOperation(state, action) {
    state.parent = {
      id: action.input.id,
      title: action.input.title || null,
      documentType: action.input.documentType || null,
    };
  },
  setNotionIdOperation(state, action) {
    state.notionId = action.input.notionId;
  },
};
