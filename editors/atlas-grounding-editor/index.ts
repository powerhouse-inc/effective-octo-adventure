import { type EditorModule } from "document-model";
import Editor from "./editor.js";
import { type AtlasGroundingDocument } from "../../document-models/atlas-grounding/index.js";

export const module: EditorModule = {
  Component: Editor as any,
  documentTypes: ["sky/atlas-grounding"],
  config: {
    id: "AtlasGrounding",
    name: "Atlas Grounding",
  },
};

export default module;
