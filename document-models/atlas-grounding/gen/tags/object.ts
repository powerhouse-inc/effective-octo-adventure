import { BaseDocumentClass } from "document-model";
import {
  type AddTagsInput,
  type RemoveTagsInput,
  type AtlasGroundingState,
  type AtlasGroundingLocalState,
} from "../types.js";
import { addTags, removeTags } from "./creators.js";
import { type AtlasGroundingAction } from "../actions.js";

export default class AtlasGrounding_Tags extends BaseDocumentClass<
  AtlasGroundingState,
  AtlasGroundingLocalState,
  AtlasGroundingAction
> {
  public addTags(input: AddTagsInput) {
    return this.dispatch(addTags(input));
  }

  public removeTags(input: RemoveTagsInput) {
    return this.dispatch(removeTags(input));
  }
}
