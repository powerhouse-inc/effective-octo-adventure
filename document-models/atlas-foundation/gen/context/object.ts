import { BaseDocumentClass } from "document-model";
import {
  type AddContextDataInput,
  type RemoveContextDataInput,
  type SetProvenanceInput,
  type SetNotionIdInput,
  type AtlasFoundationState,
  type AtlasFoundationLocalState,
} from "../types.js";
import {
  addContextData,
  removeContextData,
  setProvenance,
  setNotionId,
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

  public setProvenance(input: SetProvenanceInput) {
    return this.dispatch(setProvenance(input));
  }

  public setNotionId(input: SetNotionIdInput) {
    return this.dispatch(setNotionId(input));
  }
}
