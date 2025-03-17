import { Subgraph } from "@powerhousedao/reactor-api";
import schema from "./schema.graphql";
import { getResolvers } from "./resolvers.js";

export class ForkSubgraph extends Subgraph {
  name = "fork";

  typeDefs = schema;

  resolvers = getResolvers(this);
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
