import { BaseDocumentClass } from "document-model";
import {
  type AddContextDataInput,
  type RemoveContextDataInput,
  type SetNotionIdInput,
  type ReplaceContextDataInput,
  type AtlasFoundationState,
  type AtlasFoundationLocalState,
} from "../types.js";
import {
  addContextData,
  removeContextData,
  setNotionId,
  replaceContextData,
} from "./creators.js";
import { type AtlasFoundationAction } from "../actions.js";

export default class AtlasFoundation_Context extends BaseDocumentClass<
  AtlasFoundationState,
  AtlasFoundationLocalState,
  AtlasFoundationAction
> {
  public addContextData(input: AddContextDataInput) {
    return this.dispatch(addContextData(input));
  }

  public removeContextData(input: RemoveContextDataInput) {
    return this.dispatch(removeContextData(input));
  }

  public setNotionId(input: SetNotionIdInput) {
    return this.dispatch(setNotionId(input));
  }

  public replaceContextData(input: ReplaceContextDataInput) {
    return this.dispatch(replaceContextData(input));
  }
}
