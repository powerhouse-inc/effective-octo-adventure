export interface Database {
  atlas_scope_docs: {
    doc_no: string | null;
    name: string;
    content: string;
    master_status: string;
    global_tags: string;
    original_context_data: string;
    notion_id: string | null;
    created_at: Date;
  };
  atlas_foundation_docs: {
    doc_no: string | null;
    parent_id: string;
    name: string;
    content: string;
    atlas_type: string;
    master_status: string;
    global_tags: string;
    original_context_data: string;
    notion_id: string | null;
    created_at: Date;
  };
}
