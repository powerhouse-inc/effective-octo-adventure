import { getPNDTitle, pndContentToString } from 'document-models/utils';
import { client as writeClient, Status } from '../clients/atlas-scope';
import { ParsedNotionDocument } from './NotionTypes';
import { AtlasDocumentsCache } from './AtlasDocumentsCache';
import { ReactorClient } from 'scripts/clients/ReactorClient';
import { gql } from 'graphql-request';
import { AtlasScopeState } from 'document-models/atlas-scope';

const SUBGRAPH = 'atlas-scope';
const DOCUMENT_TYPE = 'sky/atlas-scope';
const MAX_QUERY_BATCH_SIZE = 5;

const statusStringToEnum = (status: string): Status => {
  switch (status.toUpperCase()) {
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

export type AtlasScopeGqlResult = {
  document: {
    id: string,
    name: string, 
    state: AtlasScopeState,
    revision: number,
  }
}

export class AtlasScopeClient {
  private readClient: ReactorClient;
  private writeClient = writeClient;
  private documentsCache: AtlasDocumentsCache;

  constructor(mutationsEndpointUrl: string, documentsCache: AtlasDocumentsCache, readClient: ReactorClient) {
    this.readClient = readClient;
    this.writeClient.setUrl(mutationsEndpointUrl + (mutationsEndpointUrl.slice(-1) == '/' ? '' : '/') + SUBGRAPH);
    this.documentsCache = documentsCache;
  }

  private async getDocumentData(documentId: string) {
    return this.readClient.queryReactor<AtlasScopeGqlResult>(
      gql`
        query getScopeDocument($documentId: String!) {
          document(id: $documentId) {
            ... on AtlasScope {
              id
              name
              state {
                docNo
                name
                masterStatus
                content
                globalTags
                notionId
              }
              revision
            }
          }
        }
      `,
      {
        documentId
      }
    );
  }

  public async updateDriveDocumentCache() {
    const driveDocuments = Object.values(this.documentsCache.getDocumentsOfType(DOCUMENT_TYPE));
    console.log(` > Loading cache for ${driveDocuments.length} ${DOCUMENT_TYPE} document(s)...`);

    for (let i=0; i<driveDocuments.length; ) {
      const batchSize = Math.min(MAX_QUERY_BATCH_SIZE, driveDocuments.length-i);
      const data = await Promise.all(driveDocuments.slice(i, i+batchSize).map(d => this.getDocumentData(d.id)));
      
      data.forEach(d => this.documentsCache.updateDocument({
        id: d.document.id,
        documentType: DOCUMENT_TYPE,
        notionId: d.document.state.notionId || null,
        name: d.document.state.name || undefined
      }));

      i += batchSize;
    }
  }

  public async update(notionDoc: ParsedNotionDocument) {
    const documentIds = this.documentsCache.resolveNotionId(notionDoc.id);
    let newDocumentId: string | null = null;

    if (documentIds.length > 0) {
      console.log(`Updating ${documentIds.length} existing document(s) for "${getPNDTitle(notionDoc)}"...`);
    
    } else {
      newDocumentId = await this.writeClient.mutations.AtlasScope_createDocument(
        { __args: { name: getPNDTitle(notionDoc) }}
      );

      documentIds.push(newDocumentId);
      this.documentsCache.createDocument({
        id: newDocumentId,
        documentType: DOCUMENT_TYPE,
        notionId: notionDoc.id
      });

      console.log(`Creating new document for "${getPNDTitle(notionDoc)}"...`);
    }

    for (const documentId of documentIds) {
      await this.writeClient.mutations.AtlasScope_setDocNumber({
        __args: {
          docId: documentId,
          input: {
            docNo: notionDoc.docNo,
          }
        }
      });
  
      await this.writeClient.mutations.AtlasScope_setScopeName({
        __args: {
          docId: documentId,
          input: {
            name: getPNDTitle(notionDoc, false),
          }
        }
      });
  
      await this.writeClient.mutations.AtlasScope_setMasterStatus({
        __args: {
          docId: documentId,
          input: {
            masterStatus: statusStringToEnum(notionDoc.masterStatusNames[0] || 'PLACEHOLDER'),
          }
        }
      });
  
      await this.writeClient.mutations.AtlasScope_setContent({
        __args: {
          docId: documentId,
          input: {
            content: notionDoc.content.map(c => pndContentToString(c)).join("\n"),
          }
        }
      });
  
      await this.writeClient.mutations.AtlasScope_setNotionId({
        __args: {
          docId: documentId,
          input: {
            notionID: notionDoc.id
          }
        }
      });
    }
  
    return newDocumentId;
  }
}