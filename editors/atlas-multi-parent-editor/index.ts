import { type EditorModule } from "document-model";
import Editor from "./editor.js";
import { type AtlasMultiParentDocument } from "../../document-models/atlas-multi-parent/index.js";

export const module: EditorModule = {
  Component: Editor as any,
  documentTypes: ["sky/atlas-multiparent"],
  config: {
    id: "AtlasMultiParent",
    name: "Atlas Multi Parent",
  },
};

export default module;
