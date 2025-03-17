import { BaseDocumentClass } from "document-model";
import {
  type AddTagsInput,
  type RemoveTagsInput,
  type AtlasFoundationState,
  type AtlasFoundationLocalState,
} from "../types.js";
import { addTags, removeTags } from "./creators.js";
import { type AtlasFoundationAction } from "../actions.js";

export default class AtlasFoundation_Tags extends BaseDocumentClass<
  AtlasFoundationState,
  AtlasFoundationLocalState,
  AtlasFoundationAction
> {
  public addTags(input: AddTagsInput) {
    return this.dispatch(addTags(input));
  }

  public removeTags(input: RemoveTagsInput) {
    return this.dispatch(removeTags(input));
  }
}
