/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";

import utils from "../../gen/utils.js";
import {
  z,
  type AddContextDataInput,
  type RemoveContextDataInput,
  type SetNotionIdInput,
  type SetAdditionalGuidanceInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/context/creators.js";
import { type AtlasExploratoryDocument } from "../../gen/types.js";

describe("Context Operations", () => {
  let document: AtlasExploratoryDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle addContextData operation", () => {
    const input: AddContextDataInput = generateMock(
      z.AddContextDataInputSchema(),
    );

    const updatedDocument = reducer(document, creators.addContextData(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("ADD_CONTEXT_DATA");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle removeContextData operation", () => {
    const input: RemoveContextDataInput = generateMock(
      z.RemoveContextDataInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.removeContextData(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "REMOVE_CONTEXT_DATA",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setNotionId operation", () => {
    const input: SetNotionIdInput = generateMock(z.SetNotionIdInputSchema());

    const updatedDocument = reducer(document, creators.setNotionId(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_NOTION_ID");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setAdditionalGuidance operation", () => {
    const input: SetAdditionalGuidanceInput = generateMock(
      z.SetAdditionalGuidanceInputSchema(),
    );

    const updatedDocument = reducer(
      document,
      creators.setAdditionalGuidance(input),
    );

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe(
      "SET_ADDITIONAL_GUIDANCE",
    );
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
});
