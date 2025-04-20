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
  type AtlasScopeDocument,
  type AtlasScopeState,
  type AtlasScopeLocalState,
} from "./types.js";
import { reducer } from "./reducer.js";

export const initialGlobalState: AtlasScopeState = {
  docNo: "",
  name: "",
  content: "",
  masterStatus: "PLACEHOLDER",
  globalTags: [],
  originalContextData: [],
  notionId: "",
};
export const initialLocalState: AtlasScopeLocalState = {};

const utils: DocumentModelUtils<AtlasScopeDocument> = {
  fileExtension: ".asc",
  createState(state) {
    return {
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createExtendedState(extendedState) {
    return baseCreateExtendedState(
      { ...extendedState, documentType: "sky/atlas-scope" },
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
    return baseSaveToFile(document, path, ".asc", name);
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
