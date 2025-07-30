/* eslint-disable @typescript-eslint/no-unsafe-argument */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
import { type Subgraph } from "@powerhousedao/reactor-api";
import { addFile } from "document-drive";
import { actions } from "../../document-models/atlas-feedback-issues/index.js";
import { generateId } from "document-model";

const DEFAULT_DRIVE_ID = "powerhouse";

export const getResolvers = (subgraph: Subgraph): Record<string, any> => {
  const reactor = subgraph.reactor;

  return {
    Query: {
      AtlasFeedbackIssues: async (_: any, args: any, ctx: any) => {
        return {
          getDocument: async (args: any) => {
            const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
            const docId: string = args.docId || "";
            const doc = await reactor.getDocument(driveId, docId);
            return {
              // @ts-ignore
              id: docId,
              driveId: driveId,
              ...doc,
              state: doc?.state.global,
              stateJSON: doc?.state.global,
              revision: doc?.header.revision["global"] ?? 0,
            };
          },
          getDocuments: async (args: any) => {
            const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
            const docsIds = await reactor.getDocuments(driveId);
            const docs = await Promise.all(
              (docsIds ?? []).map(async (docId) => {
                const doc = await reactor.getDocument(driveId, docId);
                return {
                  // @ts-ignore
                  id: docId,
                  driveId: driveId,
                  ...doc,
                  state: doc?.state.global,
                  stateJSON: doc?.state.global,
                  revision: doc?.header.revision["global"] ?? 0,
                };
              }),
            );

            return docs.filter(
              (doc) => doc?.header?.documentType === "makerdao/feedback-issues",
            );
          },
        };
      },
    },
    Mutation: {
      AtlasFeedbackIssues_createDocument: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId = generateId();

        await reactor.addDriveAction(
          driveId,
          addFile({
            id: docId,
            name: args.name,
            documentType: "makerdao/feedback-issues",
            synchronizationUnits: [
              {
                branch: "main",
                scope: "global",
                syncId: generateId(),
              },
              {
                branch: "main",
                scope: "local",
                syncId: generateId(),
              },
            ],
          }),
        );

        return docId;
      },

      AtlasFeedbackIssues_createIssue: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.createIssue({ ...args.input }),
        );

        return (doc?.header.revision["global"] ?? 0) + 1;
      },

      AtlasFeedbackIssues_deleteIssue: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.deleteIssue({ ...args.input }),
        );

        return (doc?.header.revision["global"] ?? 0) + 1;
      },

      AtlasFeedbackIssues_addNotionId: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.addNotionId({ ...args.input }),
        );

        return (doc?.header.revision["global"] ?? 0) + 1;
      },

      AtlasFeedbackIssues_removeNotionId: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.removeNotionId({ ...args.input }),
        );

        return (doc?.header.revision["global"] ?? 0) + 1;
      },

      AtlasFeedbackIssues_createComment: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.createComment({ ...args.input }),
        );

        return (doc?.header.revision["global"] ?? 0) + 1;
      },

      AtlasFeedbackIssues_deleteComment: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.deleteComment({ ...args.input }),
        );

        return (doc?.header.revision["global"] ?? 0) + 1;
      },

      AtlasFeedbackIssues_editComment: async (_: any, args: any) => {
        const driveId: string = args.driveId || DEFAULT_DRIVE_ID;
        const docId: string = args.docId || "";
        const doc = await reactor.getDocument(driveId, docId);

        await reactor.addAction(
          driveId,
          docId,
          actions.editComment({ ...args.input }),
        );

        return (doc?.header.revision["global"] ?? 0) + 1;
      },
    },
  };
};
