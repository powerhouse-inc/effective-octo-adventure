import { BaseDocumentClass } from "document-model";
import {
  type SetNameInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type SetAtlasTypeInput,
  type SetParentInput,
  type SetDocumentNumberInput,
  type AtlasFoundationState,
  type AtlasFoundationLocalState,
} from "../types.js";
import {
  setName,
  setContent,
  setMasterStatus,
  setAtlasType,
  setParent,
  setDocumentNumber,
} from "./creators.js";
import { type AtlasFoundationAction } from "../actions.js";

export default class AtlasFoundation_General extends BaseDocumentClass<
  AtlasFoundationState,
  AtlasFoundationLocalState,
  AtlasFoundationAction
> {
  public setName(input: SetNameInput) {
    return this.dispatch(setName(input));
  }

  public setContent(input: SetContentInput) {
    return this.dispatch(setContent(input));
  }

  public setMasterStatus(input: SetMasterStatusInput) {
    return this.dispatch(setMasterStatus(input));
  }

  public setAtlasType(input: SetAtlasTypeInput) {
    return this.dispatch(setAtlasType(input));
  }

  public setParent(input: SetParentInput) {
    return this.dispatch(setParent(input));
  }

  public setDocumentNumber(input: SetDocumentNumberInput) {
    return this.dispatch(setDocumentNumber(input));
  }
}
