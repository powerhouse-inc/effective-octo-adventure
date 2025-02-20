/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { AtlasGroundingTagsOperations } from "../../gen/tags/operations";

export const reducer: AtlasGroundingTagsOperations = {
  addTagsOperation(state, action, dispatch) {
    action.input.tags.forEach((t) => {
      if (!state.globalTags.includes(t)) {
        state.globalTags.push(t);
      }
    });
  },
  removeTagsOperation(state, action, dispatch) {
    state.globalTags = state.globalTags.filter(
      (t) => !action.input.tags.includes(t),
    );
  },
};
