/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";

import utils from "../../gen/utils.js";
import {
  z,
  type AddTagsInput,
  type RemoveTagsInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/tags/creators.js";
import { type AtlasMultiParentDocument } from "../../gen/types.js";

describe("Tags Operations", () => {
  let document: AtlasMultiParentDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addTags operation", () => {
    const input: AddTagsInput = generateMock(z.AddTagsInputSchema());

    const updatedDocument = reducer(document, creators.addTags(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_TAGS");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeTags operation", () => {
    const input: RemoveTagsInput = generateMock(z.RemoveTagsInputSchema());

    const updatedDocument = reducer(document, creators.removeTags(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("REMOVE_TAGS");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
