import { Subgraph } from "@powerhousedao/reactor-api";
import { gql } from "graphql-tag";

import { readFileSync } from "fs";
import path from "path";
import { getResolvers } from "./resolvers";

// TODO: find a better way to import the graphql schema
const gqlFile = path.join(
  path.resolve(path.dirname("")),
  "./subgraphs/atlas-grounding/schema.graphql",
);
const gqlCode = readFileSync(gqlFile).toString();

export class AtlasGroundingSubgraph extends Subgraph {
  name = "atlas-grounding";

  typeDefs = gql`
    ${gqlCode}
  `;

  resolvers = getResolvers(this);
  additionalContextFields = {};
  async onSetup() {}
  async onDisconnect() {}
}
