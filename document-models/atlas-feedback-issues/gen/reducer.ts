import {
  type StateReducer,
  isDocumentAction,
  createReducer,
} from "document-model";
import { type AtlasFeedbackIssuesDocument, z } from "./types.js";

import { reducer as IssuesReducer } from "../src/reducers/issues.js";
import { reducer as CommentsReducer } from "../src/reducers/comments.js";

const stateReducer: StateReducer<AtlasFeedbackIssuesDocument> = (
  state,
  action,
  dispatch,
) => {
  if (isDocumentAction(action)) {
    return state;
  }

  switch (action.type) {
    case "CREATE_ISSUE":
      z.CreateIssueInputSchema().parse(action.input);
      IssuesReducer.createIssueOperation(state[action.scope], action, dispatch);
      break;

    case "DELETE_ISSUE":
      z.DeleteIssueInputSchema().parse(action.input);
      IssuesReducer.deleteIssueOperation(state[action.scope], action, dispatch);
      break;

    case "ADD_NOTION_ID":
      z.AddNotionIdInputSchema().parse(action.input);
      IssuesReducer.addNotionIdOperation(state[action.scope], action, dispatch);
      break;

    case "REMOVE_NOTION_ID":
      z.RemoveNotionIdInputSchema().parse(action.input);
      IssuesReducer.removeNotionIdOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "CREATE_COMMENT":
      z.CreateCommentInputSchema().parse(action.input);
      CommentsReducer.createCommentOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "DELETE_COMMENT":
      z.DeleteCommentInputSchema().parse(action.input);
      CommentsReducer.deleteCommentOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    case "EDIT_COMMENT":
      z.EditCommentInputSchema().parse(action.input);
      CommentsReducer.editCommentOperation(
        state[action.scope],
        action,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<AtlasFeedbackIssuesDocument>(stateReducer);
