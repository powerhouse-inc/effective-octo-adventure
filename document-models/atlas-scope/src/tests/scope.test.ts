/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import { utils as documentModelUtils } from "document-model/document";

import utils from "../../gen/utils";
import { z, UpdateScopeInput, PopulateScopeInput } from "../../gen/schema";
import { reducer } from "../../gen/reducer";
import * as creators from "../../gen/scope/creators";
import { AtlasScopeDocument } from "../../gen/types";

describe("Scope Operations", () => {
  let document: AtlasScopeDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle updateScope operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: UpdateScopeInput = generateMock(z.UpdateScopeInputSchema());

    const updatedDocument = reducer(document, creators.updateScope(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("UPDATE_SCOPE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle populateScope operation", () => {
    // generate a random id
    // const id = documentModelUtils.hashKey();

    const input: PopulateScopeInput = generateMock(
      z.PopulateScopeInputSchema(),
    );

    const updatedDocument = reducer(document, creators.populateScope(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("POPULATE_SCOPE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
