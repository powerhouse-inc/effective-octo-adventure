/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Subgraph } from "@powerhousedao/reactor-api";
import { actions } from "../../document-models/atlas-multi-parent";
import { actions as driveActions } from "document-model-libs/document-drive";
import { utils as docUtils } from "document-model/document";

export const getResolvers = (subgraph: Subgraph, driveId: string) => {
  const reactor = subgraph.reactor;

  return {
    Mutation: {
      AtlasMultiParent_createDocument: async (_: any, args: any) => {
        const docId = docUtils.generateId();

        await reactor.addDriveAction(
          driveId,
          driveActions.addFile({
            id: docId,
            name: args.name,
            documentType: "sky/atlas-multiparent",
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

      AtlasMultiParent_setMultiparentName: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setMultiparentName({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasMultiParent_setDocNumber: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setDocNumber({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasMultiParent_setContent: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setContent({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasMultiParent_setMasterStatus: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setMasterStatus({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasMultiParent_setParent: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setParent({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasMultiParent_setAtlasType: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setAtlasType({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasMultiParent_addTags: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addTags({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasMultiParent_removeTags: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeTags({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasMultiParent_addContextData: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addContextData({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasMultiParent_removeContextData: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeContextData({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasMultiParent_setProvenance: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setProvenance({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasMultiParent_setNotionId: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setNotionId({ ...args.input }),
        );

        return doc.revision.global + 1;
      },
    },
  };
};
