import { Subgraph } from "@powerhousedao/reactor-api";

import schema from "./schema.graphql";
import { getResolvers } from "./resolvers.js";

export class AtlasScopeSubgraph extends Subgraph {
  name = "atlas-scope";

  typeDefs = schema;
  resolvers = getResolvers(this);
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
