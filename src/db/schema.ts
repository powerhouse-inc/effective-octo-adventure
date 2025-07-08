import type { ColumnType } from "kysely";

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface AtlasFoundationDocs {
  atlas_type: string;
  content: string;
  created_at: Generated<Timestamp>;
  doc_no: string;
  document_id: string;
  drive_id: string;
  global_tags: string;
  master_status: string;
  name: string;
  notion_id: string | null;
  original_context_data: string;
  parent_id: string;
}

export interface AtlasScopeDocs {
  content: string;
  created_at: Generated<Timestamp>;
  doc_no: string;
  document_id: string;
  drive_id: string;
  global_tags: string;
  master_status: string;
  name: string;
  notion_id: string | null;
  original_context_data: string;
}

export interface DB {
  atlas_foundation_docs: AtlasFoundationDocs;
  atlas_scope_docs: AtlasScopeDocs;
}
