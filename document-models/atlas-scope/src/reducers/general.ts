import { type AtlasScopeGeneralOperations } from "../../gen/general/operations.js";

export const reducer: AtlasScopeGeneralOperations = {
  setScopeNameOperation(state, action) {
    state.name = action.input.name;
  },
  setDocNumberOperation(state, action) {
    state.docNo = action.input.docNo;
  },
  setContentOperation(state, action) {
    state.content = action.input.content;
  },
  setMasterStatusOperation(state, action) {
    state.masterStatus = action.input.masterStatus;
  },
};
