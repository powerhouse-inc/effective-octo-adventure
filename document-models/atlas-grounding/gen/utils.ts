import {
  type DocumentModelUtils,
  baseCreateDocument,
  baseCreateExtendedState,
  baseSaveToFile,
  baseSaveToFileHandle,
  baseLoadFromFile,
  baseLoadFromInput,
} from "document-model";
import {
  type AtlasGroundingDocument,
  type AtlasGroundingState,
  type AtlasGroundingLocalState,
} from "./types.js";
import { reducer } from "./reducer.js";

export const initialGlobalState: AtlasGroundingState = {
  name: "",
  docNo: "",
  parent: {
    id: "",
    name: "",
    docNo: "",
  },
  atlasType: "TENET",
  content: "",
  masterStatus: "PLACEHOLDER",
  globalTags: [],
  references: [],
  originalContextData: [],
  provenance: [],
  notionId: "",
};
export const initialLocalState: AtlasGroundingLocalState = {};

const utils: DocumentModelUtils<AtlasGroundingDocument> = {
  fileExtension: ".agr",
  createState(state) {
    return {
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createExtendedState(extendedState) {
    return baseCreateExtendedState(
      { ...extendedState, documentType: "sky/atlas-grounding" },
      utils.createState,
    );
  },
  createDocument(state) {
    return baseCreateDocument(
      utils.createExtendedState(state),
      utils.createState,
    );
  },
  saveToFile(document, path, name) {
    return baseSaveToFile(document, path, ".agr", name);
  },
  saveToFileHandle(document, input) {
    return baseSaveToFileHandle(document, input);
  },
  loadFromFile(path) {
    return baseLoadFromFile(path, reducer);
  },
  loadFromInput(input) {
    return baseLoadFromInput(input, reducer);
  },
};

export default utils;
