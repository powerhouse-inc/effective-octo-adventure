import { type AtlasScopeGeneralAction } from "./general/actions.js";
import { type AtlasScopeTagsAction } from "./tags/actions.js";
import { type AtlasScopeContextAction } from "./context/actions.js";

export * from "./general/actions.js";
export * from "./tags/actions.js";
export * from "./context/actions.js";

export type AtlasScopeAction =
  | AtlasScopeGeneralAction
  | AtlasScopeTagsAction
  | AtlasScopeContextAction;
