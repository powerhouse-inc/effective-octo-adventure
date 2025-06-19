import { Subgraph } from "@powerhousedao/reactor-api";

import { gql } from "graphql-tag";
import { type Kysely } from "kysely";

export class SearchSubgraph extends Subgraph {
  name = "search";

  resolvers = {
    Query: {
      search: {
        resolve: async (
          parent: any,
          args: { query: string },
          context: any,
          info: any,
        ) => {
          // get query from args
          const query = args.query;

          return [];
        },
      },
    },
  };

  typeDefs = gql`
    type SearchResult {
      id: ID!
      name: String!
      content: String!
    }

    type Query {
      search(query: String!): [SearchResult!]!
    }
  `;

  async onSetup() {}

  async onDisconnect() {}
}
