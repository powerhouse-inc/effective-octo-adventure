import { BaseDocumentClass } from "document-model";
import {
  type AddTagsInput,
  type RemoveTagsInput,
  type AtlasScopeState,
  type AtlasScopeLocalState,
} from "../types.js";
import { addTags, removeTags } from "./creators.js";
import { type AtlasScopeAction } from "../actions.js";

export default class AtlasScope_Tags extends BaseDocumentClass<
  AtlasScopeState,
  AtlasScopeLocalState,
  AtlasScopeAction
> {
  public addTags(input: AddTagsInput) {
    return this.dispatch(addTags(input));
  }

  public removeTags(input: RemoveTagsInput) {
    return this.dispatch(removeTags(input));
  }
}
