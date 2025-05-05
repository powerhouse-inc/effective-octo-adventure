import { Subgraph } from "@powerhousedao/reactor-api";

import { schema } from "./schema.js";
import { getResolvers } from "./resolvers.js";

export class AtlasSetSubgraph extends Subgraph {
  name = "atlas-set";

  typeDefs = schema;
  resolvers = getResolvers(this);
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
