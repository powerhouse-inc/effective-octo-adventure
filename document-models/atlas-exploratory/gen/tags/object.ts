import { BaseDocumentClass } from "document-model";
import {
  type AddTagsInput,
  type RemoveTagsInput,
  type AtlasExploratoryState,
  type AtlasExploratoryLocalState,
} from "../types.js";
import { addTags, removeTags } from "./creators.js";
import { type AtlasExploratoryAction } from "../actions.js";

export default class AtlasExploratory_Tags extends BaseDocumentClass<
  AtlasExploratoryState,
  AtlasExploratoryLocalState,
  AtlasExploratoryAction
> {
  public addTags(input: AddTagsInput) {
    return this.dispatch(addTags(input));
  }

  public removeTags(input: RemoveTagsInput) {
    return this.dispatch(removeTags(input));
  }
}
