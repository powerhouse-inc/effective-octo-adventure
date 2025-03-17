/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import { hashKey } from "document-model";

import utils from "../../gen/utils.js";
import {
  z,
  type SetExploratoryNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type SetParentInput,
  type RemoveParentInput,
  type SetAtlasTypeInput,
  type SetFindingsInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/general/creators.js";
import { type AtlasExploratoryDocument } from "../../gen/types.js";

describe("General Operations", () => {
  let document: AtlasExploratoryDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle setExploratoryName operation", () => {
    // generate a random id
    // const id = hashKey();

    const input: SetExploratoryNameInput = generateMock(
      z.SetExploratoryNameInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setExploratoryName(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "SET_EXPLORATORY_NAME",
    );
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
  it("should handle setParent operation", () => {
    // generate a random id
    // const id = hashKey();

    const input: SetParentInput = generateMock(z.SetParentInputSchema());

    const updatedDocument = reducer(document, creators.setParent(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("SET_PARENT");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeParent operation", () => {
    // generate a random id
    // const id = hashKey();

    const input: RemoveParentInput = generateMock(z.RemoveParentInputSchema());

    const updatedDocument = reducer(document, creators.removeParent(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("REMOVE_PARENT");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setAtlasType operation", () => {
    // generate a random id
    // const id = hashKey();

    const input: SetAtlasTypeInput = generateMock(z.SetAtlasTypeInputSchema());

    const updatedDocument = reducer(document, creators.setAtlasType(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("SET_ATLAS_TYPE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setFindings operation", () => {
    // generate a random id
    // const id = hashKey();

    const input: SetFindingsInput = generateMock(z.SetFindingsInputSchema());

    const updatedDocument = reducer(document, creators.setFindings(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("SET_FINDINGS");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
