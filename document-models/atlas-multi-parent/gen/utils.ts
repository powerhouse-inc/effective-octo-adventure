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
  type AtlasMultiParentDocument,
  type AtlasMultiParentState,
  type AtlasMultiParentLocalState,
} from "./types.js";
import { reducer } from "./reducer.js";

export const initialGlobalState: AtlasMultiParentState = {
  name: "",
  parents: [],
  atlasType: "ANNOTATION",
  content: "",
  masterStatus: "PLACEHOLDER",
  globalTags: [],
  originalContextData: [],
  notionId: "",
};
export const initialLocalState: AtlasMultiParentLocalState = {};

const utils: DocumentModelUtils<AtlasMultiParentDocument> = {
  fileExtension: ".amp",
  createState(state) {
    return {
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createExtendedState(extendedState) {
    return baseCreateExtendedState(
      { ...extendedState, documentType: "sky/atlas-multiparent" },
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
    return baseSaveToFile(document, path, ".amp", name);
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
