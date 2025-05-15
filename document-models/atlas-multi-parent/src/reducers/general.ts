import { type AtlasMultiParentGeneralOperations } from "../../gen/general/operations.js";

export const reducer: AtlasMultiParentGeneralOperations = {
  setExploratoryNameOperation(state, action) {
    state.name = action.input.name;
  },

  setContentOperation(state, action) {
    state.content = action.input.content;
  },

  setMasterStatusOperation(state, action) {
    state.masterStatus = action.input.masterStatus;
  },

  setAtlasTypeOperation(state, action) {
    state.atlasType = action.input.atlasType;
  },

  addParentOperation(state, action) {
    state.parents.push({
      id: action.input.id,
      title: action.input.title || null,
      docNo: action.input.docNo || null,
      documentType: action.input.documentType || null,
      icon: action.input.icon ?? null,
    });
  },

  removeParentOperation(state, action) {
    state.parents = state.parents.filter(
      (parent) => parent.id !== action.input.id,
    );
  },

  replaceParentOperation(state, action) {
    state.parents = state.parents.map((parent) => {
      if (parent.id === action.input.prevID) {
        return {
          id: action.input.id,
          title: action.input.title || null,
          docNo: action.input.docNo || null,
          documentType: action.input.documentType || null,
          icon: action.input.icon ?? null,
        };
      }
      return parent;
    });
  },
};
