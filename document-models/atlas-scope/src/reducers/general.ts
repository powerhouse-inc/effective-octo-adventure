import { AtlasScopeGeneralOperations } from "../../gen/general/operations";

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
