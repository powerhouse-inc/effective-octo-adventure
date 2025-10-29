import { type SubgraphArgs, type ISubgraph } from "@powerhousedao/reactor-api";

import { schema } from "./schema.js";
import { getResolvers } from "./resolvers.js";
import { type IDocumentDriveServer, type IRelationalDb } from "document-drive";

export class AtlasFoundationSubgraph implements ISubgraph {
  name = "atlas-foundation";
  typeDefs = schema;
  resolvers = getResolvers(this);
  additionalContextFields = {};

  reactor: IDocumentDriveServer;
  relationalDb: IRelationalDb;

  constructor(args: SubgraphArgs) {
    this.reactor = args.reactor;
    this.relationalDb = args.relationalDb;
  }

  async onSetup() {}
  async onDisconnect() {}
}
