import { type AtlasExploratoryGeneralOperations } from "../../gen/general/operations.js";

export const reducer: AtlasExploratoryGeneralOperations = {
  setExploratoryNameOperation(state, action, dispatch) {
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
  setParentOperation(state, action, dispatch) {
    // TODO: change input to singular
    //state.parent = action.input.parent?
  },
  removeParentOperation(state, action, dispatch) {
    // TODO: Implement "removeParentOperation" reducer
    throw new Error('Reducer "removeParentOperation" not yet implemented');
  },
  setAtlasTypeOperation(state, action, dispatch) {
    state.atlasType = action.input.atlasType;
  },
  setFindingsOperation(state, action, dispatch) {
    // TODO: add comment param to input
    state.findings = {
      comment: "",
      isAligned: action.input.isAligned,
    };
  },
};
