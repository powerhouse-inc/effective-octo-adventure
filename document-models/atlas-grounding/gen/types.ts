import type { PHDocument, ExtendedState } from "document-model";
import type { AtlasGroundingState } from "./schema/types.js";
import type { AtlasGroundingAction } from "./actions.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type AtlasGroundingLocalState = Record<PropertyKey, never>;
export type ExtendedAtlasGroundingState = ExtendedState<
  AtlasGroundingState,
  AtlasGroundingLocalState
>;
export type AtlasGroundingDocument = PHDocument<
  AtlasGroundingState,
  AtlasGroundingLocalState,
  AtlasGroundingAction
>;
export type {
  AtlasGroundingState,
  AtlasGroundingLocalState,
  AtlasGroundingAction,
};
