import { BaseDocumentClass } from "document-model";
import {
  type SetExploratoryNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type SetParentInput,
  type RemoveParentInput,
  type SetAtlasTypeInput,
  type SetFindingsInput,
  type SetReferenceInput,
  type RemoveReferenceInput,
  type AtlasExploratoryState,
  type AtlasExploratoryLocalState,
} from "../types.js";
import {
  setExploratoryName,
  setDocNumber,
  setContent,
  setMasterStatus,
  setParent,
  removeParent,
  setAtlasType,
  setFindings,
  setReference,
  removeReference,
} from "./creators.js";
import { type AtlasExploratoryAction } from "../actions.js";

export default class AtlasExploratory_General extends BaseDocumentClass<
  AtlasExploratoryState,
  AtlasExploratoryLocalState,
  AtlasExploratoryAction
> {
  public setExploratoryName(input: SetExploratoryNameInput) {
    return this.dispatch(setExploratoryName(input));
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

  public setParent(input: SetParentInput) {
    return this.dispatch(setParent(input));
  }

  public removeParent(input: RemoveParentInput) {
    return this.dispatch(removeParent(input));
  }

  public setAtlasType(input: SetAtlasTypeInput) {
    return this.dispatch(setAtlasType(input));
  }

  public setFindings(input: SetFindingsInput) {
    return this.dispatch(setFindings(input));
  }

  public setReference(input: SetReferenceInput) {
    return this.dispatch(setReference(input));
  }

  public removeReference(input: RemoveReferenceInput) {
    return this.dispatch(removeReference(input));
  }
}
