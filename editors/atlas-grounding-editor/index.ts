import { EditorModule } from "document-model";
import Editor from "./editor";
import { AtlasGroundingDocument } from "../../document-models/atlas-grounding";

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
