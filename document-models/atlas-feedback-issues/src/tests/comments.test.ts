/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";

import utils from "../../gen/utils.js";
import {
  z,
  type CreateCommentInput,
  type DeleteCommentInput,
  type EditCommentInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/comments/creators.js";
import type { AtlasFeedbackIssuesDocument } from "../../gen/types.js";

describe("Comments Operations", () => {
  let document: AtlasFeedbackIssuesDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle createComment operation", () => {
    const input: CreateCommentInput = generateMock(
      z.CreateCommentInputSchema(),
    );

    const updatedDocument = reducer(document, creators.createComment(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("CREATE_COMMENT");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteComment operation", () => {
    const input: DeleteCommentInput = generateMock(
      z.DeleteCommentInputSchema(),
    );

    const updatedDocument = reducer(document, creators.deleteComment(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("DELETE_COMMENT");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle editComment operation", () => {
    const input: EditCommentInput = generateMock(z.EditCommentInputSchema());

    const updatedDocument = reducer(document, creators.editComment(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("EDIT_COMMENT");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
