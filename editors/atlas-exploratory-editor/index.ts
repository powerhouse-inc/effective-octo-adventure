import { EditorModule } from "document-model";
import Editor from "./editor";
import { AtlasExploratoryDocument } from "../../document-models/atlas-exploratory";

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
