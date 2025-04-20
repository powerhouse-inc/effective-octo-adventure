import { type AtlasScopeGeneralOperations } from "../../gen/general/operations.js";

export const reducer: AtlasScopeGeneralOperations = {
  setDocumentNumberOperation(state, action) {
    state.docNo = action.input.docNo ?? null;
  },

  setNameOperation(state, action) {
    alert(action.input.name);
    state.name = action.input.name;
  },

  setContentOperation(state, action) {
    state.content = action.input.content;
  },

  setMasterStatusOperation(state, action) {
    state.masterStatus = action.input.masterStatus;
  },
};
