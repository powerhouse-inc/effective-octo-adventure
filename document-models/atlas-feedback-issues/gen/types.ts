import type { PHDocument, PHBaseState } from "document-model";
import type { AtlasFeedbackIssuesAction } from "./actions.js";
import type { AtlasFeedbackIssuesState as AtlasFeedbackIssuesGlobalState } from "./schema/types.js";

export { z } from "./schema/index.js";
export * from "./schema/types.js";
type AtlasFeedbackIssuesLocalState = Record<PropertyKey, never>;
type AtlasFeedbackIssuesPHState = PHBaseState & {
  global: AtlasFeedbackIssuesGlobalState;
  local: AtlasFeedbackIssuesLocalState;
};
type AtlasFeedbackIssuesDocument = PHDocument<AtlasFeedbackIssuesPHState>;

export type {
  AtlasFeedbackIssuesGlobalState,
  AtlasFeedbackIssuesLocalState,
  AtlasFeedbackIssuesPHState,
  AtlasFeedbackIssuesAction,
  AtlasFeedbackIssuesDocument,
};
