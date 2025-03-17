import { BaseDocumentClass } from "document-model";
import {
  type SetMultiparentNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type AddParentInput,
  type SetAtlasTypeInput,
  type RemoveParentInput,
  type AtlasMultiParentState,
  type AtlasMultiParentLocalState,
} from "../types.js";
import {
  setMultiparentName,
  setDocNumber,
  setContent,
  setMasterStatus,
  addParent,
  setAtlasType,
  removeParent,
} from "./creators.js";
import { type AtlasMultiParentAction } from "../actions.js";

export default class AtlasMultiParent_General extends BaseDocumentClass<
  AtlasMultiParentState,
  AtlasMultiParentLocalState,
  AtlasMultiParentAction
> {
  public setMultiparentName(input: SetMultiparentNameInput) {
    return this.dispatch(setMultiparentName(input));
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

  public addParent(input: AddParentInput) {
    return this.dispatch(addParent(input));
  }

  public setAtlasType(input: SetAtlasTypeInput) {
    return this.dispatch(setAtlasType(input));
  }

  public removeParent(input: RemoveParentInput) {
    return this.dispatch(removeParent(input));
  }
}
