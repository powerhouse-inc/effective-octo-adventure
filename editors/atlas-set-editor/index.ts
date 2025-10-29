import { type EditorModule } from "document-model";
import { type AtlasSetDocument } from "../../document-models/atlas-set/index.js";
import Editor from "./editor.js";

export const module: EditorModule = {
  Component: Editor as any,
  documentTypes: ["sky/atlas-set"],
  config: {
    id: "AtlasSet",
    name: "Atlas Set",
  },
};

export default module;
