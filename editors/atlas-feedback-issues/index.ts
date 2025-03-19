import { type EditorModule } from "document-model";
import { type AtlasFeedbackIssuesDocument } from "../../document-models/atlas-feedback-issues/index.js";
import Editor from "./editor.js";

export const module: EditorModule<AtlasFeedbackIssuesDocument> = {
  Component: Editor,
  documentTypes: ["makerdao/feedback-issues"],
  config: {
    id: "AtlasFeedbackIssues",
    disableExternalControls: true,
    documentToolbarEnabled: true,
    showSwitchboardLink: true,
  },
};

export default module;
