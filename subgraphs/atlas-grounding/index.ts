import { Subgraph } from "@powerhousedao/reactor-api";

import { schema } from "./schema.js";
import { getResolvers } from "./resolvers.js";

export class AtlasGroundingSubgraph extends Subgraph {
  name = "atlas-grounding";

  typeDefs = schema;
  resolvers = getResolvers(this);
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
