import type { AtlasFoundationGeneralAction } from "./general/actions.js";
import type { AtlasFoundationTagsAction } from "./tags/actions.js";
import type { AtlasFoundationContextAction } from "./context/actions.js";

export * from "./general/actions.js";
export * from "./tags/actions.js";
export * from "./context/actions.js";

export type AtlasFoundationAction =
  | AtlasFoundationGeneralAction
  | AtlasFoundationTagsAction
  | AtlasFoundationContextAction;
