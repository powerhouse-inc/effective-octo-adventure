import { type EditorModule } from "document-model";
import Editor from "./editor.js";
import { type AtlasFoundationDocument } from "../../document-models/atlas-foundation/index.js";

export const module: EditorModule<AtlasFoundationDocument> = {
  Component: Editor,
  documentTypes: ["sky/atlas-foundation"],
  config: {
    id: "AtlasFoundation",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
