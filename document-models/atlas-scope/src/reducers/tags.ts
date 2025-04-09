/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { type AtlasScopeTagsOperations } from "../../gen/tags/operations.js";

export const reducer: AtlasScopeTagsOperations = {
  addTagsOperation(state, action, dispatch) {
    state.globalTags = [...state.globalTags, ...action.input.newTags];
  },
  removeTagsOperation(state, action, dispatch) {
    state.globalTags = state.globalTags.filter(
      (tag) => !action.input.tags.includes(tag),
    );
  },
};
