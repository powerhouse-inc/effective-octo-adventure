/**
 * Factory methods for creating AtlasFeedbackIssuesDocument instances
 */
import type { PHAuthState, PHDocumentState, PHBaseState } from "document-model";
import { createBaseState, defaultBaseState } from "document-model/core";
import type {
  AtlasFeedbackIssuesDocument,
  AtlasFeedbackIssuesLocalState,
  AtlasFeedbackIssuesGlobalState,
  AtlasFeedbackIssuesPHState,
} from "./types.js";
import { createDocument } from "./utils.js";

export function defaultGlobalState(): AtlasFeedbackIssuesGlobalState {
  return {
    issues: [],
  };
}

export function defaultLocalState(): AtlasFeedbackIssuesLocalState {
  return {};
}

export function defaultPHState(): AtlasFeedbackIssuesPHState {
  return {
    ...defaultBaseState(),
    global: defaultGlobalState(),
    local: defaultLocalState(),
  };
}

export function createGlobalState(
  state?: Partial<AtlasFeedbackIssuesGlobalState>,
): AtlasFeedbackIssuesGlobalState {
  return {
    ...defaultGlobalState(),
    ...(state || {}),
  } as AtlasFeedbackIssuesGlobalState;
}

export function createLocalState(
  state?: Partial<AtlasFeedbackIssuesLocalState>,
): AtlasFeedbackIssuesLocalState {
  return {
    ...defaultLocalState(),
    ...(state || {}),
  } as AtlasFeedbackIssuesLocalState;
}

export function createState(
  baseState?: Partial<PHBaseState>,
  globalState?: Partial<AtlasFeedbackIssuesGlobalState>,
  localState?: Partial<AtlasFeedbackIssuesLocalState>,
): AtlasFeedbackIssuesPHState {
  return {
    ...createBaseState(baseState?.auth, baseState?.document),
    global: createGlobalState(globalState),
    local: createLocalState(localState),
  };
}

/**
 * Creates a AtlasFeedbackIssuesDocument with custom global and local state
 * This properly handles the PHBaseState requirements while allowing
 * document-specific state to be set.
 */
export function createAtlasFeedbackIssuesDocument(
  state?: Partial<{
    auth?: Partial<PHAuthState>;
    document?: Partial<PHDocumentState>;
    global?: Partial<AtlasFeedbackIssuesGlobalState>;
    local?: Partial<AtlasFeedbackIssuesLocalState>;
  }>,
): AtlasFeedbackIssuesDocument {
  const document = createDocument(
    state
      ? createState(
          createBaseState(state.auth, state.document),
          state.global,
          state.local,
        )
      : undefined,
  );

  return document;
}
