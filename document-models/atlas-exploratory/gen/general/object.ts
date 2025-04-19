import { BaseDocumentClass } from "document-model";
import {
  type SetNameInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type SetParentInput,
  type SetAtlasTypeInput,
  type SetFindingsInput,
  type SetDocumentNumberInput,
  type AtlasExploratoryState,
  type AtlasExploratoryLocalState,
} from "../types.js";
import {
  setName,
  setContent,
  setMasterStatus,
  setParent,
  setAtlasType,
  setFindings,
  setDocumentNumber,
} from "./creators.js";
import { type AtlasExploratoryAction } from "../actions.js";

export default class AtlasExploratory_General extends BaseDocumentClass<
  AtlasExploratoryState,
  AtlasExploratoryLocalState,
  AtlasExploratoryAction
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

  public setParent(input: SetParentInput) {
    return this.dispatch(setParent(input));
  }

  public setAtlasType(input: SetAtlasTypeInput) {
    return this.dispatch(setAtlasType(input));
  }

  public setFindings(input: SetFindingsInput) {
    return this.dispatch(setFindings(input));
  }

  public setDocumentNumber(input: SetDocumentNumberInput) {
    return this.dispatch(setDocumentNumber(input));
  }
}
