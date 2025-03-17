import { BaseDocumentClass } from "document-model";
import {
  type AddContextDataInput,
  type RemoveContextDataInput,
  type SetProvenanceInput,
  type SetNotionIdInput,
  type AddReferenceInput,
  type RemoveReferenceInput,
  type AtlasGroundingState,
  type AtlasGroundingLocalState,
} from "../types.js";
import {
  addContextData,
  removeContextData,
  setProvenance,
  setNotionId,
  addReference,
  removeReference,
} from "./creators.js";
import { type AtlasGroundingAction } from "../actions.js";

export default class AtlasGrounding_Context extends BaseDocumentClass<
  AtlasGroundingState,
  AtlasGroundingLocalState,
  AtlasGroundingAction
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

  public addReference(input: AddReferenceInput) {
    return this.dispatch(addReference(input));
  }

  public removeReference(input: RemoveReferenceInput) {
    return this.dispatch(removeReference(input));
  }
}
