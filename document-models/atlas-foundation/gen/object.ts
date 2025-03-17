import {
  BaseDocumentClass,
  type ExtendedState,
  type PartialState,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import {
  type AtlasFoundationState,
  type AtlasFoundationLocalState,
} from "./types.js";
import { type AtlasFoundationAction } from "./actions.js";
import { reducer } from "./reducer.js";
import utils from "./utils.js";
import AtlasFoundation_General from "./general/object.js";
import AtlasFoundation_Tags from "./tags/object.js";
import AtlasFoundation_Context from "./context/object.js";

export * from "./general/object.js";
export * from "./tags/object.js";
export * from "./context/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface AtlasFoundation
  extends AtlasFoundation_General,
    AtlasFoundation_Tags,
    AtlasFoundation_Context {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class AtlasFoundation extends BaseDocumentClass<
  AtlasFoundationState,
  AtlasFoundationLocalState,
  AtlasFoundationAction
> {
  static fileExtension = ".afn";

  constructor(
    initialState?: Partial<
      ExtendedState<
        PartialState<AtlasFoundationState>,
        PartialState<AtlasFoundationLocalState>
      >
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, AtlasFoundation.fileExtension, name);
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

applyMixins(AtlasFoundation, [
  AtlasFoundation_General,
  AtlasFoundation_Tags,
  AtlasFoundation_Context,
]);

export { AtlasFoundation };
