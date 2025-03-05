import { EditorModule } from "document-model";
import Editor from "./editor";
import { AtlasScopeDocument } from "../../document-models/atlas-scope";

export const module: EditorModule<AtlasScopeDocument> = {
  Component: Editor,
  documentTypes: ["sky/atlas-scope"],
  config: {
    id: "editor-id",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
