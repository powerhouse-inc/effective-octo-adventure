/**
 * Mock reactor adapter that logs operations without actually storing data.
 * Useful for testing import flows and understanding what operations would be performed.
 */

import { type BaseAction } from "document-model";
import {
  type ReactorAdapter,
  type ReactorOperationsSummary,
  type OperationLog,
  type DriveNodes,
  type DriveResultNode,
} from "./ReactorAdapter.js";
import { randomUUID } from "crypto";

export class MockReactorAdapter implements ReactorAdapter {
  private operations: OperationLog[] = [];
  private drives: Map<string, { id: string; name: string; icon?: string; nodes: DriveResultNode[] }> = new Map();
  private documents: Map<string, any> = new Map();
  private verbose: boolean;

  constructor(options?: { verbose?: boolean }) {
    this.verbose = options?.verbose ?? true;
  }

  async addAction(
    driveId: string,
    docId: string,
    documentType: string,
    action: BaseAction
  ): Promise<any> {
    const operation: OperationLog = {
      type: "mutation",
      name: `addAction:${action.type}`,
      timestamp: new Date(),
      args: {
        driveId,
        docId,
        documentType,
        actionType: action.type,
        actionInput: action.input,
      },
    };

    if (this.verbose) {
      console.log(`[MOCK ACTION] ${documentType} / ${action.type}`, {
        driveId,
        docId,
        input: action.input,
      });
    }

    // Simulate revision increment
    const result = { success: true, revision: 2 };

    operation.result = result;
    this.operations.push(operation);

    return result;
  }

  async addDriveAction(
    driveId: string,
    driveAction: BaseAction
  ): Promise<any> {
    const operation: OperationLog = {
      type: "mutation",
      name: `addDriveAction:${driveAction.type}`,
      timestamp: new Date(),
      args: {
        driveId,
        actionType: driveAction.type,
        actionInput: driveAction.input,
      },
    };

    if (this.verbose) {
      console.log(`[MOCK DRIVE ACTION] ${driveAction.type}`, {
        driveId,
        input: driveAction.input,
      });
    }

    // Handle specific drive actions
    let result: any = { success: true };

    if (driveAction.type === "ADD_FILE") {
      const input = driveAction.input as any;
      const docId = input.id || `phd:${randomUUID()}`;
      result = { id: docId };

      if (this.verbose) {
        console.log(`  → Added file to drive: ${docId}`);
      }
    }

    operation.result = result;
    this.operations.push(operation);

    return result;
  }

  async getDriveIds(): Promise<string[]> {
    const operation: OperationLog = {
      type: "query",
      name: "getDriveIds",
      timestamp: new Date(),
      args: {},
    };

    if (this.verbose) {
      console.log(`[MOCK QUERY] getDriveIds`);
    }

    const result = Array.from(this.drives.keys());

    operation.result = result;
    this.operations.push(operation);

    return result;
  }

  async getDocumentDriveNodes(driveId: string): Promise<DriveNodes> {
    const operation: OperationLog = {
      type: "query",
      name: "getDocumentDriveNodes",
      timestamp: new Date(),
      args: { driveId },
    };

    if (this.verbose) {
      console.log(`[MOCK QUERY] getDocumentDriveNodes`, { driveId });
    }

    const drive = this.drives.get(driveId);
    const result: DriveNodes = {
      id: driveId,
      slug: driveId,
      icon: drive?.icon || "Folder",
      name: drive?.name || driveId,
      nodes: drive?.nodes || [],
    };

    operation.result = result;
    this.operations.push(operation);

    return result;
  }

  async getDocument(docId: string, schema: string): Promise<any> {
    const operation: OperationLog = {
      type: "query",
      name: "getDocument",
      timestamp: new Date(),
      args: { docId, schema },
    };

    if (this.verbose) {
      console.log(`[MOCK QUERY] getDocument`, { docId, schema });
    }

    const doc = this.documents.get(docId);
    const result = {
      document: doc || {
        id: docId,
        name: "Mock Document",
        revision: 1,
        state: {},
      },
    };

    operation.result = result;
    this.operations.push(operation);

    return result;
  }

  async createDrive(args: {
    id: string;
    name?: string;
    slug?: string;
    icon?: string;
    preferredEditor?: string;
  }): Promise<any> {
    const operation: OperationLog = {
      type: "mutation",
      name: "addDrive",
      timestamp: new Date(),
      args,
    };

    if (this.verbose) {
      console.log(`[MOCK MUTATION] addDrive`, args);
    }

    this.drives.set(args.id, {
      id: args.id,
      name: args.name || args.id,
      icon: args.icon,
      nodes: [],
    });

    const result = {
      id: args.id,
      name: args.name,
      slug: args.slug,
      icon: args.icon,
    };

    if (this.verbose) {
      console.log(`  → Created drive: ${args.id}`);
    }

    operation.result = result;
    this.operations.push(operation);

    return result;
  }

  getSummary(): ReactorOperationsSummary {
    const queries = this.operations.filter((op) => op.type === "query");
    const mutations = this.operations.filter((op) => op.type === "mutation");
    const creates = mutations.filter((op) => op.name.includes("createDocument"));
    const updates = mutations.filter(
      (op) => !op.name.includes("createDocument") && !op.name.includes("addDrive")
    );
    const drives = mutations.filter((op) => op.name.includes("addDrive"));

    return {
      queriesExecuted: queries.length,
      mutationsExecuted: mutations.length,
      drivesCreated: drives.length,
      documentsCreated: creates.length,
      documentsUpdated: updates.length,
      operations: this.operations,
    };
  }

  /**
   * Print a formatted summary of all operations.
   */
  printSummary(): void {
    const summary = this.getSummary();

    console.log("\n" + "=".repeat(60));
    console.log("Mock Reactor Operations Summary");
    console.log("=".repeat(60));
    console.log(`Total Operations: ${summary.operations.length}`);
    console.log(`  - Queries: ${summary.queriesExecuted}`);
    console.log(`  - Mutations: ${summary.mutationsExecuted}`);
    console.log(`Drives Created: ${summary.drivesCreated}`);
    console.log(`Documents Created: ${summary.documentsCreated}`);
    console.log(`Documents Updated: ${summary.documentsUpdated}`);
    console.log("=".repeat(60));

    // Group mutations by type
    const mutationsByType: { [key: string]: number } = {};
    summary.operations
      .filter((op) => op.type === "mutation")
      .forEach((op) => {
        const base = op.name.split("_")[0];
        mutationsByType[base] = (mutationsByType[base] || 0) + 1;
      });

    if (Object.keys(mutationsByType).length > 0) {
      console.log("\nMutations by Document Type:");
      Object.entries(mutationsByType)
        .sort(([, a], [, b]) => b - a)
        .forEach(([type, count]) => {
          console.log(`  ${type}: ${count}`);
        });
    }

    console.log("\n" + "=".repeat(60));
  }

}
