import { BaseDocumentClass } from "document-model";
import {
  type AddContextDataInput,
  type RemoveContextDataInput,
  type SetNotionIdInput,
  type SetAdditionalGuidanceInput,
  type ReplaceContextDataInput,
  type AtlasExploratoryState,
  type AtlasExploratoryLocalState,
} from "../types.js";
import {
  addContextData,
  removeContextData,
  setNotionId,
  setAdditionalGuidance,
  replaceContextData,
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

  public setNotionId(input: SetNotionIdInput) {
    return this.dispatch(setNotionId(input));
  }

  public setAdditionalGuidance(input: SetAdditionalGuidanceInput) {
    return this.dispatch(setAdditionalGuidance(input));
  }

  public replaceContextData(input: ReplaceContextDataInput) {
    return this.dispatch(replaceContextData(input));
  }
}
