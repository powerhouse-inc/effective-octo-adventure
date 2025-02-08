import { AtlasFoundationGeneralOperations } from "../../gen/general/operations";

export const reducer: AtlasFoundationGeneralOperations = {
  setFoundationNameOperation(state, action, dispatch) {
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
  setReferencesOperation(state, action, dispatch) {
    // TODO: change input structure
    state.references = action.input.reference || [];
  },
  setAtlasTypeOperation(state, action, dispatch) {
    // TODO: change input to singular type
    //state.atlasType = action.input.atlasType;
  },
};
