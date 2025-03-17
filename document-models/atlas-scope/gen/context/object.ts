import { BaseDocumentClass } from "document-model";
import {
  type AddContextDataInput,
  type RemoveContextDataInput,
  type SetProvenanceInput,
  type SetNotionIdInput,
  type AtlasScopeState,
  type AtlasScopeLocalState,
} from "../types.js";
import {
  addContextData,
  removeContextData,
  setProvenance,
  setNotionId,
} from "./creators.js";
import { type AtlasScopeAction } from "../actions.js";

export default class AtlasScope_Context extends BaseDocumentClass<
  AtlasScopeState,
  AtlasScopeLocalState,
  AtlasScopeAction
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
