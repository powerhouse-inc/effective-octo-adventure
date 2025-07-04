import { type Db } from "@powerhousedao/reactor-api";
import { type IProcessor } from "document-drive/processors/types";

import { type InternalTransmitterUpdate } from "document-drive/server/listener/transmitter/internal";
import {
  type AtlasFoundationState,
  type AtlasFoundationDocument,
} from "document-models/atlas-foundation/index.js";
import {
  type AtlasScopeState,
  type AtlasScopeDocument,
} from "document-models/atlas-scope/index.js";
import { type Kysely } from "kysely";
import { sql } from "kysely";
import { getDb } from "../../utils/db.js";
import { type Database } from "../../utils/generated/database-types.js";

type TDocument = AtlasScopeDocument | AtlasFoundationDocument;

export class SearchIndexerProcessor implements IProcessor {
  private kysely: Promise<Kysely<Database>>;

  constructor(private readonly operationalStore: Db) {
    this.kysely = getDb(this.operationalStore);
  }

  async onStrands(
    strands: InternalTransmitterUpdate<TDocument>[],
  ): Promise<void> {
    for (const strand of strands) {
      const { state, documentId, driveId } = strand;

      // its always global scope due to filter
      await this.indexState(
        documentId,
        driveId,
        state as AtlasScopeState | AtlasFoundationState,
      );
    }
  }

  async onDisconnect() {}

  private async indexState(
    documentId: string,
    driveId: string,
    state: AtlasScopeState | AtlasFoundationState,
  ) {
    if ((state as AtlasFoundationState).parent) {
      // its a foundation doc because it has a parent
      await this.indexAtlasFoundation(state as AtlasFoundationState);
    } else {
      await this.indexAtlasScope(documentId, state as AtlasScopeState);
    }
  }

  private async indexAtlasFoundation(state: AtlasFoundationState) {
    const {
      docNo,
      parent,
      name,
      content,
      atlasType,
      masterStatus,
      globalTags,
      originalContextData,
      notionId,
    } = state;

    const db = await this.kysely;

    await db
      .insertInto("atlas_foundation_docs")
      .columns([
        "doc_no",
        "parent_id",
        "name",
        "content",
        "atlas_type",
        "master_status",
        "global_tags",
        "original_context_data",
        "notion_id",
        "created_at",
      ])
      .values({
        doc_no: docNo || "",
        parent_id: parent!.id,
        name: name || "",
        content: content || "",
        atlas_type: atlasType?.toString() || "",
        master_status: masterStatus?.toString() || "",
        global_tags: JSON.stringify(globalTags || []),
        original_context_data: JSON.stringify(originalContextData || []),
        notion_id: notionId || null,
        created_at: sql`CURRENT_TIMESTAMP`,
      })
      .onConflict((oc) =>
        oc.column("doc_no").doUpdateSet({
          parent_id: sql`EXCLUDED.parent_id`,
          name: sql`EXCLUDED.name`,
          content: sql`EXCLUDED.content`,
          atlas_type: sql`EXCLUDED.atlas_type`,
          master_status: sql`EXCLUDED.master_status`,
          global_tags: sql`EXCLUDED.global_tags`,
          original_context_data: sql`EXCLUDED.original_context_data`,
          notion_id: sql`EXCLUDED.notion_id`,
        }),
      )
      .execute();
  }

  private async indexAtlasScope(documentId: string, state: AtlasScopeState) {
    const {
      docNo,
      name,
      content,
      masterStatus,
      globalTags,
      originalContextData,
      notionId,
    } = state;

    const db = await this.kysely;

    await db
      .insertInto("atlas_scope_docs")
      .columns([
        "doc_no",
        "name",
        "content",
        "master_status",
        "global_tags",
        "original_context_data",
        "notion_id",
        "created_at",
      ])
      .values({
        doc_no: docNo || "",
        name: name || "",
        content: content || "",
        master_status: masterStatus?.toString() || "",
        global_tags: JSON.stringify(globalTags || []),
        original_context_data: JSON.stringify(originalContextData || []),
        notion_id: notionId || null,
        created_at: sql`CURRENT_TIMESTAMP`,
      })
      .onConflict((oc) =>
        oc.column("doc_no").doUpdateSet({
          name: sql`EXCLUDED.name`,
          content: sql`EXCLUDED.content`,
          master_status: sql`EXCLUDED.master_status`,
          global_tags: sql`EXCLUDED.global_tags`,
          original_context_data: sql`EXCLUDED.original_context_data`,
          notion_id: sql`EXCLUDED.notion_id`,
        }),
      )
      .execute();
  }
}
