import type { PHDocument, ExtendedState } from "document-model";
import type { AtlasScopeState } from "./schema/types.js";
import type { AtlasScopeAction } from "./actions.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type AtlasScopeLocalState = Record<PropertyKey, never>;
export type ExtendedAtlasScopeState = ExtendedState<
  AtlasScopeState,
  AtlasScopeLocalState
>;
export type AtlasScopeDocument = PHDocument<
  AtlasScopeState,
  AtlasScopeLocalState,
  AtlasScopeAction
>;
export type { AtlasScopeState, AtlasScopeLocalState, AtlasScopeAction };
