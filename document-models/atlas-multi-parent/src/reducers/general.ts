import { AtlasMultiParentGeneralOperations } from "../../gen/general/operations";

export const reducer: AtlasMultiParentGeneralOperations = {
  setMultiparentNameOperation(state, action, dispatch) {
    state.name = action.input.name;
  },

  setDocNumberOperation(state, action, dispatch) {
    state.docNo = action.input.docNo;
  },

  setContentOperation(state, action, dispatch) {
    state.content = action.input.content;
  },

  setMasterStatusOperation(state, action, dispatch) {
    state.masterStatus = action.input.masterStatus;
  },

  setAtlasTypeOperation(state, action, dispatch) {
    state.atlasType = action.input.atlasType;
  },

  addParentOperation(state, action, dispatch) {
    state.parents = state.parents.filter(
      (parent) => parent.id !== action.input.id,
    );

    state.parents.push({
      id: action.input.id,
      name: action.input.name || null,
      docNo: action.input.docNo || null,
    });
  },

  removeParentOperation(state, action, dispatch) {
    state.parents = state.parents.filter((r) => r.id !== action.input.id);
  },
};
