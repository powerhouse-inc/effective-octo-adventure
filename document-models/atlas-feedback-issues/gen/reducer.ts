// TODO: remove eslint-disable rules once refactor is done
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import type { StateReducer } from "document-model";
import { isDocumentAction, createReducer } from "document-model/core";
import type { AtlasFeedbackIssuesPHState } from "./types.js";
import { z } from "./types.js";

import { reducer as IssuesReducer } from "../src/reducers/issues.js";
import { reducer as CommentsReducer } from "../src/reducers/comments.js";

export const stateReducer: StateReducer<AtlasFeedbackIssuesPHState> = (
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
      IssuesReducer.createIssueOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_ISSUE":
      z.DeleteIssueInputSchema().parse(action.input);
      IssuesReducer.deleteIssueOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "ADD_NOTION_ID":
      z.AddNotionIdInputSchema().parse(action.input);
      IssuesReducer.addNotionIdOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "REMOVE_NOTION_ID":
      z.RemoveNotionIdInputSchema().parse(action.input);
      IssuesReducer.removeNotionIdOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "CREATE_COMMENT":
      z.CreateCommentInputSchema().parse(action.input);
      CommentsReducer.createCommentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "DELETE_COMMENT":
      z.DeleteCommentInputSchema().parse(action.input);
      CommentsReducer.deleteCommentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    case "EDIT_COMMENT":
      z.EditCommentInputSchema().parse(action.input);
      CommentsReducer.editCommentOperation(
        (state as any)[action.scope],
        action as any,
        dispatch,
      );
      break;

    default:
      return state;
  }
};

export const reducer = createReducer<AtlasFeedbackIssuesPHState>(stateReducer);
