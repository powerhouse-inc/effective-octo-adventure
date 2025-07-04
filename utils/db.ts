import { Kysely } from "kysely";
import type { Knex } from "knex";
import { KyselyKnexDialect, PGColdDialect } from "kysely-knex";
import { type Db } from "@powerhousedao/reactor-api";
import { Migrator } from "kysely";
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { type Database } from "./generated/database-types.js";

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

  // Set up migrator
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const migrationsDir = path.join(__dirname, "../migrations");

  const migrator = new Migrator({
    db: kysely,
    provider: {
      async getMigrations() {
        const migrationFiles = fs
          .readdirSync(migrationsDir)
          .filter((file) => file.endsWith(".ts") || file.endsWith(".js"))
          .sort();

        const migrations: Record<
          string,
          {
            up: (db: Kysely<any>) => Promise<void>;
            down?: (db: Kysely<any>) => Promise<void>;
          }
        > = {};
        for (const file of migrationFiles) {
          const name = file.replace(/\.(ts|js)$/, "");
          const migrationPath = path.join(migrationsDir, file);
          const migrationModule = (await import(migrationPath)) as {
            up: (db: Kysely<any>) => Promise<void>;
            down?: (db: Kysely<any>) => Promise<void>;
          };
          migrations[name] = migrationModule;
        }
        return migrations;
      },
    },
  });

  // Run all pending migrations
  const { error, results } = await migrator.migrateToLatest();

  if (error) {
    console.error("Migration error:", error);
    throw new Error(error as string);
  }

  if (results && results.length > 0) {
    console.log(
      "Applied migrations:",
      results.map((r) => r.migrationName),
    );
  }

  return kysely;
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
