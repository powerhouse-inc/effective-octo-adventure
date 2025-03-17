import { type EditorModule } from "document-model";
import Editor from "./editor.js";
import { type AtlasGroundingDocument } from "../../document-models/atlas-grounding/index.js";

export const module: EditorModule<AtlasGroundingDocument> = {
  Component: Editor,
  documentTypes: ["sky/atlas-grounding"],
  config: {
    id: "AtlasGrounding",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
