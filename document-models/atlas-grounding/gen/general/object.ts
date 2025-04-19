import { BaseDocumentClass } from "document-model";
import {
  type SetNameInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type SetAtlasTypeInput,
  type SetParentInput,
  type SetDocumentNumberInput,
  type AtlasGroundingState,
  type AtlasGroundingLocalState,
} from "../types.js";
import {
  setName,
  setContent,
  setMasterStatus,
  setAtlasType,
  setParent,
  setDocumentNumber,
} from "./creators.js";
import { type AtlasGroundingAction } from "../actions.js";

export default class AtlasGrounding_General extends BaseDocumentClass<
  AtlasGroundingState,
  AtlasGroundingLocalState,
  AtlasGroundingAction
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
