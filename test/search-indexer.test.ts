import { type InternalTransmitterUpdate } from "document-drive";
import {
  type AtlasFoundationDocument,
  type AtlasFoundationState,
} from "document-models/atlas-foundation/index.js";
import {
  type AtlasScopeDocument,
  type AtlasScopeState,
} from "document-models/atlas-scope/index.js";
import { Kysely } from "kysely";
import { KyselyPGlite } from "kysely-pglite";
import { SearchIndexerProcessor } from "../processors/search-indexer/index.js";

describe("search-indexer", () => {
  let processor: SearchIndexerProcessor;
  const namespace = "search-indexer-test";

  beforeAll(async () => {
    try {
      const { dialect } = await KyselyPGlite.create();
      const db = new Kysely<unknown>({ dialect });
      processor = (await SearchIndexerProcessor.build(
        namespace,
        db,
      )) as SearchIndexerProcessor;
      await processor.initAndUpgrade();
    } catch (error) {
      console.error(error);
    }
  });

  it("should instantiate the processor", () => {
    expect(processor).toBeDefined();
  });

  it("should have a kysely instance as operational store", () => {
    expect(processor.operationalStore).toBeDefined();
    expect(processor.operationalStore).toBeInstanceOf(Kysely);
  });

  it("should create the db tables", async () => {
    const tables = await processor.operationalStore.introspection.getTables();
    const tableNames = tables.map((table) => table.name);
    expect(tableNames).toContain("atlas_scope_docs");
    expect(tableNames).toContain("atlas_foundation_docs");
  });

  describe("atlas scope document", () => {
    it("should handle initial state", async () => {
      const strand: InternalTransmitterUpdate<AtlasScopeDocument> = {
        driveId: "powerhouse",
        documentId: "atlas-scope-document-id",
        documentType: "sky/atlas-scope",
        scope: "global" as const,
        branch: "main",
        operations: [],
        state: {
          docNo: "",
          name: "",
          content: "",
          masterStatus: "PLACEHOLDER",
          globalTags: [],
          originalContextData: [],
          notionId: "",
        } as AtlasScopeState,
      };

      await processor.onStrands([strand]);

      try {
        const result = await processor.operationalStore
          .selectFrom("atlas_scope_docs")
          .selectAll()
          .where("drive_id", "=", "powerhouse")
          .where("document_id", "=", "atlas-scope-document-id")
          .executeTakeFirst();
        expect(result).toBeDefined();
      } catch (e) {
        expect(e).toBeUndefined();
      }
    });

    it("should handle set content operation", async () => {
      try {
        const strand: InternalTransmitterUpdate<AtlasScopeDocument> = {
          driveId: "powerhouse",
          documentId: "atlas-scope-document-id",
          documentType: "sky/atlas-scope",
          scope: "global" as const,
          branch: "main",
          operations: [],
          state: {
            docNo: "",
            name: "",
            content: "set content",
            masterStatus: "PLACEHOLDER",
            globalTags: [],
            originalContextData: [],
            notionId: "",
          } as AtlasScopeState,
        };

        await processor.onStrands([strand]);

        const result = await processor.operationalStore
          .selectFrom("atlas_scope_docs")
          .selectAll()
          .where("drive_id", "=", "powerhouse")
          .where("document_id", "=", "atlas-scope-document-id")
          .executeTakeFirst();
        expect(result).toBeDefined();
        expect(result?.content).toBe("set content");

        // should keep previous set values
        expect(result?.master_status).toBe("PLACEHOLDER");
      } catch (e) {
        console.log("ERROR >>> ", e);
        expect(e).toBeUndefined();
      }
    });

    it("should handle set doc number operation", async () => {
      const strand: InternalTransmitterUpdate<AtlasScopeDocument> = {
        driveId: "powerhouse",
        documentId: "atlas-scope-document-id",
        documentType: "sky/atlas-scope",
        scope: "global" as const,
        branch: "main",
        operations: [],
        state: {
          docNo: "atlas-scope-document-docNo",
          name: "",
          content: "set content",
          masterStatus: "PLACEHOLDER",
          globalTags: [],
          originalContextData: [],
          notionId: "",
        } as AtlasScopeState,
      };

      await processor.onStrands([strand]);
      const result = await processor.operationalStore
        .selectFrom("atlas_scope_docs")
        .selectAll()
        .where("document_id", "=", "atlas-scope-document-id")
        .where("drive_id", "=", "powerhouse")
        .executeTakeFirst();

      expect(result?.doc_no).toBe("atlas-scope-document-docNo");
    });

    describe("global tag management", () => {
      it("should handle add global tag operation", async () => {
        const strand: InternalTransmitterUpdate<AtlasScopeDocument> = {
          driveId: "powerhouse",
          documentId: "atlas-scope-document-id",
          documentType: "sky/atlas-scope",
          scope: "global" as const,
          branch: "main",
          operations: [],
          state: {
            docNo: "atlas-scope-document-docNo",
            name: "",
            content: "",
            masterStatus: "PLACEHOLDER",
            globalTags: ["ANON_WORKFORCE"],
            originalContextData: [],
            notionId: "",
          } as AtlasScopeState,
        };

        await processor.onStrands([strand]);

        const result = await processor.operationalStore
          .selectFrom("atlas_scope_docs")
          .selectAll()
          .where("document_id", "=", "atlas-scope-document-id")
          .where("drive_id", "=", "powerhouse")
          .executeTakeFirst();

        expect(result?.global_tags).toContain("ANON_WORKFORCE");
      });

      it("should handle remove global tag operation", async () => {
        const strand: InternalTransmitterUpdate<AtlasScopeDocument> = {
          driveId: "powerhouse",
          documentId: "atlas-scope-document-id",
          documentType: "sky/atlas-scope",
          scope: "global" as const,
          branch: "test",
          operations: [],
          state: {
            docNo: "test",
            name: "",
            content: "",
            masterStatus: "PLACEHOLDER",
            globalTags: [],
            originalContextData: [],
            notionId: "",
          } as AtlasScopeState,
        };

        await processor.onStrands([strand]);

        const result = await processor.operationalStore
          .selectFrom("atlas_scope_docs")
          .selectAll()
          .where("document_id", "=", "atlas-scope-document-id")
          .where("drive_id", "=", "powerhouse")
          .executeTakeFirst();

        expect(result?.global_tags).not.toContain("ANON_WORKFORCE");
      });
    });

    describe("context data management", () => {
      it("should handle add context data operation", async () => {
        const strand: InternalTransmitterUpdate<AtlasScopeDocument> = {
          driveId: "powerhouse",
          documentId: "atlas-scope-document-id",
          documentType: "sky/atlas-scope",
          scope: "global" as const,
          branch: "main",
          operations: [],
          state: {
            docNo: "atlas-scope-document-docNo",
            name: "",
            content: "",
            masterStatus: "PLACEHOLDER",
            globalTags: [],
            originalContextData: ["test"],
            notionId: "",
          } as AtlasScopeState,
        };

        await processor.onStrands([strand]);

        const result = await processor.operationalStore
          .selectFrom("atlas_scope_docs")
          .selectAll()
          .where("document_id", "=", "atlas-scope-document-id")
          .where("drive_id", "=", "powerhouse")
          .executeTakeFirst();

        expect(result?.original_context_data).toContain("test");
      });

      it("should handle remove context data operation", async () => {
        const strand: InternalTransmitterUpdate<AtlasScopeDocument> = {
          driveId: "powerhouse",
          documentId: "atlas-scope-document-id",
          documentType: "sky/atlas-scope",
          scope: "global" as const,
          branch: "main",
          operations: [],
          state: {
            docNo: "atlas-scope-document-docNo",
            name: "",
            content: "",
            masterStatus: "PLACEHOLDER",
            globalTags: [],
            originalContextData: [],
            notionId: "",
          } as AtlasScopeState,
        };

        await processor.onStrands([strand]);

        const result = await processor.operationalStore
          .selectFrom("atlas_scope_docs")
          .selectAll()
          .where("document_id", "=", "atlas-scope-document-id")
          .where("drive_id", "=", "powerhouse")
          .executeTakeFirst();

        expect(result?.original_context_data).not.toContain("test");
      });
    });
  });

  describe("atlas foundation document", () => {
    it("should handle initial state", async () => {
      const strand: InternalTransmitterUpdate<AtlasFoundationDocument> = {
        driveId: "powerhouse",
        documentType: "sky/atlas-foundation",
        documentId: "atlas-foundation-document-id",
        scope: "global" as const,
        branch: "main",
        operations: [],
        state: {
          docNo: "",
          name: "",
          content: "",
          masterStatus: "PLACEHOLDER",
          globalTags: [],
          originalContextData: [],
          notionId: "",
          atlasType: "ARTICLE",
          parent: null,
        } as AtlasFoundationState,
      };

      await processor.onStrands([strand]);

      const result = await processor.operationalStore
        .selectFrom("atlas_foundation_docs")
        .selectAll()
        .where("document_id", "=", "atlas-foundation-document-id")
        .where("drive_id", "=", "powerhouse")
        .executeTakeFirst();

      console.log("RESULT >>> ", result);
      expect(result).toBeDefined();
    });

    it("should handle set parent operation", async () => {
      const strand: InternalTransmitterUpdate<AtlasFoundationDocument> = {
        driveId: "powerhouse",
        documentType: "sky/atlas-foundation",
        documentId: "atlas-foundation-document-id",
        scope: "global" as const,
        branch: "main",
        operations: [],
        state: {
          docNo: "",
          name: "",
          content: "",
          masterStatus: "PLACEHOLDER",
          globalTags: [],
          originalContextData: [],
          notionId: "",
          atlasType: "ARTICLE",
          parent: {
            docNo: "atlas-scope-document-docNo",
            documentType: "sky/atlas-scope",
            icon: "",
            id: "atlas-scope-document-id",
            title: "atlas-scope-document-name",
          },
        } as AtlasFoundationState,
      };

      await processor.onStrands([strand]);

      const result = await processor.operationalStore
        .selectFrom("atlas_foundation_docs")
        .selectAll()
        .where("document_id", "=", "atlas-foundation-document-id")
        .where("drive_id", "=", "powerhouse")
        .executeTakeFirst();

      expect(result?.parent_id).toBe("atlas-scope-document-id");
    });
  });

  it("should handle change from one parent to another", async () => {
    const strandAtlasScope2: InternalTransmitterUpdate<AtlasScopeDocument> = {
      driveId: "powerhouse",
      documentId: "atlas-scope-document-id-2",
      documentType: "sky/atlas-scope",
      scope: "global" as const,
      branch: "main",
      operations: [],
      state: {
        docNo: "atlas-scope-document-docNo-2",
        name: "",
        content: "",
        masterStatus: "PLACEHOLDER",
        globalTags: [],
        originalContextData: [],
        notionId: "",
      } as AtlasScopeState,
    };

    await processor.onStrands([strandAtlasScope2]);

    const strand: InternalTransmitterUpdate<AtlasFoundationDocument> = {
      driveId: "powerhouse",
      documentType: "sky/atlas-foundation",
      documentId: "atlas-foundation-document-id",
      scope: "global" as const,
      branch: "main",
      operations: [],
      state: {
        docNo: "",
        name: "",
        content: "",
        masterStatus: "PLACEHOLDER",
        globalTags: [],
        originalContextData: [],
        notionId: "",
        atlasType: "ARTICLE",
        parent: {
          docNo: "atlas-scope-document-docNo-2",
          documentType: "sky/atlas-scope",
          icon: "",
          id: "atlas-scope-document-id-2",
          title: "atlas-scope-document-name",
        },
      } as AtlasFoundationState,
    };

    await processor.onStrands([strand]);

    const result = await processor.operationalStore
      .selectFrom("atlas_foundation_docs")
      .selectAll()
      .where("document_id", "=", "atlas-foundation-document-id")
      .where("drive_id", "=", "powerhouse")
      .executeTakeFirst();

    expect(result?.parent_id).toBe("atlas-scope-document-id-2");
  });
});
