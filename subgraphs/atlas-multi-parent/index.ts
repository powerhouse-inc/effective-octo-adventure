import { Subgraph } from "@powerhousedao/reactor-api";

import { schema } from "./schema.js";
import { getResolvers } from "./resolvers.js";

export class AtlasMultiParentSubgraph extends Subgraph {
  name = "atlas-multi-parent";

  typeDefs = schema;
  resolvers = getResolvers(this);
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
