import { type AtlasFoundationTagsOperations } from "../../gen/tags/operations.js";

export const reducer: AtlasFoundationTagsOperations = {
  addTagsOperation(state, action) {
    action.input.tags.forEach((t) => {
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
