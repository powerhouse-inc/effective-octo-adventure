import { EditorModule } from "document-model";
import Editor from "./editor";
import { AtlasFoundationDocument } from "../../document-models/atlas-foundation";

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
