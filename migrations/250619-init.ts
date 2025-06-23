import { sql, type Kysely } from "kysely";

export async function up(db: Kysely<any>): Promise<void> {
  // Create table for Atlas scope documents
  await db.schema
    .createTable("atlas_scope_docs")
    .addColumn("doc_no", "varchar(255)", (col) => col.primaryKey())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("master_status", "varchar(50)", (col) => col.notNull())
    .addColumn("global_tags", "text", (col) => col.notNull())
    .addColumn("original_context_data", "text", (col) => col.notNull())
    .addColumn("notion_id", "varchar(255)", (col) => col)
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .execute();

  // Create table for Atlas foundation documents
  await db.schema
    .createTable("atlas_foundation_docs")
    .addColumn("doc_no", "varchar(255)", (col) => col.primaryKey())
    .addColumn("parent_id", "varchar(255)", (col) => col.notNull())
    .addColumn("name", "varchar(255)", (col) => col.notNull())
    .addColumn("content", "text", (col) => col.notNull())
    .addColumn("atlas_type", "varchar(100)", (col) => col.notNull())
    .addColumn("master_status", "varchar(50)", (col) => col.notNull())
    .addColumn("global_tags", "text", (col) => col.notNull())
    .addColumn("original_context_data", "text", (col) => col.notNull())
    .addColumn("notion_id", "varchar(255)", (col) => col)
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addForeignKeyConstraint(
      "atlas_foundation_docs_parent_id_fkey",
      ["parent_id"],
      "atlas_scope_docs",
      ["doc_no"],
    )
    .execute();

  // Create index for efficient search on content
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
