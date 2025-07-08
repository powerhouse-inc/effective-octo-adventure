import {
  OperationalProcessor,
  type OperationalProcessorFilter,
  sql,
} from "document-drive/processors/operational-processor";
import { type InternalTransmitterUpdate } from "document-drive/server/listener/transmitter/internal";
import {
  type AtlasFoundationDocument,
  type AtlasFoundationState,
} from "document-models/atlas-foundation/index.js";
import {
  type AtlasScopeDocument,
  type AtlasScopeState,
} from "document-models/atlas-scope/index.js";
import { up } from "./migrations.js";
import { type DB } from "./schema.js";
type TDocument = AtlasScopeDocument | AtlasFoundationDocument;

export class SearchIndexerProcessor extends OperationalProcessor<DB> {
  get filter(): OperationalProcessorFilter {
    return {
      branch: ["main"],
      documentId: ["*"],
      documentType: ["sky/atlas-scope", "sky/atlas-foundation"],
      scope: ["global"],
    };
  }

  async initAndUpgrade(): Promise<void> {
    await up(this.operationalStore);
  }

  async onStrands(
    strands: InternalTransmitterUpdate<TDocument>[],
  ): Promise<void> {
    console.log("onStrands", strands);
    for (const strand of strands) {
      const { state, documentId, driveId, documentType } = strand;

      // its always global scope due to filter
      await this.indexState(
        documentId,
        driveId,
        documentType,
        state as AtlasScopeState | AtlasFoundationState,
      );
    }
  }

  async onDisconnect() {}

  private async indexState(
    documentId: string,
    driveId: string,
    documentType: string,
    state: AtlasScopeState | AtlasFoundationState,
  ) {
    if (documentType === "sky/atlas-foundation") {
      // its a foundation doc because it has a parent

      await this.indexAtlasFoundation(
        driveId,
        documentId,
        state as AtlasFoundationState,
      );
    } else {
      await this.indexAtlasScope(driveId, documentId, state as AtlasScopeState);
    }
  }

  private async indexAtlasFoundation(
    driveId: string,
    documentId: string,
    state: AtlasFoundationState,
  ) {
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

    const parentId = parent?.id || "";
    console.log("parentId", parentId);

    await this.operationalStore
      .insertInto("atlas_foundation_docs")
      .columns([
        "drive_id",
        "document_id",
        "doc_no",
        "parent_id",
        "name",
        "content",
        "atlas_type",
        "master_status",
        "global_tags",
        "original_context_data",
        "notion_id",
      ])
      .values({
        drive_id: driveId,
        document_id: documentId,
        doc_no: docNo || "",
        parent_id: parentId,
        name: name || "",
        content: content || "",
        atlas_type: atlasType || "",
        master_status: masterStatus || "",
        global_tags: JSON.stringify(globalTags || []),
        original_context_data: JSON.stringify(originalContextData || []),
        notion_id: notionId || "",
      })
      .onConflict((oc) =>
        oc.constraint("atlas_foundation_docs_pkey").doUpdateSet({
          drive_id: sql`EXCLUDED.drive_id`,
          document_id: sql`EXCLUDED.document_id`,
          parent_id: sql`EXCLUDED.parent_id`,
          doc_no: sql`EXCLUDED.doc_no`,
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

    const entries = await this.operationalStore
      .selectFrom("atlas_foundation_docs")
      .where("drive_id", "=", driveId)
      .selectAll()
      .execute();

    console.log(entries);
  }

  private async indexAtlasScope(
    driveId: string,
    documentId: string,
    state: AtlasScopeState,
  ) {
    const {
      docNo,
      name,
      content,
      masterStatus,
      globalTags,
      originalContextData,
      notionId,
    } = state;

    await this.operationalStore
      .insertInto("atlas_scope_docs")
      .columns([
        "drive_id",
        "document_id",
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
        drive_id: driveId,
        document_id: documentId,
        doc_no: docNo || "",
        name: name || "",
        content: content || "",
        master_status: masterStatus?.toString() || "",
        global_tags: JSON.stringify(globalTags || []),
        original_context_data: JSON.stringify(originalContextData || []),
        notion_id: notionId || null,
      })
      .onConflict((oc) =>
        oc.constraint("atlas_scope_docs_pkey").doUpdateSet({
          doc_no: sql`EXCLUDED.doc_no`,
          name: sql`EXCLUDED.name`,
          content: sql`EXCLUDED.content`,
          master_status: sql`EXCLUDED.master_status`,
          global_tags: sql`EXCLUDED.global_tags`,
          original_context_data: sql`EXCLUDED.original_context_data`,
          notion_id: sql`EXCLUDED.notion_id`,
        }),
      )
      .execute();

    const entries = await this.operationalStore
      .selectFrom("atlas_scope_docs")
      .where("drive_id", "=", driveId)
      .selectAll()
      .execute();

    console.log(entries);
  }
}
