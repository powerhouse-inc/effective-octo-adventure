import {
  BaseDocumentClass,
  type ExtendedState,
  type PartialState,
  applyMixins,
  type SignalDispatch,
} from "document-model";
import {
  type AtlasFeedbackIssuesState,
  type AtlasFeedbackIssuesLocalState,
} from "./types.js";
import { type AtlasFeedbackIssuesAction } from "./actions.js";
import { reducer } from "./reducer.js";
import utils from "./utils.js";
import AtlasFeedbackIssues_Issues from "./issues/object.js";
import AtlasFeedbackIssues_Comments from "./comments/object.js";

export * from "./issues/object.js";
export * from "./comments/object.js";

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
interface AtlasFeedbackIssues
  extends AtlasFeedbackIssues_Issues,
    AtlasFeedbackIssues_Comments {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
class AtlasFeedbackIssues extends BaseDocumentClass<
  AtlasFeedbackIssuesState,
  AtlasFeedbackIssuesLocalState,
  AtlasFeedbackIssuesAction
> {
  static fileExtension = ".phdm";

  constructor(
    initialState?: Partial<
      ExtendedState<
        PartialState<AtlasFeedbackIssuesState>,
        PartialState<AtlasFeedbackIssuesLocalState>
      >
    >,
    dispatch?: SignalDispatch,
  ) {
    super(reducer, utils.createDocument(initialState), dispatch);
  }

  public saveToFile(path: string, name?: string) {
    return super.saveToFile(path, AtlasFeedbackIssues.fileExtension, name);
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

applyMixins(AtlasFeedbackIssues, [
  AtlasFeedbackIssues_Issues,
  AtlasFeedbackIssues_Comments,
]);

export { AtlasFeedbackIssues };
