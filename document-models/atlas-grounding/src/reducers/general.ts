import { AtlasGroundingGeneralOperations } from "../../gen/general/operations";

export const reducer: AtlasGroundingGeneralOperations = {
  setGroundingNameOperation(state, action, dispatch) {
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
    // TODO: change input to singular value
  },
};
