import { Subgraph, type SubgraphArgs } from "@powerhousedao/reactor-api";
import { gql } from "graphql-tag";
import { type Kysely } from "kysely";
import { type Database } from "../../utils/generated/database-types.js";
import { getDb } from "../../utils/db.js";

export class SearchSubgraph extends Subgraph {
  name = "search";
  private kysely: Promise<Kysely<Database>> | null = null;

  constructor(args: SubgraphArgs) {
    super(args);
    try {
      this.kysely = getDb(this.operationalStore);
    } catch (error) {
      console.warn(
        "Failed to initialize database connection for search subgraph:",
        error,
      );
      this.kysely = null;
    }
  }

  resolvers = {
    Query: {
      AtlasDocuments: {
        resolve: async (
          parent: unknown,
          args: { query: string; limit?: number; offset?: number },
          context: unknown,
          info: unknown,
        ) => {
          try {
            const { query, limit = 50, offset = 0 } = args;
            const db = await this.kysely!;

            // Search in both atlas_scope_docs and atlas_foundation_docs
            const scopeResults = await db
              .selectFrom("atlas_scope_docs")
              .selectAll()
              .where((eb) =>
                eb.or([
                  eb("name", "ilike", `%${query}%`),
                  eb("content", "ilike", `%${query}%`),
                  eb("global_tags", "ilike", `%${query}%`),
                ]),
              )
              .limit(limit)
              .offset(offset)
              .execute();

            const foundationResults = await db
              .selectFrom("atlas_foundation_docs")
              .selectAll()
              .where((eb) =>
                eb.or([
                  eb("name", "ilike", `%${query}%`),
                  eb("content", "ilike", `%${query}%`),
                  eb("global_tags", "ilike", `%${query}%`),
                  eb("atlas_type", "ilike", `%${query}%`),
                ]),
              )
              .limit(limit)
              .offset(offset)
              .execute();

            // Transform results to match GraphQL schema
            const scopeDocuments = scopeResults.map((doc) => ({
              __typename: "AtlasScopeDocument",
              id: doc.doc_no,
              name: doc.name,
              content: doc.content,
              masterStatus: doc.master_status,
              globalTags: JSON.parse(doc.global_tags || "[]") as string[],
              originalContextData: JSON.parse(
                doc.original_context_data || "[]",
              ) as string[],
              notionId: doc.notion_id,
              createdAt: doc.created_at,
            }));

            const foundationDocuments = foundationResults.map((doc) => ({
              __typename: "AtlasFoundationDocument",
              id: doc.doc_no,
              name: doc.name,
              content: doc.content,
              parentId: doc.parent_id,
              atlasType: doc.atlas_type,
              masterStatus: doc.master_status,
              globalTags: JSON.parse(doc.global_tags || "[]") as string[],
              originalContextData: JSON.parse(
                doc.original_context_data || "[]",
              ) as string[],
              notionId: doc.notion_id,
              createdAt: doc.created_at,
            }));

            return [...scopeDocuments, ...foundationDocuments];
          } catch (error) {
            console.error("Error in AtlasDocuments resolver:", error);
            return [];
          }
        },
      },
      AtlasScopeDocuments: {
        resolve: async (
          parent: unknown,
          args: { query?: string; limit?: number; offset?: number },
          context: unknown,
          info: unknown,
        ) => {
          try {
            const { query, limit = 50, offset = 0 } = args;
            const db = await this.kysely!;

            let queryBuilder = db
              .selectFrom("atlas_scope_docs")
              .selectAll()
              .limit(limit)
              .offset(offset);

            if (query) {
              queryBuilder = queryBuilder.where((eb) =>
                eb.or([
                  eb("name", "ilike", `%${query}%`),
                  eb("content", "ilike", `%${query}%`),
                  eb("global_tags", "ilike", `%${query}%`),
                ]),
              );
            }

            const results = await queryBuilder.execute();

            return results.map((doc) => ({
              id: doc.doc_no,
              name: doc.name,
              content: doc.content,
              masterStatus: doc.master_status,
              globalTags: JSON.parse(doc.global_tags || "[]") as string[],
              originalContextData: JSON.parse(
                doc.original_context_data || "[]",
              ) as string[],
              notionId: doc.notion_id,
              createdAt: doc.created_at,
            }));
          } catch (error) {
            console.error("Error in AtlasScopeDocuments resolver:", error);
            return [];
          }
        },
      },
      AtlasFoundationDocuments: {
        resolve: async (
          parent: unknown,
          args: {
            query?: string;
            parentId?: string;
            atlasType?: string;
            limit?: number;
            offset?: number;
          },
          context: unknown,
          info: unknown,
        ) => {
          try {
            const { query, parentId, atlasType, limit = 50, offset = 0 } = args;
            const db = await this.kysely!;

            let queryBuilder = db
              .selectFrom("atlas_foundation_docs")
              .selectAll()
              .limit(limit)
              .offset(offset);

            if (parentId) {
              queryBuilder = queryBuilder.where("parent_id", "=", parentId);
            }

            if (atlasType) {
              queryBuilder = queryBuilder.where("atlas_type", "=", atlasType);
            }

            if (query) {
              queryBuilder = queryBuilder.where((eb) =>
                eb.or([
                  eb("name", "ilike", `%${query}%`),
                  eb("content", "ilike", `%${query}%`),
                  eb("global_tags", "ilike", `%${query}%`),
                  eb("atlas_type", "ilike", `%${query}%`),
                ]),
              );
            }

            const results = await queryBuilder.execute();

            return results.map((doc) => ({
              id: doc.doc_no,
              name: doc.name,
              content: doc.content,
              parentId: doc.parent_id,
              atlasType: doc.atlas_type,
              masterStatus: doc.master_status,
              globalTags: JSON.parse(doc.global_tags || "[]") as string[],
              originalContextData: JSON.parse(
                doc.original_context_data || "[]",
              ) as string[],
              notionId: doc.notion_id,
              createdAt: doc.created_at,
            }));
          } catch (error) {
            console.error("Error in AtlasFoundationDocuments resolver:", error);
            return [];
          }
        },
      },
    },
  };

  typeDefs = gql`
    interface AtlasDocument {
      id: ID!
      name: String!
      content: String!
      masterStatus: String!
      globalTags: [String!]!
      originalContextData: [String!]!
      notionId: String
      createdAt: String!
    }

    type AtlasScopeDocument implements AtlasDocument {
      id: ID!
      name: String!
      content: String!
      masterStatus: String!
      globalTags: [String!]!
      originalContextData: [String!]!
      notionId: String
      createdAt: String!
    }

    type AtlasFoundationDocument implements AtlasDocument {
      id: ID!
      name: String!
      content: String!
      parentId: String!
      atlasType: String!
      masterStatus: String!
      globalTags: [String!]!
      originalContextData: [String!]!
      notionId: String
      createdAt: String!
    }

    type Query {
      AtlasDocuments(query: String!, limit: Int, offset: Int): [AtlasDocument!]!
      AtlasScopeDocuments(
        query: String
        limit: Int
        offset: Int
      ): [AtlasScopeDocument!]!
      AtlasFoundationDocuments(
        query: String
        parentId: String
        atlasType: String
        limit: Int
        offset: Int
      ): [AtlasFoundationDocument!]!
    }
  `;

  async onDisconnect() {
    this.kysely = null;
  }
}
