import dotenv from "dotenv";
import { type Subgraph } from "@powerhousedao/reactor-api";
import { syncDocuments } from "../../scripts/apply-changes/syncDocuments.js";
dotenv.config();
const PORT = process.env.PORT || 4001;
// Reactor where the documents will be synchronized to
const GQL_ENDPOINT = undefined;

// Preferred editor for the drive when it's created
const PREFERRED_EDITOR = "AtlasDriveExplorer";

export const getResolvers = (subgraph: Subgraph) => {
  const reactor = subgraph.reactor;

  return {
    Mutation: {
      ForkAtlas: async (_: any, args: any) => {
        // Drive that the documents will be added/updated to. Will be created if it does not yet exist
        const DRIVE_NAME =
          "atlas_" +
          new Date()
            .toISOString()
            .substring(0, 16)
            .replaceAll(/[-:]/g, "")
            .replace("T", "_");

        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const driveId: string = args.driveId || DRIVE_NAME;
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
        const docId = args.docId;
        const config = {
          driveName: driveId,
          gqlEndpoint: GQL_ENDPOINT,
          preferredEditor: PREFERRED_EDITOR,
          processLimit: 20,
          skipNodes: {
            "422bae2b-2aec-4324-ae40-33c544820db3": true,
            "eca5e587-79e3-480b-b70d-dd25697c9e1f": true,
            "cde3202c-9073-43db-8405-4094624c57ea": true,
            "0ba1b2bd-9513-487d-974c-0d08fb04b341": true,
            "9e3f76e6-3343-4e70-af0b-c914be2e8d5a": true,
            "4281ab93-ef4f-4974-988d-7dad149a693d": true,
            [docId]: false,
          },
        };

        syncDocuments(config);

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

        return driveId;
      },
    },
  };
};
