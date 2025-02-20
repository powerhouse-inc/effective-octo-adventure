/**
 * This is a scaffold file meant for customization:
 * - modify it by implementing the reducer functions
 * - delete the file and run the code generator again to have it reset
 */

import { AtlasGroundingContextOperations } from "../../gen/context/operations";

export const reducer: AtlasGroundingContextOperations = {
  addContextDataOperation(state, action, dispatch) {
    state.originalContextData = state.originalContextData.filter(
      (ocd) => ocd.id !== action.input.id,
    );

    state.originalContextData.push({
      id: action.input.id,
      name: action.input.name || null,
      docNo: action.input.docNo || null,
    });
  },
  removeContextDataOperation(state, action, dispatch) {
    state.originalContextData = state.originalContextData.filter(
      (ocd) => ocd.id !== action.input.id,
    );
  },
  setProvenanceOperation(state, action, dispatch) {
    state.provenance = action.input.provenance;
  },
  setNotionIdOperation(state, action, dispatch) {
    state.notionId = action.input.notionID;
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
