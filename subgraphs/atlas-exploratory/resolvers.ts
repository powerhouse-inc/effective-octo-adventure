/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { Subgraph } from "@powerhousedao/reactor-api";
import { actions } from "../../document-models/atlas-exploratory";
import { actions as driveActions } from "document-model-libs/document-drive";
import { utils as docUtils } from "document-model/document";

export const getResolvers = (subgraph: Subgraph, driveId: string) => {
  const reactor = subgraph.reactor;

  return {
    Mutation: {
      AtlasExploratory_createDocument: async (_: any, args: any) => {
        const docId = docUtils.generateId();

        await reactor.addDriveAction(
          driveId,
          driveActions.addFile({
            id: docId,
            name: args.name,
            documentType: "sky/atlas-exploratory",
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

      AtlasExploratory_setExploratoryName: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setExploratoryName({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_setDocNumber: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setDocNumber({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_setContent: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setContent({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_setMasterStatus: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setMasterStatus({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_setParent: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setParent({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_removeParent: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeParent({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_setAtlasType: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setAtlasType({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_setFindings: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setFindings({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_addTags: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addTags({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_removeTags: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeTags({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_addContextData: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addContextData({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_removeContextData: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeContextData({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_setProvenance: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setProvenance({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_setNotionId: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.setNotionId({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_addAdditionalGuidance: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addAdditionalGuidance({ ...args.input }),
        );

        return doc.revision.global + 1;
      },

      AtlasExploratory_removeAdditionalGuidance: async (_: any, args: any) => {
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeAdditionalGuidance({ ...args.input }),
        );

        return doc.revision.global + 1;
      },
    },
  };
};
