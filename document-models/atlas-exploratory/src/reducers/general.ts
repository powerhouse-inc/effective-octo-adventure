import { type AtlasExploratoryGeneralOperations } from "../../gen/general/operations.js";

export const reducer: AtlasExploratoryGeneralOperations = {
  setExploratoryNameOperation(state, action, dispatch) {
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
  setParentOperation(state, action, dispatch) {
    // TODO: change input to singular
    //state.parent = action.input.parent?
    state.parent = Array.isArray(action.input.parent) ? action.input.parent[0] || "" : action.input.parent || "";

  },
  removeParentOperation(state, action, dispatch) {
    // TODO: Implement "removeParentOperation" reducer
    throw new Error('Reducer "removeParentOperation" not yet implemented');
  },
  setAtlasTypeOperation(state, action, dispatch) {
    state.atlasType = action.input.atlasType;
  },
  setFindingsOperation(state, action, dispatch) {
    state.findings = {
      comment:  action.input.comment || "",
      isAligned: action.input.isAligned,
    };
  },

  // TODO: Implement this in  here and schema
  // setReferenceOperation(state, action, dispatch) {
  //   state.references = action.input.newReference ? [...state.references, action.input.newReference] : state.references;
  // },
  // removeReferenceOperation(state, action, dispatch) {
  //   if (action.input.reference) {
  //     state.references = state.references.filter(reference => reference !== action.input.reference);
  //   } else {
  //     state.references = []
  //   }
  // },
    setReferenceOperation(state, action, dispatch) {
      const newReference = action.input.newReference
      if (newReference) {
        state.references =  [newReference,...state.references]
      }
  },
  removeReferenceOperation(state, action, dispatch) {
      state.references = []
  },
};
