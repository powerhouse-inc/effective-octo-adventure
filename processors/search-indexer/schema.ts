import type { ColumnType } from "document-drive/processors/operational-processor";

export type Generated<T> =
  T extends ColumnType<infer S, infer I, infer U>
    ? ColumnType<S, I | undefined, U>
    : ColumnType<T, T | undefined, T>;

export type Timestamp = ColumnType<Date, Date | string, Date | string>;

export interface AtlasFoundationDocs {
  atlas_type: string | null;
  content: string | null;
  created_at: Generated<Timestamp>;
  doc_no: string | null;
  document_id: string;
  drive_id: string;
  global_tags: string | null;
  master_status: string | null;
  name: string | null;
  notion_id: string | null;
  original_context_data: string | null;
  parent_id: string | null;
}

export interface AtlasScopeDocs {
  content: string | null;
  created_at: Generated<Timestamp>;
  doc_no: string | null;
  document_id: string;
  drive_id: string;
  global_tags: string | null;
  master_status: string | null;
  name: string | null;
  notion_id: string | null;
  original_context_data: string | null;
}

export interface DB {
  atlas_foundation_docs: AtlasFoundationDocs;
  atlas_scope_docs: AtlasScopeDocs;
}
