/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Subgraph } from "@powerhousedao/reactor-api";
import { gql } from "graphql-tag";
import { type ExpressionBuilder } from "kysely";
import { type DB } from "../../processors/search-indexer/schema.js";
import { type IRelationalDb } from "document-drive/processors/types";

export class AtlasDocumentsSubgraph extends Subgraph {
  name = "search";

  resolvers = {
    Query: {
      AtlasDocuments: {
        resolve: async (
          parent: unknown,
          args: {
            query?: string;
            limit?: number;
            offset?: number;
            parent?: string;
          },
          context: unknown,
          info: unknown,
        ) => {
          try {
            if (args.parent) {
              const foundationResults = await (
                this.relationalDb as unknown as IRelationalDb<DB>
              )
                .selectFrom("atlas_foundation_docs")
                .selectAll()
                .where("parent_id", "=", args.parent)
                .execute();
              const foundationDocuments = foundationResults.map((doc: any) => ({
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

              return foundationDocuments;
            }

            const { query, limit = 50, offset = 0 } = args;
            const db = this.relationalDb as unknown as IRelationalDb<DB>;

            // Search in both atlas_scope_docs and atlas_foundation_docs
            const scopeResults = await db
              .selectFrom("atlas_scope_docs")
              .selectAll()
              .where((eb: ExpressionBuilder<DB, "atlas_scope_docs">) =>
                eb.or([
                  eb("name", "ilike", `%${query ?? ""}%`),
                  eb("content", "ilike", `%${query ?? ""}%`),
                  eb("global_tags", "ilike", `%${query ?? ""}%`),
                ]),
              )
              .limit(limit)
              .offset(offset)
              .execute();

            const foundationResults = await db
              .selectFrom("atlas_foundation_docs")
              .selectAll()
              .where((eb: ExpressionBuilder<DB, "atlas_foundation_docs">) =>
                eb.or([
                  eb("name", "ilike", `%${query ?? ""}%`),
                  eb("content", "ilike", `%${query ?? ""}%`),
                  eb("global_tags", "ilike", `%${query ?? ""}%`),
                  eb("atlas_type", "ilike", `%${query ?? ""}%`),
                ]),
              )
              .limit(limit)
              .offset(offset)
              .execute();

            // Transform results to match GraphQL schema
            const scopeDocuments = scopeResults.map((doc: any) => ({
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

            const foundationDocuments = foundationResults.map((doc: any) => ({
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
            const db = this.relationalDb as unknown as IRelationalDb<DB>;

            let queryBuilder = db
              .selectFrom("atlas_scope_docs")
              .selectAll()
              .limit(limit)
              .offset(offset);

            if (query) {
              queryBuilder = queryBuilder.where(
                (eb: ExpressionBuilder<DB, "atlas_scope_docs">) =>
                  eb.or([
                    eb("name", "ilike", `%${query}%`),
                    eb("content", "ilike", `%${query}%`),
                    eb("global_tags", "ilike", `%${query}%`),
                  ]),
              );
            }

            const results = await queryBuilder.execute();

            return results.map((doc: any) => ({
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
            const db = this.relationalDb as unknown as IRelationalDb<DB>;

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
              queryBuilder = queryBuilder.where(
                (eb: ExpressionBuilder<DB, "atlas_foundation_docs">) =>
                  eb.or([
                    eb("name", "ilike", `%${query}%`),
                    eb("content", "ilike", `%${query}%`),
                    eb("global_tags", "ilike", `%${query}%`),
                    eb("atlas_type", "ilike", `%${query}%`),
                  ]),
              );
            }

            const results = await queryBuilder.execute();

            return results.map((doc: any) => ({
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
      AtlasDocuments(
        query: String
        limit: Int
        offset: Int
        parent: String
      ): [AtlasDocument!]!
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

  async onDisconnect() {}
}
