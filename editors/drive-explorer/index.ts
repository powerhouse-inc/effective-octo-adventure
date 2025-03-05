import { EditorModule } from "document-model";
import Editor from "./editor";
import { DocumentDriveDocument } from "document-drive";

export const module: EditorModule<DocumentDriveDocument> = {
  Component: Editor,
  documentTypes: ["powerhouse/document-drive"],
  config: {
    id: "AtlasDriveExplorer",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
