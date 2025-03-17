import type { PHDocument, ExtendedState } from "document-model";
import type { AtlasExploratoryState } from "./schema/types.js";
import type { AtlasExploratoryAction } from "./actions.js";

export { z } from "./schema/index.js";
export type * from "./schema/types.js";
type AtlasExploratoryLocalState = Record<PropertyKey, never>;
export type ExtendedAtlasExploratoryState = ExtendedState<
  AtlasExploratoryState,
  AtlasExploratoryLocalState
>;
export type AtlasExploratoryDocument = PHDocument<
  AtlasExploratoryState,
  AtlasExploratoryLocalState,
  AtlasExploratoryAction
>;
export type {
  AtlasExploratoryState,
  AtlasExploratoryLocalState,
  AtlasExploratoryAction,
};
