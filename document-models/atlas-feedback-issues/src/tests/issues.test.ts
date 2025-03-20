/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";

import utils from "../../gen/utils.js";
import {
  z,
  type CreateIssueInput,
  type DeleteIssueInput,
  type AddNotionIdInput,
  type RemoveNotionIdInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/issues/creators.js";
import type { AtlasFeedbackIssuesDocument } from "../../gen/types.js";

describe("Issues Operations", () => {
  let document: AtlasFeedbackIssuesDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle createIssue operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: CreateIssueInput = generateMock(z.CreateIssueInputSchema());

    const updatedDocument = reducer(document, creators.createIssue(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("CREATE_ISSUE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle deleteIssue operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: DeleteIssueInput = generateMock(z.DeleteIssueInputSchema());

    const updatedDocument = reducer(document, creators.deleteIssue(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("DELETE_ISSUE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle addNotionId operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: AddNotionIdInput = generateMock(z.AddNotionIdInputSchema());

    const updatedDocument = reducer(document, creators.addNotionId(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_NOTION_ID");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeNotionId operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: RemoveNotionIdInput = generateMock(
      z.RemoveNotionIdInputSchema(),
    );

    const updatedDocument = reducer(document, creators.removeNotionId(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("REMOVE_NOTION_ID");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
