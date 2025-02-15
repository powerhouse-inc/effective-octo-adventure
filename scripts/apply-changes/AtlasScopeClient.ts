import { getPNDTitle, pndContentToString } from 'document-models/utils';
import { client as writeClient, Status } from '../clients/atlas-scope';
import { ParsedNotionDocument } from './atlas-base/NotionTypes';
import { DocumentsCache, DocumentCacheEntry } from './common/DocumentsCache';
import { ReactorClient } from './common/ReactorClient';
import { gql } from 'graphql-request';
import { AtlasScopeState } from 'document-models/atlas-scope';
import { AtlasBaseClient } from './atlas-base/AtlasBaseClient';

const DOCUMENT_TYPE = 'sky/atlas-scope';

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

export class AtlasScopeClient extends AtlasBaseClient<AtlasScopeState, typeof writeClient> {
  constructor(mutationsSubgraphUrl: string, documentsCache: DocumentsCache, readClient: ReactorClient) {
    super(DOCUMENT_TYPE, mutationsSubgraphUrl, documentsCache, readClient, writeClient);

    this.setDocumentSchema(gql`
      AtlasScope {
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
    `);
  }

  protected createDocumentFromInput(notionDoc: ParsedNotionDocument) {
    return this.writeClient.mutations.AtlasScope_createDocument(
      { __args: { name: getPNDTitle(notionDoc) }}
    );
  }

  protected async patchDocument(document: DocumentCacheEntry, notionDoc: ParsedNotionDocument): Promise<boolean> {
    await this.writeClient.mutations.AtlasScope_setDocNumber({
      __args: {
        docId: document.id,
        input: {
          docNo: notionDoc.docNo,
        }
      }
    });

    await this.writeClient.mutations.AtlasScope_setScopeName({
      __args: {
        docId: document.id,
        input: {
          name: getPNDTitle(notionDoc, false),
        }
      }
    });

    await this.writeClient.mutations.AtlasScope_setMasterStatus({
      __args: {
        docId: document.id,
        input: {
          masterStatus: statusStringToEnum(notionDoc.masterStatusNames[0] || 'PLACEHOLDER'),
        }
      }
    });

    await this.writeClient.mutations.AtlasScope_setContent({
      __args: {
        docId: document.id,
        input: {
          content: notionDoc.content.map(c => pndContentToString(c)).join("\n"),
        }
      }
    });

    await this.writeClient.mutations.AtlasScope_setNotionId({
      __args: {
        docId: document.id,
        input: {
          notionID: notionDoc.id
        }
      }
    });

    return true;
  }
}