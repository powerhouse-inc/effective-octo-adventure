import { BaseDocumentClass } from "document-model";
import {
  type SetScopeNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type AtlasScopeState,
  type AtlasScopeLocalState,
} from "../types.js";
import {
  setScopeName,
  setDocNumber,
  setContent,
  setMasterStatus,
} from "./creators.js";
import { type AtlasScopeAction } from "../actions.js";

export default class AtlasScope_General extends BaseDocumentClass<
  AtlasScopeState,
  AtlasScopeLocalState,
  AtlasScopeAction
> {
  public setScopeName(input: SetScopeNameInput) {
    return this.dispatch(setScopeName(input));
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
}
