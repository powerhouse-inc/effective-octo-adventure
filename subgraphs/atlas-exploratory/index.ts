import { Subgraph } from "@powerhousedao/reactor-api";
import { getResolvers } from "./resolvers";
import schema from "./schema.graphql";

export class AtlasExploratorySubgraph extends Subgraph {
  name = "atlas-exploratory";

  typeDefs = schema;

  resolvers = getResolvers(this, "powerhouse");
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
