/**
 * Adapter interface for reactor operations.
 * Allows switching between remote HTTP reactor and in-memory/mock reactors.
 */

import { type DriveNodes } from "../common/ReactorClient.js";

/**
 * Base interface for reactor adapters.
 * Implementations can target HTTP endpoints, in-memory stores, mocks, etc.
 */
export interface ReactorAdapter {
  /**
   * Execute a GraphQL query against the reactor.
   * @param endpoint - The endpoint URL or path
   * @param query - GraphQL query string
   * @param variables - Query variables
   * @returns Query result
   */
  executeQuery<T>(
    endpoint: string,
    query: string,
    variables?: object
  ): Promise<T>;

  /**
   * Execute a GraphQL mutation against the reactor.
   * @param endpoint - The endpoint URL or path
   * @param mutationName - Name of the mutation (e.g., "AtlasScope_createDocument")
   * @param variables - Mutation variables
   * @returns Mutation result
   */
  executeMutation<T>(
    endpoint: string,
    mutationName: string,
    variables: object
  ): Promise<T>;

  /**
   * Get list of available drive IDs.
   */
  getDriveIds(): Promise<string[]>;

  /**
   * Get drive structure (folders and files).
   */
  getDocumentDriveNodes(driveId: string): Promise<DriveNodes>;

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
