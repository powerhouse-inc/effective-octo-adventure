import {
  BaseDocumentClass,
  type ExtendedState,
  type PartialState,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import {
  type AtlasExploratoryState,
  type AtlasExploratoryLocalState,
} from "./types.js";
import { type AtlasExploratoryAction } from "./actions.js";
import { reducer } from "./reducer.js";
import utils from "./utils.js";
import AtlasExploratory_General from "./general/object.js";
import AtlasExploratory_Tags from "./tags/object.js";
import AtlasExploratory_Context from "./context/object.js";

export * from "./general/object.js";
export * from "./tags/object.js";
export * from "./context/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface AtlasExploratory
  extends AtlasExploratory_General,
    AtlasExploratory_Tags,
    AtlasExploratory_Context {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class AtlasExploratory extends BaseDocumentClass<
  AtlasExploratoryState,
  AtlasExploratoryLocalState,
  AtlasExploratoryAction
> {
  static fileExtension = ".axp";

  constructor(
    initialState?: Partial<
      ExtendedState<
        PartialState<AtlasExploratoryState>,
        PartialState<AtlasExploratoryLocalState>
      >
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, AtlasExploratory.fileExtension, name);
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

applyMixins(AtlasExploratory, [
  AtlasExploratory_General,
  AtlasExploratory_Tags,
  AtlasExploratory_Context,
]);

export { AtlasExploratory };
