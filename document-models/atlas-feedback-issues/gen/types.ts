import type { PHDocument, ExtendedState } from "document-model";
import type { AtlasFeedbackIssuesState } from "./schema/types.js";
import type { AtlasFeedbackIssuesAction } from "./actions.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type AtlasFeedbackIssuesLocalState = Record<PropertyKey, never>;
export type ExtendedAtlasFeedbackIssuesState = ExtendedState<
  AtlasFeedbackIssuesState,
  AtlasFeedbackIssuesLocalState
>;
export type AtlasFeedbackIssuesDocument = PHDocument<
  AtlasFeedbackIssuesState,
  AtlasFeedbackIssuesLocalState,
  AtlasFeedbackIssuesAction
>;
export type {
  AtlasFeedbackIssuesState,
  AtlasFeedbackIssuesLocalState,
  AtlasFeedbackIssuesAction,
};
