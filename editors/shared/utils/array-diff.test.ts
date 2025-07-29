import { arrayDiffIndexMapping } from "./array-diff.js";
import type { MappingOperations } from "./array-diff.js";

describe("arrayDiffIndexMapping", () => {
  it("should handle unchanged arrays", () => {
    const original = ["a", "b", "c"];
    const current = ["a", "b", "c"];
    const operations: MappingOperations[] = [];

    const result = arrayDiffIndexMapping(original, current, operations);

    expect(result).toEqual([
      { originalIndex: 0, currentIndex: 0 },
      { originalIndex: 1, currentIndex: 1 },
      { originalIndex: 2, currentIndex: 2 },
    ]);
  });

  it("should handle REPLACE operations", () => {
    const original = ["a", "b", "c"];
    const current = ["a", "d", "c"];
    const operations: MappingOperations[] = [
      { type: "REPLACE", originalValue: "b", newValue: "d" },
    ];

    const result = arrayDiffIndexMapping(original, current, operations);

    expect(result).toEqual([
      { originalIndex: 0, currentIndex: 0 },
      { originalIndex: 1, currentIndex: 1 },
      { originalIndex: 2, currentIndex: 2 },
    ]);
  });

  it("should handle REMOVE operations", () => {
    const original = ["a", "b", "c"];
    const current = ["a", "c"];
    const operations: MappingOperations[] = [{ type: "REMOVE", value: "b" }];

    const result = arrayDiffIndexMapping(original, current, operations);

    expect(result).toEqual([
      { originalIndex: 0, currentIndex: 0 },
      { originalIndex: 1, currentIndex: undefined },
      { originalIndex: 2, currentIndex: 1 },
    ]);
  });

  it("should handle ADD operations", () => {
    const original = ["a", "b"];
    const current = ["a", "b", "c"];
    const operations: MappingOperations[] = [{ type: "ADD", value: "c" }];

    const result = arrayDiffIndexMapping(original, current, operations);

    expect(result).toEqual([
      { originalIndex: 0, currentIndex: 0 },
      { originalIndex: 1, currentIndex: 1 },
      { originalIndex: undefined, currentIndex: 2 },
    ]);
  });

  it("should handle mixed operations", () => {
    const original = ["a", "b", "c"];
    const current = ["a", "d", "e"];
    const operations: MappingOperations[] = [
      { type: "REPLACE", originalValue: "b", newValue: "d" },
      { type: "REMOVE", value: "c" },
      { type: "ADD", value: "e" },
    ];

    const result = arrayDiffIndexMapping(original, current, operations);

    expect(result).toEqual([
      { originalIndex: 0, currentIndex: 0 },
      { originalIndex: 1, currentIndex: 1 },
      { originalIndex: 2, currentIndex: undefined },
      { originalIndex: undefined, currentIndex: 2 },
    ]);
  });

  it("should handle multiple replacements on the same element", () => {
    const original = ["a", "b", "c"];
    const current = ["a", "d", "c"];
    const operations: MappingOperations[] = [
      { type: "REPLACE", originalValue: "b", newValue: "x" },
      { type: "REPLACE", originalValue: "x", newValue: "d" },
    ];

    const result = arrayDiffIndexMapping(original, current, operations);

    expect(result).toEqual([
      { originalIndex: 0, currentIndex: 0 },
      { originalIndex: 1, currentIndex: 1 },
      { originalIndex: 2, currentIndex: 2 },
    ]);
  });

  it("should handle empty arrays", () => {
    const original: string[] = [];
    const current: string[] = [];
    const operations: MappingOperations[] = [];

    const result = arrayDiffIndexMapping(original, current, operations);

    expect(result).toEqual([]);
  });

  it("should handle operations with non-existent values gracefully", () => {
    const original = ["a", "b"];
    const current = ["a", "b"];
    const operations: MappingOperations[] = [
      { type: "REMOVE", value: "non-existent" },
    ];

    const result = arrayDiffIndexMapping(original, current, operations);

    expect(result).toEqual([
      { originalIndex: 0, currentIndex: 0 },
      { originalIndex: 1, currentIndex: 1 },
    ]);
  });

  it("should handle complex replacement chains", () => {
    const original = ["a", "b", "c"];
    const current = ["a", "z", "c"];
    const operations: MappingOperations[] = [
      { type: "REPLACE", originalValue: "b", newValue: "x" },
      { type: "REPLACE", originalValue: "x", newValue: "y" },
      { type: "REPLACE", originalValue: "y", newValue: "z" },
    ];

    const result = arrayDiffIndexMapping(original, current, operations);

    expect(result).toEqual([
      { originalIndex: 0, currentIndex: 0 },
      { originalIndex: 1, currentIndex: 1 },
      { originalIndex: 2, currentIndex: 2 },
    ]);
  });

  it("should handle replacement chains with cycles gracefully", () => {
    const original = ["a", "b", "c"];
    const current = ["a", "b", "c"];
    const operations: MappingOperations[] = [
      { type: "REPLACE", originalValue: "b", newValue: "x" },
      { type: "REPLACE", originalValue: "x", newValue: "b" },
    ];

    const result = arrayDiffIndexMapping(original, current, operations);

    expect(result).toEqual([
      { originalIndex: 0, currentIndex: 0 },
      { originalIndex: 1, currentIndex: 1 },
      { originalIndex: 2, currentIndex: 2 },
    ]);
  });

  it("should handle multiple elements with replacement chains", () => {
    const original = ["a", "b", "c"];
    const current = ["x", "y", "z"];
    const operations: MappingOperations[] = [
      { type: "REPLACE", originalValue: "a", newValue: "temp1" },
      { type: "REPLACE", originalValue: "temp1", newValue: "x" },
      { type: "REPLACE", originalValue: "b", newValue: "temp2" },
      { type: "REPLACE", originalValue: "temp2", newValue: "y" },
      { type: "REPLACE", originalValue: "c", newValue: "temp3" },
      { type: "REPLACE", originalValue: "temp3", newValue: "z" },
    ];

    const result = arrayDiffIndexMapping(original, current, operations);

    expect(result).toEqual([
      { originalIndex: 0, currentIndex: 0 },
      { originalIndex: 1, currentIndex: 1 },
      { originalIndex: 2, currentIndex: 2 },
    ]);
  });
});
