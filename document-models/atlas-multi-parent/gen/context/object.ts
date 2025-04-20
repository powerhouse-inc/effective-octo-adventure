import { BaseDocumentClass } from "document-model";
import {
  type AddContextDataInput,
  type RemoveContextDataInput,
  type ReplaceContextDataInput,
  type SetNotionIdInput,
  type AtlasMultiParentState,
  type AtlasMultiParentLocalState,
} from "../types.js";
import {
  addContextData,
  removeContextData,
  replaceContextData,
  setNotionId,
} from "./creators.js";
import { type AtlasMultiParentAction } from "../actions.js";

export default class AtlasMultiParent_Context extends BaseDocumentClass<
  AtlasMultiParentState,
  AtlasMultiParentLocalState,
  AtlasMultiParentAction
> {
  public addContextData(input: AddContextDataInput) {
    return this.dispatch(addContextData(input));
  }

  public removeContextData(input: RemoveContextDataInput) {
    return this.dispatch(removeContextData(input));
  }

  public replaceContextData(input: ReplaceContextDataInput) {
    return this.dispatch(replaceContextData(input));
  }

  public setNotionId(input: SetNotionIdInput) {
    return this.dispatch(setNotionId(input));
  }
}
