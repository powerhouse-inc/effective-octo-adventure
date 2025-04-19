import { BaseDocumentClass } from "document-model";
import {
  type SetNameInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type AddParentInput,
  type SetAtlasTypeInput,
  type RemoveParentInput,
  type ReplaceParentInput,
  type AtlasMultiParentState,
  type AtlasMultiParentLocalState,
} from "../types.js";
import {
  setName,
  setContent,
  setMasterStatus,
  addParent,
  setAtlasType,
  removeParent,
  replaceParent,
} from "./creators.js";
import { type AtlasMultiParentAction } from "../actions.js";

export default class AtlasMultiParent_General extends BaseDocumentClass<
  AtlasMultiParentState,
  AtlasMultiParentLocalState,
  AtlasMultiParentAction
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

  public addParent(input: AddParentInput) {
    return this.dispatch(addParent(input));
  }

  public setAtlasType(input: SetAtlasTypeInput) {
    return this.dispatch(setAtlasType(input));
  }

  public removeParent(input: RemoveParentInput) {
    return this.dispatch(removeParent(input));
  }

  public replaceParent(input: ReplaceParentInput) {
    return this.dispatch(replaceParent(input));
  }
}
