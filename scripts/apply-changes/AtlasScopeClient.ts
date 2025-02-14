import { getPNDTitle, pndContentToString } from 'document-models/utils';
import { client, Status } from '../clients/atlas-scope';
import { ParsedNotionDocument } from './NotionTypes';

const SUBGRAPH = 'atlas-scope';

const statusStringToEnum = (status: string): Status => {
    switch(status.toUpperCase()) {
        case 'PLACEHOLDER':
            return Status.placeholder;
        case 'PROVISIONAL':
            return Status.provisional;
        case 'APPROVED':
            return Status.approved;
        case 'DEFERRED':
            return Status.deferred;
        case 'ARCHIVED':
            return Status.archived;
        default: 
            throw new Error('Unknown scope status: ' + status);
    }
};

export class AtlasScopeClient {
    private gqlClient = client;

    constructor(gqlEndpoint: string) {
        this.gqlClient.setUrl(gqlEndpoint + (gqlEndpoint.slice(-1) == '/' ? '' : '/') + SUBGRAPH);
    }

    public async update(notionDoc: ParsedNotionDocument) {
        console.log(`Updating document: ${getPNDTitle(notionDoc)}...`);

        const documentId = await this.gqlClient.mutations.AtlasScope_createDocument({
            __args: {
                name: getPNDTitle(notionDoc)
            }
        });

        await this.gqlClient.mutations.AtlasScope_setDocNumber({ __args: {
            docId: documentId,
            input: {
                docNo: notionDoc.docNo,
            }
        }});

        await this.gqlClient.mutations.AtlasScope_setScopeName({ __args: {
            docId: documentId,
            input: {
                name: getPNDTitle(notionDoc, false),
            }
        }});

        await this.gqlClient.mutations.AtlasScope_setMasterStatus({ __args: {
            docId: documentId,
            input: {
                masterStatus: statusStringToEnum(notionDoc.masterStatusNames[0] || 'PLACEHOLDER'),
            }
        }});

        await this.gqlClient.mutations.AtlasScope_setContent({ __args: {
            docId: documentId,
            input: {
                content: notionDoc.content.map(c => pndContentToString(c)).join("\n"),
            }
        }});

        await this.gqlClient.mutations.AtlasScope_setNotionId({ __args: {
            docId: documentId,
            input: {
                notionID: notionDoc.id
            }
        }});

        console.log(`Document ID: ${documentId}`);
        return documentId;
    }
}