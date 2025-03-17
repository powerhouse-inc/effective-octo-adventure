import { BaseDocumentClass } from "document-model";
import {
  type SetFoundationNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type AddReferenceInput,
  type SetAtlasTypeInput,
  type RemoveReferenceInput,
  type SetParentInput,
  type AtlasFoundationState,
  type AtlasFoundationLocalState,
} from "../types.js";
import {
  setFoundationName,
  setDocNumber,
  setContent,
  setMasterStatus,
  addReference,
  setAtlasType,
  removeReference,
  setParent,
} from "./creators.js";
import { type AtlasFoundationAction } from "../actions.js";

export default class AtlasFoundation_General extends BaseDocumentClass<
  AtlasFoundationState,
  AtlasFoundationLocalState,
  AtlasFoundationAction
> {
  public setFoundationName(input: SetFoundationNameInput) {
    return this.dispatch(setFoundationName(input));
  }

  public setDocNumber(input: SetDocNumberInput) {
    return this.dispatch(setDocNumber(input));
  }

  public setContent(input: SetContentInput) {
    return this.dispatch(setContent(input));
  }

  public setMasterStatus(input: SetMasterStatusInput) {
    return this.dispatch(setMasterStatus(input));
  }

  public addReference(input: AddReferenceInput) {
    return this.dispatch(addReference(input));
  }

  public setAtlasType(input: SetAtlasTypeInput) {
    return this.dispatch(setAtlasType(input));
  }

  public removeReference(input: RemoveReferenceInput) {
    return this.dispatch(removeReference(input));
  }

  public setParent(input: SetParentInput) {
    return this.dispatch(setParent(input));
  }
}
