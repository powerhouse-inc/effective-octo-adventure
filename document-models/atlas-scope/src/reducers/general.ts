import { type AtlasScopeGeneralOperations } from "../../gen/general/operations.js";

export const reducer: AtlasScopeGeneralOperations = {
  setDocNumberOperation(state, action) {
    state.docNo = action.input.docNo ?? "";
  },

  setScopeNameOperation(state, action) {
    state.name = action.input.name;
  },

  setContentOperation(state, action) {
    state.content = action.input.content;
  },

  setMasterStatusOperation(state, action) {
    state.masterStatus = action.input.masterStatus;
  },
};
