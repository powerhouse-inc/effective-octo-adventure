import { type EditorModule } from "document-model";
import { type AtlasSetDocument } from "../../document-models/atlas-set/index.js";
import Editor from "./editor.js";

export const module: EditorModule<AtlasSetDocument> = {
  Component: Editor,
  documentTypes: ["sky/atlas-set"],
  config: {
    id: "AtlasSet",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
