import {
  BaseDocumentClass,
  type ExtendedState,
  type PartialState,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import {
  type AtlasGroundingState,
  type AtlasGroundingLocalState,
} from "./types.js";
import { type AtlasGroundingAction } from "./actions.js";
import { reducer } from "./reducer.js";
import utils from "./utils.js";
import AtlasGrounding_General from "./general/object.js";
import AtlasGrounding_Tags from "./tags/object.js";
import AtlasGrounding_Context from "./context/object.js";

export * from "./general/object.js";
export * from "./tags/object.js";
export * from "./context/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface AtlasGrounding
  extends AtlasGrounding_General,
    AtlasGrounding_Tags,
    AtlasGrounding_Context {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class AtlasGrounding extends BaseDocumentClass<
  AtlasGroundingState,
  AtlasGroundingLocalState,
  AtlasGroundingAction
> {
  static fileExtension = ".agr";

  constructor(
    initialState?: Partial<
      ExtendedState<
        PartialState<AtlasGroundingState>,
        PartialState<AtlasGroundingLocalState>
      >
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, AtlasGrounding.fileExtension, name);
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

applyMixins(AtlasGrounding, [
  AtlasGrounding_General,
  AtlasGrounding_Tags,
  AtlasGrounding_Context,
]);

export { AtlasGrounding };
