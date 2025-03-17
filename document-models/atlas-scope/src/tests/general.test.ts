/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import { hashKey } from "document-model";

import utils from "../../gen/utils.js";
import {
  z,
  type SetScopeNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/general/creators.js";
import { type AtlasScopeDocument } from "../../gen/types.js";

describe("General Operations", () => {
  let document: AtlasScopeDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle setScopeName operation", () => {
    // generate a random id
    // const id = hashKey();

    const input: SetScopeNameInput = generateMock(z.SetScopeNameInputSchema());

    const updatedDocument = reducer(document, creators.setScopeName(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("SET_SCOPE_NAME");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setDocNumber operation", () => {
    // generate a random id
    // const id = hashKey();

    const input: SetDocNumberInput = generateMock(z.SetDocNumberInputSchema());

    const updatedDocument = reducer(document, creators.setDocNumber(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("SET_DOC_NUMBER");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setContent operation", () => {
    // generate a random id
    // const id = hashKey();

    const input: SetContentInput = generateMock(z.SetContentInputSchema());

    const updatedDocument = reducer(document, creators.setContent(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("SET_CONTENT");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setMasterStatus operation", () => {
    // generate a random id
    // const id = hashKey();

    const input: SetMasterStatusInput = generateMock(
      z.SetMasterStatusInputSchema(),
    );

    const updatedDocument = reducer(document, creators.setMasterStatus(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("SET_MASTER_STATUS");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
