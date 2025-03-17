import { EditorModule } from "document-model";
import Editor from "./editor";
import { AtlasMultiParentDocument } from "../../document-models/atlas-multi-parent";

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
