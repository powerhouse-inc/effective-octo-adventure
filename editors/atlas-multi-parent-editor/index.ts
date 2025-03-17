import { type EditorModule } from "document-model";
import Editor from "./editor.js";
import { type AtlasMultiParentDocument } from "../../document-models/atlas-multi-parent/index.js";

export const module: EditorModule<AtlasMultiParentDocument> = {
  Component: Editor,
  documentTypes: ["sky/atlas-multiparent"],
  config: {
    id: "AtlasMultiParent",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
