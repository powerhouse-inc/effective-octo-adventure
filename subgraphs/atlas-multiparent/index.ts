import { Subgraph } from "@powerhousedao/reactor-api";

import schema from "./schema.graphql";
import { getResolvers } from "./resolvers.js";

export class AtlasMultiparentSubgraph extends Subgraph {
  name = "atlas-multiparent";

  typeDefs = schema;
  resolvers = getResolvers(this);
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
