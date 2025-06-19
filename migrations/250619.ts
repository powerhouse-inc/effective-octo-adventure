import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Create table for Atlas scope documents
  await db.schema
    .createTable("atlas_scope_docs")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  // Create table for Atlas foundation documents
  await db.schema
    .createTable("atlas_foundation_docs")
    .addColumn("id", "serial", (col) => col.primaryKey())
    .addColumn("parent_id", "integer", (col) =>
      col.references("atlas_scope_docs.id").onDelete("cascade").notNull(),
    )
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`now()`).notNull(),
    )
    .execute();

  // Optional: index for efficient search on content
  await db.schema
    .createIndex("atlas_foundation_docs_content_idx")
    .on("atlas_foundation_docs")
    .column("content")
    .execute();
}

export async function down(db: Kysely<any>): Promise<void> {
  await db.schema.dropIndex("atlas_foundation_docs_content_idx").execute();
  await db.schema.dropTable("atlas_foundation_docs").execute();
  await db.schema.dropTable("atlas_scope_docs").execute();
}
