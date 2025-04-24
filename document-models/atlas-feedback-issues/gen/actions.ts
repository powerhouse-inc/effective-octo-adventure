import type { AtlasFeedbackIssuesIssuesAction } from "./issues/actions.js";
import type { AtlasFeedbackIssuesCommentsAction } from "./comments/actions.js";

export * from "./issues/actions.js";
export * from "./comments/actions.js";

export type AtlasFeedbackIssuesAction =
  | AtlasFeedbackIssuesIssuesAction
  | AtlasFeedbackIssuesCommentsAction;
