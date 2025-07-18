import { type Kysely } from "kysely";
import type { Knex } from "knex";
import { KyselyKnexDialect, PGColdDialect } from "kysely-knex";
import { type IRelationalDb } from "document-drive/processors/types";
import { Migrator } from "kysely";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { type Database } from "./generated/database-types.js";

/**
 * Creates a Kysely database instance with the given database connection
 * and runs all migrations before returning the database
 */
export const getDb = async (
  db: IRelationalDb<Database>,
): Promise<Kysely<Database>> => {
  return db;
};

/**
 * Utility function to get the inferred database type from an actual database instance
 * This can be used to generate proper TypeScript types
 */
export type InferDatabaseType<T> = T extends Kysely<infer U> ? U : never;

/**
 * Creates a database instance and returns both the instance and its inferred type
 * Useful for development and type generation
 */
export const createDatabaseWithInferredTypes = async (
  db: IRelationalDb<Database>,
) => {
  const kysely = await getDb(db);
  return {
    db: kysely,
    type: kysely,
  };
};
