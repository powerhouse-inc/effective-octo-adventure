import { type AtlasGroundingGeneralOperations } from "../../gen/general/operations.js";

export const reducer: AtlasGroundingGeneralOperations = {
  setDocumentNumberOperation(state, action) {
    state.docNo = action.input.docNo ?? "";
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

  setAtlasTypeOperation(state, action) {
    state.atlasType = action.input.atlasType;
  },

  setParentOperation(state, action) {
    state.parent = {
      id: action.input.id,
      title: action.input.title ?? "",
      docNo: null,
    };
  },
};
