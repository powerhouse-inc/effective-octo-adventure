/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";

import utils from "../../gen/utils.js";
import {
  z,
  type SetFoundationNameInput,
  type SetDocNumberInput,
  type SetContentInput,
  type SetMasterStatusInput,
  type SetAtlasTypeInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/general/creators.js";
import { type AtlasFoundationDocument } from "../../gen/types.js";

describe("General Operations", () => {
  let document: AtlasFoundationDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle setFoundationName operation", () => {
    const input: SetFoundationNameInput = generateMock(
      z.SetFoundationNameInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setFoundationName(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe(
      "SET_FOUNDATION_NAME",
    );
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setDocNumber operation", () => {
    const input: SetDocNumberInput = generateMock(z.SetDocNumberInputSchema());

    const updatedDocument = reducer(document, creators.setDocNumber(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("SET_DOC_NUMBER");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setContent operation", () => {
    const input: SetContentInput = generateMock(z.SetContentInputSchema());

    const updatedDocument = reducer(document, creators.setContent(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("SET_CONTENT");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setMasterStatus operation", () => {
    const input: SetMasterStatusInput = generateMock(
      z.SetMasterStatusInputSchema(),
    );

    const updatedDocument = reducer(document, creators.setMasterStatus(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("SET_MASTER_STATUS");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  // it("should handle setReferences operation", () => {
  //   const input: SetReferencesInput = generateMock(
  //     z.SetReferencesInputSchema(),
  //   );

  //   const updatedDocument = reducer(document, creators.setReferences(input));

  //   expect(updatedDocument.operations.global).toHaveLength(1);
  //   expect(updatedDocument.operations.global[0].type).toBe("SET_REFERENCES");
  //   expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
  //   expect(updatedDocument.operations.global[0].index).toEqual(0);
  // });
  it("should handle setAtlasType operation", () => {
    const input: SetAtlasTypeInput = generateMock(z.SetAtlasTypeInputSchema());

    const updatedDocument = reducer(document, creators.setAtlasType(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("SET_ATLAS_TYPE");
    expect(updatedDocument.operations.global[0].input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
