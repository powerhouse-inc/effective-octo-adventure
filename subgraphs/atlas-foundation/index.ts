import { Subgraph } from "@powerhousedao/reactor-api";
import schema from "./schema.graphql";
import { getResolvers } from "./resolvers";

export class AtlasFoundationSubgraph extends Subgraph {
  name = "atlas-foundation";

  typeDefs = schema;

  resolvers = getResolvers(this, "powerhouse");
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
