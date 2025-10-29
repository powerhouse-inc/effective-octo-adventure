/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import { generateMock } from "@powerhousedao/codegen";
import utils from "../../gen/utils.js";
import {
  z,
  type SetSetNameInput,
  type SetSetParentInput,
  type SetNotionIdInput,
} from "../../gen/schema/index.js";
import { reducer } from "../../gen/reducer.js";
import * as creators from "../../gen/general/creators.js";
import type { AtlasSetDocument } from "../../gen/types.js";

describe("General Operations", () => {
  let document: AtlasSetDocument;

  beforeEach(() => {
    document = utils.createDocument();
  });

  it("should handle setSetName operation", () => {
    const input: SetSetNameInput = generateMock(z.SetSetNameInputSchema());

    const updatedDocument = reducer(document, creators.setSetName(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_SET_NAME");
    expect(updatedDocument.operations.global[0].action.input).toStrictEqual(input);
    expect(updatedDocument.operations.global[0].index).toEqual(0);
  });
  it("should handle setSetParent operation", () => {
    const input: SetSetParentInput = generateMock(z.SetSetParentInputSchema());

    const updatedDocument = reducer(document, creators.setSetParent(input));

    expect(updatedDocument.operations.global).toHaveLength(1);
    expect(updatedDocument.operations.global[0].action.type).toBe("SET_SET_PARENT");
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
});
