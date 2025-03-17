import {
  BaseDocumentClass,
  type ExtendedState,
  type PartialState,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import {
  type AtlasMultiParentState,
  type AtlasMultiParentLocalState,
} from "./types.js";
import { type AtlasMultiParentAction } from "./actions.js";
import { reducer } from "./reducer.js";
import utils from "./utils.js";
import AtlasMultiParent_General from "./general/object.js";
import AtlasMultiParent_Tags from "./tags/object.js";
import AtlasMultiParent_Context from "./context/object.js";

export * from "./general/object.js";
export * from "./tags/object.js";
export * from "./context/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface AtlasMultiParent
  extends AtlasMultiParent_General,
    AtlasMultiParent_Tags,
    AtlasMultiParent_Context {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class AtlasMultiParent extends BaseDocumentClass<
  AtlasMultiParentState,
  AtlasMultiParentLocalState,
  AtlasMultiParentAction
> {
  static fileExtension = ".amp";

  constructor(
    initialState?: Partial<
      ExtendedState<
        PartialState<AtlasMultiParentState>,
        PartialState<AtlasMultiParentLocalState>
      >
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, AtlasMultiParent.fileExtension, name);
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

applyMixins(AtlasMultiParent, [
  AtlasMultiParent_General,
  AtlasMultiParent_Tags,
  AtlasMultiParent_Context,
]);

export { AtlasMultiParent };
