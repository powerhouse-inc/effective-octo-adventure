/**
 * Adapter interface for reactor operations.
 * Allows switching between remote HTTP reactor and in-memory/mock reactors.
 */

import { type BaseAction } from "document-model";
import { type DriveNodes } from "../common/ReactorClient.js";

/**
 * Base interface for reactor adapters.
 * Implementations can target HTTP endpoints, in-memory stores, mocks, etc.
 */
export interface ReactorAdapter {
  /**
   * Add a document-model action to a document.
   * @param driveId - The drive ID
   * @param docId - The document ID
   * @param documentType - The document type (e.g., "sky/atlas-scope")
   * @param action - The action object from document-model
   * @returns Action result
   */
  addAction(
    driveId: string,
    docId: string,
    documentType: string,
    action: BaseAction
  ): Promise<any>;

  /**
   * Add a drive-level action (e.g., addFile).
   * @param driveId - The drive ID
   * @param driveAction - The drive action object
   * @returns Action result
   */
  addDriveAction(
    driveId: string,
    driveAction: BaseAction
  ): Promise<any>;

  /**
   * Get list of available drive IDs.
   */
  getDriveIds(): Promise<string[]>;

  /**
   * Get drive structure (folders and files).
   */
  getDocumentDriveNodes(driveId: string): Promise<DriveNodes>;

  /**
   * Get a document with its state.
   * @param docId - The document ID
   * @param schema - The GraphQL schema fragment for document fields
   * @returns Document data with state
   */
  getDocument(docId: string, schema: string): Promise<any>;

  /**
   * Create a new drive.
   */
  createDrive(args: {
    id: string;
    name?: string;
    slug?: string;
    icon?: string;
    preferredEditor?: string;
  }): Promise<any>;

  /**
   * Get a summary of operations performed (for logging/debugging).
   */
  getSummary(): ReactorOperationsSummary;
}

/**
 * Summary of operations performed by the adapter.
 */
export interface ReactorOperationsSummary {
  queriesExecuted: number;
  mutationsExecuted: number;
  drivesCreated: number;
  documentsCreated: number;
  documentsUpdated: number;
  operations: OperationLog[];
}

/**
 * Log entry for a reactor operation.
 */
export interface OperationLog {
  type: "query" | "mutation";
  name: string;
  timestamp: Date;
  args?: any;
  result?: any;
  error?: string;
}
