import {
  BaseDocumentClass,
  type ExtendedState,
  type PartialState,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import { type AtlasScopeState, type AtlasScopeLocalState } from "./types.js";
import { type AtlasScopeAction } from "./actions.js";
import { reducer } from "./reducer.js";
import utils from "./utils.js";
import AtlasScope_General from "./general/object.js";
import AtlasScope_Tags from "./tags/object.js";
import AtlasScope_Context from "./context/object.js";

export * from "./general/object.js";
export * from "./tags/object.js";
export * from "./context/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface AtlasScope
  extends AtlasScope_General,
    AtlasScope_Tags,
    AtlasScope_Context {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class AtlasScope extends BaseDocumentClass<
  AtlasScopeState,
  AtlasScopeLocalState,
  AtlasScopeAction
> {
  static fileExtension = ".asc";

  constructor(
    initialState?: Partial<
      ExtendedState<
        PartialState<AtlasScopeState>,
        PartialState<AtlasScopeLocalState>
      >
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, AtlasScope.fileExtension, name);
  }

  public loadFromFile(path: string) {
    return super.loadFromFile(path);
  }

  static async fromFile(path: string) {
    const document = new this();
    await document.loadFromFile(path);
    return document;
  }
}

applyMixins(AtlasScope, [
  AtlasScope_General,
  AtlasScope_Tags,
  AtlasScope_Context,
]);

export { AtlasScope };
