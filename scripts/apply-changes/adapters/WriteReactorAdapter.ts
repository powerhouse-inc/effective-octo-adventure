/**
 * Write reactor adapter that records all operations to disk for later replay.
 * Does not actually execute operations against a real reactor.
 */

import { type BaseAction } from "document-model";
import {
  type ReactorAdapter,
  type ReactorOperationsSummary,
} from "./ReactorAdapter.js";
import { type DriveNodes } from "../common/ReactorClient.js";
import { promises as fs } from "fs";

/**
 * Log entry for a recorded operation.
 */
export interface OperationRecord {
  type: "query" | "mutation";
  name: string;
  timestamp: Date;
  args: any;
}

export class WriteReactorAdapter implements ReactorAdapter {
  private filePath: string;
  private operations: OperationRecord[] = [];

  constructor(filePath: string) {
    this.filePath = filePath;
  }

  async addAction(
    driveId: string,
    docId: string,
    documentType: string,
    action: BaseAction
  ): Promise<any> {
    this.operations.push({
      type: "mutation",
      name: "addAction",
      timestamp: new Date(),
      args: {
        driveId,
        docId,
        documentType,
        action,
      },
    });

    return { success: true };
  }

  async addDriveAction(
    driveId: string,
    driveAction: BaseAction
  ): Promise<any> {
    this.operations.push({
      type: "mutation",
      name: "addDriveAction",
      timestamp: new Date(),
      args: {
        driveId,
        driveAction,
      },
    });

    return { success: true };
  }

  async getDriveIds(): Promise<string[]> {
    this.operations.push({
      type: "query",
      name: "getDriveIds",
      timestamp: new Date(),
      args: {},
    });

    return [];
  }

  async getDocumentDriveNodes(driveId: string): Promise<DriveNodes> {
    this.operations.push({
      type: "query",
      name: "getDocumentDriveNodes",
      timestamp: new Date(),
      args: { driveId },
    });

    return {
      id: driveId,
      slug: driveId,
      name: "Mock",
      icon: "Folder",
      nodes: [],
    };
  }

  async getDocument(docId: string, schema: string): Promise<any> {
    this.operations.push({
      type: "query",
      name: "getDocument",
      timestamp: new Date(),
      args: { docId, schema },
    });

    return {
      document: {
        id: docId,
        state: {},
      },
    };
  }

  async createDrive(args: {
    id: string;
    name?: string;
    slug?: string;
    icon?: string;
    preferredEditor?: string;
  }): Promise<any> {
    this.operations.push({
      type: "mutation",
      name: "createDrive",
      timestamp: new Date(),
      args,
    });

    return {
      id: args.id,
      name: args.name,
      slug: args.slug,
      icon: args.icon,
    };
  }

  getSummary(): ReactorOperationsSummary {
    const queries = this.operations.filter((op) => op.type === "query");
    const mutations = this.operations.filter((op) => op.type === "mutation");
    const creates = mutations.filter((op) => op.name.includes("createDocument"));
    const updates = mutations.filter(
      (op) => !op.name.includes("createDocument") && !op.name.includes("createDrive")
    );
    const drives = mutations.filter((op) => op.name.includes("createDrive"));

    return {
      queriesExecuted: queries.length,
      mutationsExecuted: mutations.length,
      drivesCreated: drives.length,
      documentsCreated: creates.length,
      documentsUpdated: updates.length,
      operations: this.operations.map((op) => ({
        type: op.type,
        name: op.name,
        timestamp: op.timestamp,
        args: op.args,
      })),
    };
  }

  /**
   * Write all recorded operations to the file as JSON.
   */
  async flush(): Promise<void> {
    await fs.writeFile(
      this.filePath,
      JSON.stringify(this.operations, null, 2),
      "utf-8"
    );
  }

  /**
   * Print a formatted summary of all operations.
   */
  printSummary(): void {
    const summary = this.getSummary();

    console.log("\n" + "=".repeat(60));
    console.log("Write Reactor Operations Summary");
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
        mutationsByType[op.name] = (mutationsByType[op.name] || 0) + 1;
      });

    if (Object.keys(mutationsByType).length > 0) {
      console.log("\nMutations by Type:");
      Object.entries(mutationsByType)
        .sort(([, a], [, b]) => b - a)
        .forEach(([type, count]) => {
          console.log(`  ${type}: ${count}`);
        });
    }

    console.log("\n" + "=".repeat(60));
    console.log(`Operations will be written to: ${this.filePath}`);
    console.log("=".repeat(60) + "\n");
  }
}
