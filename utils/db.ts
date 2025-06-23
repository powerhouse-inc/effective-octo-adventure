import { Kysely } from "kysely";
import type { Knex } from "knex";
import { KyselyKnexDialect, PGColdDialect } from "kysely-knex";
import { type Db } from "@powerhousedao/reactor-api";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { type Database } from "./generated/database-types.js";

/**
 * Dynamically loads and runs all migration files from the migrations directory
 */
async function runAllMigrations(db: Kysely<any>): Promise<void> {
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const migrationsDir = path.join(__dirname, "../migrations");

  try {
    const migrationFiles = fs
      .readdirSync(migrationsDir)
      .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
      .sort(); // Ensure migrations run in order

    for (const file of migrationFiles) {
      const migrationPath = path.join(migrationsDir, file);
      const migration = (await import(migrationPath)) as {
        up?: (db: Kysely<any>) => Promise<void>;
      };

      if (typeof migration.up === "function") {
        console.log(`Running migration: ${file}`);
        await migration.up(db);
      }
    }
  } catch (error) {
    console.error("Error running migrations:", error);
    throw error;
  }
}

/**
 * Creates a Kysely database instance with the given database connection
 * and runs all migrations before returning the database
 */
export const getDb = async (db: Db): Promise<Kysely<Database>> => {
  const kysely = new Kysely<Database>({
    dialect: new KyselyKnexDialect({
      knex: db,
      kyselySubDialect: new PGColdDialect(),
    }),
  });

  // Run all migrations before returning the database
  await runAllMigrations(kysely);

  return kysely;
};

/**
 * Creates a Kysely database instance with the given database connection
 * without running migrations (useful for testing or when migrations are handled elsewhere)
 */
export const getDbWithoutMigrations = (db: Db): Kysely<Database> => {
  return new Kysely<Database>({
    dialect: new KyselyKnexDialect({
      knex: db,
      kyselySubDialect: new PGColdDialect(),
    }),
  });
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
export const createDatabaseWithInferredTypes = async (db: Db) => {
  const kysely = await getDb(db);
  return {
    db: kysely,
    type: kysely,
  };
};
