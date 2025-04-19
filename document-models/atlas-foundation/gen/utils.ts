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
  type AtlasFoundationDocument,
  type AtlasFoundationState,
  type AtlasFoundationLocalState,
} from "./types.js";
import { reducer } from "./reducer.js";

export const initialGlobalState: AtlasFoundationState = {
  docNo: "",
  name: "",
  parent: {
    id: "",
    title: "",
    docNo: "",
  },
  atlasType: "ARTICLE",
  content: "",
  masterStatus: "PLACEHOLDER",
  globalTags: [],
  originalContextData: [],
  notionId: "",
};
export const initialLocalState: AtlasFoundationLocalState = {};

const utils: DocumentModelUtils<AtlasFoundationDocument> = {
  fileExtension: ".afn",
  createState(state) {
    return {
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createExtendedState(extendedState) {
    return baseCreateExtendedState(
      { ...extendedState, documentType: "sky/atlas-foundation" },
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
    return baseSaveToFile(document, path, ".afn", name);
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
