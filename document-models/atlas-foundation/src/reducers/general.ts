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

  setAtlasTypeOperation(state, action, dispatch) {
    state.atlasType = action.input.atlasType;
  },

  setParentOperation(state, action, dispatch) {
    state.parent = {
      id: action.input.id,
      name: action.input.name || null,
      docNo: action.input.docNo || null,
    };
  },

  addReferenceOperation(state, action, dispatch) {
    const newReference = {
      id: action.input.id,
      name: action.input.name || null,
      docNo: action.input.docNo || null,
    };

    state.references.push(newReference);
  },

  removeReferenceOperation(state, action, dispatch) {
    state.references = state.references.filter((r) => r.id !== action.input.id);
  },
};
