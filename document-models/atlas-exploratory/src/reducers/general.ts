import { type AtlasExploratoryGeneralOperations } from "../../gen/general/operations.js";

export const reducer: AtlasExploratoryGeneralOperations = {
  setDocNumberOperation(state, action) {
    state.docNo = action.input.docNo ?? null;
  },

  setExploratoryNameOperation(state, action) {
    state.name = action.input.name;
  },

  setContentOperation(state, action) {
    state.content = action.input.content;
  },

  setMasterStatusOperation(state, action) {
    state.masterStatus = action.input.masterStatus;
  },

  setParentOperation(state, action) {
    state.parent = {
      id: action.input.id,
      title: action.input.title ?? "",
      docNo: null,
    };
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
