/**
 * This is a scaffold file meant for customization:
 * - change it by adding new tests or modifying the existing ones
 */

import utils, {
  initialGlobalState,
  initialLocalState,
} from "../../gen/utils.js";

describe("Atlas Scope Document Model", () => {
  it("should create a new Atlas Scope document", () => {
    const document = utils.createDocument();

    expect(document).toBeDefined();
    expect(document.header.documentType).toBe("sky/atlas-scope");
  });

  it("should create a new Atlas Scope document with a valid initial state", () => {
    const document = utils.createDocument();
    expect(document.state.global).toStrictEqual(initialGlobalState);
    expect(document.state.local).toStrictEqual(initialLocalState);
  });
});
