/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { type AtlasExploratoryTagsOperations } from "../../gen/tags/operations.js";

export const reducer: AtlasExploratoryTagsOperations = {
  addTagsOperation(state, action) {
    action.input.newTags.forEach((t) => {
      if (!state.globalTags.includes(t)) {
        state.globalTags.push(t);
      }
    });
  },

  removeTagsOperation(state, action) {
    state.globalTags = state.globalTags.filter(
      (t) => !action.input.tags.includes(t),
    );
  },
};
