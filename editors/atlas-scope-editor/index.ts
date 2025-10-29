import { type EditorModule } from "document-model";
import Editor from "./editor.js";
import { type AtlasScopeDocument } from "../../document-models/atlas-scope/index.js";

export const module: EditorModule = {
  Component: Editor as any,
  documentTypes: ["sky/atlas-scope"],
  config: {
    id: "AtlasScope",
    name: "Atlas Scope",
  },
};

export default module;
