import { Subgraph } from "@powerhousedao/reactor-api";
import schema from "./schema.graphql";
import { getResolvers } from "./resolvers";

export class AtlasGroundingSubgraph extends Subgraph {
  name = "atlas-grounding";

  typeDefs = schema;

  resolvers = getResolvers(this, "powerhouse");
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
