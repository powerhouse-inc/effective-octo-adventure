import { type EditorModule } from "document-model";
import { type AtlasFeedbackIssuesDocument } from "../../document-models/atlas-feedback-issues/index.js";
import Editor from "./editor.js";

export const module: EditorModule = {
  Component: Editor as any,
  documentTypes: ["makerdao/feedback-issues"],
  config: {
    id: "AtlasFeedbackIssues",
    name: "Atlas Feedback Issues",
  },
};

export default module;

export * from "./utils/index.js";
export { NodeOptionsCombobox } from "./components/node-options-combobox.js";
