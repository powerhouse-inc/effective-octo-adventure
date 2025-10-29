import { type VetraEditorModule } from "@powerhousedao/reactor-browser";
import Editor from "./editor.js";

export const module: VetraEditorModule = {
  id: "AtlasDriveExplorer",
  name: "Atlas Drive Explorer",
  Component: Editor,
  documentTypes: ["powerhouse/document-drive"],
};

export default module;
