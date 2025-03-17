import { type EditorModule } from "document-model";
import Editor from "./editor.js";
import { type AtlasScopeDocument } from "../../document-models/atlas-scope/index.js";

export const module: EditorModule<AtlasScopeDocument> = {
  Component: Editor,
  documentTypes: ["sky/atlas-scope"],
  config: {
    id: "AtlasScope",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
