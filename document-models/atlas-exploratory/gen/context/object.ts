import { BaseDocumentClass } from "document-model";
import {
  type AddContextDataInput,
  type RemoveContextDataInput,
  type SetProvenanceInput,
  type SetNotionIdInput,
  type AddAdditionalGuidanceInput,
  type RemoveAdditionalGuidanceInput,
  type AtlasExploratoryState,
  type AtlasExploratoryLocalState,
} from "../types.js";
import {
  addContextData,
  removeContextData,
  setProvenance,
  setNotionId,
  addAdditionalGuidance,
  removeAdditionalGuidance,
} from "./creators.js";
import { type AtlasExploratoryAction } from "../actions.js";

export default class AtlasExploratory_Context extends BaseDocumentClass<
  AtlasExploratoryState,
  AtlasExploratoryLocalState,
  AtlasExploratoryAction
> {
  public addContextData(input: AddContextDataInput) {
    return this.dispatch(addContextData(input));
  }

  public removeContextData(input: RemoveContextDataInput) {
    return this.dispatch(removeContextData(input));
  }

  public setProvenance(input: SetProvenanceInput) {
    return this.dispatch(setProvenance(input));
  }

  public setNotionId(input: SetNotionIdInput) {
    return this.dispatch(setNotionId(input));
  }

  public addAdditionalGuidance(input: AddAdditionalGuidanceInput) {
    return this.dispatch(addAdditionalGuidance(input));
  }

  public removeAdditionalGuidance(input: RemoveAdditionalGuidanceInput) {
    return this.dispatch(removeAdditionalGuidance(input));
  }
}
