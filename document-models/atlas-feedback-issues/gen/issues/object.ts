import { BaseDocumentClass } from "document-model";
import {
  type CreateIssueInput,
  type DeleteIssueInput,
  type AddNotionIdInput,
  type RemoveNotionIdInput,
  type AtlasFeedbackIssuesState,
  type AtlasFeedbackIssuesLocalState,
} from "../types.js";
import {
  createIssue,
  deleteIssue,
  addNotionId,
  removeNotionId,
} from "./creators.js";
import { type AtlasFeedbackIssuesAction } from "../actions.js";

export default class AtlasFeedbackIssues_Issues extends BaseDocumentClass<
  AtlasFeedbackIssuesState,
  AtlasFeedbackIssuesLocalState,
  AtlasFeedbackIssuesAction
> {
  public createIssue(input: CreateIssueInput) {
    return this.dispatch(createIssue(input));
  }

  public deleteIssue(input: DeleteIssueInput) {
    return this.dispatch(deleteIssue(input));
  }

  public addNotionId(input: AddNotionIdInput) {
    return this.dispatch(addNotionId(input));
  }

  public removeNotionId(input: RemoveNotionIdInput) {
    return this.dispatch(removeNotionId(input));
  }
}
