import { type EditorModule } from "document-model";
import Editor from "./editor.js";
import { type AtlasExploratoryDocument } from "../../document-models/atlas-exploratory/index.js";

export const module: EditorModule = {
  Component: Editor as any,
  documentTypes: ["sky/atlas-exploratory"],
  config: {
    id: "AtlasExploratory",
    name: "Atlas Exploratory",
  },
};

export default module;
