import type { PHDocument, ExtendedState } from "document-model";
import type { AtlasMultiParentState } from "./schema/types.js";
import type { AtlasMultiParentAction } from "./actions.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type AtlasMultiParentLocalState = Record<PropertyKey, never>;
export type ExtendedAtlasMultiParentState = ExtendedState<
  AtlasMultiParentState,
  AtlasMultiParentLocalState
>;
export type AtlasMultiParentDocument = PHDocument<
  AtlasMultiParentState,
  AtlasMultiParentLocalState,
  AtlasMultiParentAction
>;
export type {
  AtlasMultiParentState,
  AtlasMultiParentLocalState,
  AtlasMultiParentAction,
};
