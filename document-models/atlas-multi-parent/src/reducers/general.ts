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
  setParentOperation(state, action, dispatch) {
    // TODO: change to addParent and removeParent
  },
  setAtlasTypeOperation(state, action, dispatch) {
    // TODO: Implement "setAtlasTypeOperation" reducer
    throw new Error('Reducer "setAtlasTypeOperation" not yet implemented');
  },
};
