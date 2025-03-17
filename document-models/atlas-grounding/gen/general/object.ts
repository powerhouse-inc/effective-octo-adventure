import { BaseDocumentClass } from "document-model";
import {
  type SetGroundingNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type SetAtlasTypeInput,
  type SetParentInput,
  type AtlasGroundingState,
  type AtlasGroundingLocalState,
} from "../types.js";
import {
  setGroundingName,
  setDocNumber,
  setContent,
  setMasterStatus,
  setAtlasType,
  setParent,
} from "./creators.js";
import { type AtlasGroundingAction } from "../actions.js";

export default class AtlasGrounding_General extends BaseDocumentClass<
  AtlasGroundingState,
  AtlasGroundingLocalState,
  AtlasGroundingAction
> {
  public setGroundingName(input: SetGroundingNameInput) {
    return this.dispatch(setGroundingName(input));
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

  public setAtlasType(input: SetAtlasTypeInput) {
    return this.dispatch(setAtlasType(input));
  }

  public setParent(input: SetParentInput) {
    return this.dispatch(setParent(input));
  }
}
