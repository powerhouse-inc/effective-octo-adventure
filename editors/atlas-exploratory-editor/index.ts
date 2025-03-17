import { type EditorModule } from "document-model";
import Editor from "./editor.js";
import { type AtlasExploratoryDocument } from "../../document-models/atlas-exploratory/index.js";

export const module: EditorModule<AtlasExploratoryDocument> = {
  Component: Editor,
  documentTypes: ["sky/atlas-exploratory"],
  config: {
    id: "AtlasExploratory",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
