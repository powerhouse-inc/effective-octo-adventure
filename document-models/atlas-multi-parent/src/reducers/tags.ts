import { type AtlasMultiParentTagsOperations } from "../../gen/tags/operations.js";

export const reducer: AtlasMultiParentTagsOperations = {
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
