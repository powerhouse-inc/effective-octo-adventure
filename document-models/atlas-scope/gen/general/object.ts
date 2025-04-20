import { BaseDocumentClass } from "document-model";
import {
  type SetNameInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type SetDocumentNumberInput,
  type AtlasScopeState,
  type AtlasScopeLocalState,
} from "../types.js";
import {
  setName,
  setContent,
  setMasterStatus,
  setDocumentNumber,
} from "./creators.js";
import { type AtlasScopeAction } from "../actions.js";

export default class AtlasScope_General extends BaseDocumentClass<
  AtlasScopeState,
  AtlasScopeLocalState,
  AtlasScopeAction
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

  public setDocumentNumber(input: SetDocumentNumberInput) {
    return this.dispatch(setDocumentNumber(input));
  }
}
