/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Subgraph } from "@powerhousedao/reactor-api";
import { actions } from "../../document-models/atlas-grounding";
import { actions as driveActions } from "document-model-libs/document-drive";
import { utils as docUtils } from "document-model/document";

export const getResolvers = (subgraph: Subgraph, driveId: string) => {
  const reactor = subgraph.reactor;

  return {
    Mutation: {
      AtlasGrounding_createDocument: async (_: any, args: any) => {
        const docId = docUtils.generateId();

        await reactor.addDriveAction(
          driveId,
          driveActions.addFile({
            id: docId,
            name: args.name,
            documentType: "sky/atlas-grounding",
            synchronizationUnits: [
              {
                branch: "main",
                scope: "global",
                syncId: docUtils.hashKey(),
              },
              {
                branch: "main",
                scope: "local",
                syncId: docUtils.hashKey(),
              },
            ],
          }),
        );

        return docId;
      },

      AtlasGrounding_setGroundingName: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setGroundingName({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasGrounding_setDocNumber: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setDocNumber({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasGrounding_setContent: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setContent({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasGrounding_setMasterStatus: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setMasterStatus({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasGrounding_setAtlasType: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setAtlasType({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasGrounding_setParent: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setParent({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasGrounding_addTags: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addTags({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasGrounding_removeTags: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeTags({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasGrounding_addContextData: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addContextData({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasGrounding_removeContextData: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeContextData({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasGrounding_setProvenance: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setProvenance({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasGrounding_setNotionId: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setNotionId({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasGrounding_addReference: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addReference({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasGrounding_removeReference: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeReference({ ...args.input }),
        );

        return doc.revision.global + 1;
      },
    },
  };
};
