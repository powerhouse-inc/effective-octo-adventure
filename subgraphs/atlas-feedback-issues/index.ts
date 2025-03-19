import { Subgraph } from "@powerhousedao/reactor-api";

import schema from "./schema.graphql";
import { getResolvers } from "./resolvers";

export class AtlasFeedbackIssuesSubgraph extends Subgraph {
  name = "atlas-feedback-issues";

  typeDefs = schema;
  resolvers = getResolvers(this);
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
