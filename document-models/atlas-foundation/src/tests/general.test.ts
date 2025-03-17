/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import { hashKey } from "document-model";

import utils from "../../gen/utils";
import {
  z,
  SetFoundationNameInput,
  SetDocNumberInput,
  SetContentInput,
  SetMasterStatusInput,
  SetReferencesInput,
  SetAtlasTypeInput,
} from "../../gen/schema";
import { reducer } from "../../gen/reducer";
import * as creators from "../../gen/general/creators";
import { AtlasFoundationDocument } from "../../gen/types";

describe("General Operations", () => {
  let document: AtlasFoundationDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle setFoundationName operation", () => {
    // generate a random id
    // const id = hashKey();

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
  it("should handle setReferences operation", () => {
    // generate a random id
    // const id = hashKey();

    const input: SetReferencesInput = generateMock(
      z.SetReferencesInputSchema(),
    );

    const updatedDocument = reducer(document, creators.setReferences(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].type).toBe("SET_REFERENCES");
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
});
