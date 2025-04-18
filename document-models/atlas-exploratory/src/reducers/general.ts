import { type AtlasExploratoryGeneralOperations } from "../../gen/general/operations.js";

export const reducer: AtlasExploratoryGeneralOperations = {
  setDocumentNumberOperation(state, action) {
    state.docNo = action.input.docNo ?? null;
  },

  setNameOperation(state, action) {
    state.name = action.input.name;
  },

  setContentOperation(state, action) {
    state.content = action.input.content;
  },

  setMasterStatusOperation(state, action) {
    state.masterStatus = action.input.masterStatus;
  },

  setParentOperation(state, action) {
    state.parent = action.input.parent || "";
  },

  setAtlasTypeOperation(state, action) {
    state.atlasType = action.input.atlasType;
  },

  setFindingsOperation(state, action) {
    state.findings = {
      isAligned: action.input.isAligned,
    };
  },
};
