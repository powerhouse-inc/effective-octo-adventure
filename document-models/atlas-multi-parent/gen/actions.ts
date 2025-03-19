import type { AtlasMultiParentGeneralAction } from "./general/actions.js";
import type { AtlasMultiParentTagsAction } from "./tags/actions.js";
import type { AtlasMultiParentContextAction } from "./context/actions.js";

export * from "./general/actions.js";
export * from "./tags/actions.js";
export * from "./context/actions.js";

export type AtlasMultiParentAction =
  | AtlasMultiParentGeneralAction
  | AtlasMultiParentTagsAction
  | AtlasMultiParentContextAction;
