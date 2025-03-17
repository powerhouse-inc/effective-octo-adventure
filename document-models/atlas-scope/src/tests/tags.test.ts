/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import { hashKey } from "document-model";

import utils from "../../gen/utils";
import { z, AddTagsInput, RemoveTagsInput } from "../../gen/schema";
import { reducer } from "../../gen/reducer";
import * as creators from "../../gen/tags/creators";
import { AtlasScopeDocument } from "../../gen/types";

describe("Tags Operations", () => {
  let document: AtlasScopeDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addTags operation", () => {
    // generate a random id
    // const id = hashKey();

    const input: AddTagsInput = generateMock(z.AddTagsInputSchema());

    const updatedDocument = reducer(document, creators.addTags(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("ADD_TAGS");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeTags operation", () => {
    // generate a random id
    // const id = hashKey();

    const input: RemoveTagsInput = generateMock(z.RemoveTagsInputSchema());

    const updatedDocument = reducer(document, creators.removeTags(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("REMOVE_TAGS");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
