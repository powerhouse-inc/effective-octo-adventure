import { sql } from "kysely";
import { type IRelationalDb } from "document-drive/processors/types";

export async function up(db: IRelationalDb<any>): Promise<void> {
  // Create table for Atlas scope documents
  await db.schema
    .createTable("atlas_scope_docs")
    .addColumn("drive_id", "varchar(255)")
    .addColumn("document_id", "varchar(255)")
    .addColumn("doc_no", "varchar(255)")
    .addColumn("name", "varchar(255)")
    .addColumn("content", "text")
    .addColumn("master_status", "varchar(50)")
    .addColumn("global_tags", "text")
    .addColumn("original_context_data", "text")
    .addColumn("notion_id", "varchar(255)")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addPrimaryKeyConstraint("atlas_scope_docs_pkey", [
      "drive_id",
      "document_id",
    ])
    .ifNotExists()
    .execute();

  // Create table for Atlas foundation documents
  await db.schema
    .createTable("atlas_foundation_docs")
    .addColumn("drive_id", "varchar(255)")
    .addColumn("document_id", "varchar(255)")
    .addColumn("doc_no", "varchar(255)")
    .addColumn("parent_id", "varchar(255)")
    .addColumn("name", "varchar(255)")
    .addColumn("content", "text")
    .addColumn("atlas_type", "varchar(100)")
    .addColumn("master_status", "varchar(50)")
    .addColumn("global_tags", "text")
    .addColumn("original_context_data", "text")
    .addColumn("notion_id", "varchar(255)")
    .addColumn("created_at", "timestamp", (col) =>
      col.defaultTo(sql`CURRENT_TIMESTAMP`).notNull(),
    )
    .addPrimaryKeyConstraint("atlas_foundation_docs_pkey", [
      "drive_id",
      "document_id",
    ])
    .ifNotExists()
    .execute();
}

export async function down(db: IRelationalDb<any>): Promise<void> {
  await db.schema.dropIndex("atlas_foundation_docs_content_idx").execute();
  await db.schema.dropTable("atlas_foundation_docs").execute();
  await db.schema.dropTable("atlas_scope_docs").execute();
}
