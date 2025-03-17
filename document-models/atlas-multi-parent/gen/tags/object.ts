import { BaseDocumentClass } from "document-model";
import {
  type AddTagsInput,
  type RemoveTagsInput,
  type AtlasMultiParentState,
  type AtlasMultiParentLocalState,
} from "../types.js";
import { addTags, removeTags } from "./creators.js";
import { type AtlasMultiParentAction } from "../actions.js";

export default class AtlasMultiParent_Tags extends BaseDocumentClass<
  AtlasMultiParentState,
  AtlasMultiParentLocalState,
  AtlasMultiParentAction
> {
  public addTags(input: AddTagsInput) {
    return this.dispatch(addTags(input));
  }

  public removeTags(input: RemoveTagsInput) {
    return this.dispatch(removeTags(input));
  }
}
