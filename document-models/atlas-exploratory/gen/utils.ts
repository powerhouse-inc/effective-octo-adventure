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
  type AtlasExploratoryDocument,
  type AtlasExploratoryState,
  type AtlasExploratoryLocalState,
} from "./types.js";
import { reducer } from "./reducer.js";

export const initialGlobalState: AtlasExploratoryState = {
  name: "",
  docNo: "",
  parent: "",
  atlasType: "SCENARIO",
  content: "",
  masterStatus: "PLACEHOLDER",
  globalTags: [],
  references: [],
  originalContextData: [],
  provenance: "",
  notionId: "",
  findings: {
    isAligned: false,
    comment: "",
  },
  additionalGuidance: "",
};
export const initialLocalState: AtlasExploratoryLocalState = {};

const utils: DocumentModelUtils<AtlasExploratoryDocument> = {
  fileExtension: ".axp",
  createState(state) {
    return {
      global: { ...initialGlobalState, ...state?.global },
      local: { ...initialLocalState, ...state?.local },
    };
  },
  createExtendedState(extendedState) {
    return baseCreateExtendedState(
      { ...extendedState, documentType: "sky/atlas-exploratory" },
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
    return baseSaveToFile(document, path, ".axp", name);
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
