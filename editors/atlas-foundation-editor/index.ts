import { type EditorModule } from "document-model";
import Editor from "./editor.js";
import { type AtlasFoundationDocument } from "../../document-models/atlas-foundation/index.js";

export const module: EditorModule = {
  Component: Editor as any,
  documentTypes: ["sky/atlas-foundation"],
  config: {
    id: "AtlasFoundation",
    name: "Atlas Foundation",
  },
};

export default module;
