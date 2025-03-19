import { EditorModule } from "document-model";
import { AtlasFeedbackIssuesDocument } from "../../document-models/atlas-feedback-issues";
import Editor from "./editor";

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
