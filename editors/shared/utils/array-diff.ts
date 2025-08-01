import { getRevisionFromDate } from "@powerhousedao/common";
import type { AtlasDocument } from "./utils.js";
import { getBaseDocumentTimestamp } from "./utils.js";
import { type Operation } from "document-model";

export interface MatchIndex {
  originalIndex?: number;
  currentIndex?: number;
}

export type MappingOperations =
  | {
      type: "ADD" | "REMOVE";
      value: string;
    }
  | {
      type: "REPLACE";
      originalValue: string;
      newValue: string;
    };

/**
 * Creates a mapping between indexes of original and current arrays based on applied operations.
 *
 * This function tracks how elements from the original array map to elements in the current array
 * after applying a series of mutations (ADD, REMOVE, REPLACE operations).
 *
 * @param original - The original array before any mutations
 * @param operations - Array of operations that were applied to transform original to current
 * @returns Array of MatchIndex objects representing the mapping between original and current indexes
 *
 * @example
 * ```typescript
 * const original = ["a", "b", "c"];
 * const operations = [
 *   { type: "REPLACE", originalValue: "b", newValue: "d" }
 * ];
 *
 * const mapping = arrayDiffIndexMapping(original, operations);
 * // Result: [
 * //   { originalIndex: 0, currentIndex: 0 }, // "a" unchanged
 * //   { originalIndex: 1, currentIndex: 1 }, // "b" replaced with "d"
 * //   { originalIndex: 2, currentIndex: 2 }  // "c" unchanged
 * // ]
 * ```
 */
export function arrayDiffIndexMapping(
  original: string[],
  operations: MappingOperations[],
): MatchIndex[] {
  const result: MatchIndex[] = [];

  original.forEach((_, index) => {
    // we start assuming that the original and current array are the same
    result.push({ originalIndex: index, currentIndex: index });
  });

  const futureCurrent = [...original];

  operations.forEach((operation) => {
    switch (operation.type) {
      case "ADD":
        if (futureCurrent.includes(operation.value)) {
          break; // it is an "invalid" operation, we can safely ignore it
        }
        futureCurrent.push(operation.value);
        result.push({
          originalIndex: undefined,
          currentIndex: futureCurrent.length - 1,
        });
        break;
      case "REMOVE": {
        const removedIndex = futureCurrent.indexOf(operation.value);
        if (removedIndex === -1) {
          break; // the item didn't exist
        }
        const indexInResult = result.findIndex(
          (item) => item.currentIndex === removedIndex,
        );
        futureCurrent.splice(removedIndex, 1); // remove the item
        result[indexInResult].currentIndex = undefined;
        for (let i = indexInResult + 1; i < result.length; i++) {
          // as the item was removed, we need to decrement the index of all items after it
          if (result[i].currentIndex !== undefined) {
            result[i].currentIndex = result[i].currentIndex! - 1;
          }
        }
        break;
      }
      case "REPLACE": {
        const originalIndex = futureCurrent.indexOf(operation.originalValue);
        if (originalIndex === -1) {
          break; // the item didn't exist
        }
        futureCurrent[originalIndex] = operation.newValue;
        // value replacement doesn't change the index of the item
        break;
      }
    }
  });

  return result;
}

/**
 * Get all operations of a document from the base document to the most recent revision.
 * Similar to the technique used in useBaseDocumentCached hook.
 *
 * @param document - The current document
 * @param filterType - Optional array of operation types to filter by
 * @returns Array of operations from base to current document
 */
export function getOperations<T extends AtlasDocument>(
  document: T,
  filterType?: T["operations"]["global"][number]["type"][],
): Operation[] {
  try {
    const baseDocumentTimestamp = getBaseDocumentTimestamp(document);
    const endDate = new Date(baseDocumentTimestamp);
    endDate.setUTCSeconds(endDate.getUTCSeconds() + 30);

    const operations = document.operations.global.sort(
      (a, b) => b.index - a.index,
    );

    // Get the base revision (same as in useBaseDocumentCached)
    const baseRevision = getRevisionFromDate(
      new Date(baseDocumentTimestamp),
      endDate,
      operations,
    );

    const currentRevision = document.header.revision.global;
    const relevantOperations: Operation[] = [];

    // Get all operations from base revision to current revision
    for (const operation of document.operations.global) {
      if (
        operation.index >= baseRevision &&
        operation.index <= currentRevision
      ) {
        // Filter by operation type if filterType is provided
        if (filterType && filterType.length > 0) {
          if (filterType.includes(operation.type)) {
            relevantOperations.push(operation);
          }
        } else {
          relevantOperations.push(operation);
        }
      }
    }

    // Sort operations by index to maintain chronological order
    return relevantOperations.sort((a, b) => a.index - b.index);
  } catch (error) {
    console.error("Error getting operations: ", error);
    return [];
  }
}

/**
 * Convert context data operations to mapping operations.
 *
 * @param operations - Array of context data operations
 * @returns Array of mapping operations
 */
export function contextDataToMappingOperations(
  operations: Operation[],
): MappingOperations[] {
  return operations
    .map((operation) => {
      if (operation.type === "ADD_CONTEXT_DATA") {
        return {
          type: "ADD",
          value: (operation.input as { id: string }).id,
        };
      } else if (operation.type === "REMOVE_CONTEXT_DATA") {
        return {
          type: "REMOVE",
          value: (operation.input as { id: string }).id,
        };
      } else if (operation.type === "REPLACE_CONTEXT_DATA") {
        return {
          type: "REPLACE",
          originalValue: (operation.input as { prevId: string; id: string })
            .prevId,
          newValue: (operation.input as { prevId: string; id: string }).id,
        };
      }
    })
    .filter((operation) => operation !== undefined) as MappingOperations[];
}
