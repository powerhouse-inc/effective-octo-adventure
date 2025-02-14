import { client } from '../clients/atlas-scope';
import { TreeNode } from './Tree';
import { getTitle } from './utils';

const SUBGRAPH = 'atlas-scope';

export class AtlasScopeClient {
    private gqlClient = client;

    constructor(gqlEndpoint: string) {
        this.gqlClient.setUrl(gqlEndpoint + (gqlEndpoint.slice(-1) == '/' ? '' : '/') + SUBGRAPH);
    }

    public async update(node: TreeNode) {
        console.log(`Updating node ${getTitle(node)}...`);

        const documentId = await this.gqlClient.mutations.AtlasScope_createDocument({
            __args: {
                name: getTitle(node)
            }
        });

        await this.gqlClient.mutations.AtlasScope_setScopeName({ __args: {
            docId: documentId,
            input: {
                name: getTitle(node, false)
            }
        }});

        await this.gqlClient.mutations.AtlasScope_setDocNumber({ __args: {
            docId: documentId,
            input: {
                docNo: node.title.formalId.prefix + '.' + node.title.formalId.numberPath.join('.')
            }
        }});

        await this.gqlClient.mutations.AtlasScope_setNotionId({ __args: {
            docId: documentId,
            input: {
                notionID: node.id
            }
        }});

        console.log(`Document ID: ${documentId}`);
        return documentId;
    }
}