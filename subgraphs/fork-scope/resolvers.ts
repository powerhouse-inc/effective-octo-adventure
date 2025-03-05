/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Subgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import { actions } from "../../document-models/atlas-scope";
import { generateId, hashKey } from "document-model";
//import { syncDocuments } from "../../scripts/apply-changes/syncDocuments";

// Reactor where the documents will be synchronized to
const GQL_ENDPOINT = "http://localhost:4001/";

// Drive that the documents will be added/updated to. Will be created if it does not yet exist
const DRIVE_NAME =
  "atlas_" +
  new Date()
    .toISOString()
    .substring(0, 16)
    .replaceAll(/[\-:]/g, "")
    .replace("T", "_");

// Preferred editor for the drive when it's created
const PREFERRED_EDITOR = "AtlasDriveExplorer";

export const getResolvers = (subgraph: Subgraph) => {
  const reactor = subgraph.reactor;

  return {
    Mutation: {
      ForkAtlas: async (_: any, args: any) => {
        const driveId: string = args.driveId || DRIVE_NAME;
        const docId = args.docId;
        const config = {
          driveName: driveId,
          gqlEndpoint: GQL_ENDPOINT,
          preferredEditor: PREFERRED_EDITOR,
          processLimit: 100,
          skipNodes: {
            [docId]: false,
          },
        };

        //await syncDocuments(config);

        /*
        await reactor.addDriveAction(
          driveId,
          addFile({
            id: docId,
            name: args.name,
            documentType: "sky/atlas-scope",
            synchronizationUnits: [
              {
                branch: "main",
                scope: "global",
                syncId: hashKey(),
              },
              {
                branch: "main",
                scope: "local",
                syncId: hashKey(),
              },
            ],
          }),
        );
        */

        return 1;
      },
    },
  };
};
