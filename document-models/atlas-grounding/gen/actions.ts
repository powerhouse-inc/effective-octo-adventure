import type { AtlasGroundingGeneralAction } from "./general/actions.js";
import type { AtlasGroundingTagsAction } from "./tags/actions.js";
import type { AtlasGroundingContextAction } from "./context/actions.js";

export * from "./general/actions.js";
export * from "./tags/actions.js";
export * from "./context/actions.js";

export type AtlasGroundingAction =
  | AtlasGroundingGeneralAction
  | AtlasGroundingTagsAction
  | AtlasGroundingContextAction;
