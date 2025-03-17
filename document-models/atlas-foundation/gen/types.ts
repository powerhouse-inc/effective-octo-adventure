import type { PHDocument, ExtendedState } from "document-model";
import type { AtlasFoundationState } from "./schema/types.js";
import type { AtlasFoundationAction } from "./actions.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type AtlasFoundationLocalState = Record<PropertyKey, never>;
export type ExtendedAtlasFoundationState = ExtendedState<
  AtlasFoundationState,
  AtlasFoundationLocalState
>;
export type AtlasFoundationDocument = PHDocument<
  AtlasFoundationState,
  AtlasFoundationLocalState,
  AtlasFoundationAction
>;
export type {
  AtlasFoundationState,
  AtlasFoundationLocalState,
  AtlasFoundationAction,
};
