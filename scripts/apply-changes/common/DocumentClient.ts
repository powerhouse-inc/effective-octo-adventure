import { ReactorClient } from "./ReactorClient";
import { DocumentsCache, DocumentCacheEntry } from "./DocumentsCache";
import { gql } from "graphql-request";
import { Maybe } from "document-model/document";

const DEFAULT_MAX_QUERY_BATCH_SIZE = 5;

export type GqlResult<StateType> = {
  document: {
    id: string,
    name: string,
    revision: number,
    state: StateType,
  }
}

export abstract class DocumentClient<StateType, InputType> {
  private documentType: string;
  private maxQueryBatchSize: number = DEFAULT_MAX_QUERY_BATCH_SIZE;
  protected readClient: ReactorClient;
  protected documentsCache: DocumentsCache;
  private documentSchema?: string;

  constructor(documentType: string, documentsCache: DocumentsCache, readClient: ReactorClient) {
    this.documentType = documentType;
    this.readClient = readClient;
    this.documentsCache = documentsCache;
  }

  protected async setDocumentSchema(schema: string) {
    this.documentSchema = schema;
  }

  protected async getDocumentData(id: string) {
    if (!this.documentSchema) {
      throw new Error(`Cannot get document data: document schema for ${this.documentType} not set.`);
    }

    return this.readClient.queryReactor<GqlResult<StateType>>(
      gql`
          query getDocument($id: String!) {
            document(id: $id) {
              ... on ${this.documentSchema}
            }
          }
        `,
      { id }
    );
  }

  public async loadDriveDocumentCache() {
    const driveDocuments = Object.values(this.documentsCache.getDocumentsOfType(this.documentType));
    console.log(` > Loading cache for ${driveDocuments.length} ${this.documentType} document(s)...`);

    for (let i = 0; i < driveDocuments.length;) {
      const batchSize = Math.min(this.maxQueryBatchSize, driveDocuments.length - i);
      const data = await Promise.all(driveDocuments.slice(i, i + batchSize).map(d => this.getDocumentData(d.id)));

      data.forEach(d => this.documentsCache.updateDocument({
        id: d.document.id,
        documentType: this.documentType,
        inputId: this.getInputIdFromState(d.document.state),
        name: this.getNameFromState(d.document.state) || undefined,
      }));

      i += batchSize;
    }
  }

  public async update(inputDocument: InputType) {
    const inputId = this.getInputIdFromInput(inputDocument);
    if (!inputId) {
      throw new Error(`Cannot update input document without ID: ${JSON.stringify(inputDocument)}`);
    }

    const documentIds = this.documentsCache.resolveInputId(inputId);
    let newDocumentId: string | null = null;

    if (documentIds.length > 0) {
      console.log(`Updating ${documentIds.length} existing document(s) for "${this.getNameFromInput(inputDocument)}"...`);

    } else {
      newDocumentId = await this.createDocumentFromInput(inputDocument);

      documentIds.push(newDocumentId);
      this.documentsCache.createDocument({
        id: newDocumentId,
        documentType: this.documentType,
        inputId: this.getInputIdFromInput(inputDocument)
      });

      console.log(`Creating new document for "${this.getNameFromInput(inputDocument)}"...`);
    }

    for (const documentId of documentIds) {
      await this.patchDocument(
        this.documentsCache.getDocumentCacheEntry(this.documentType, documentId),
        inputDocument
      );
    }

    return newDocumentId;
  }

  protected abstract getInputIdFromState(state: StateType): Maybe<string>;
  protected abstract getNameFromState(state: StateType): Maybe<string>;
  protected abstract getInputIdFromInput(input: InputType): Maybe<string>;
  protected abstract getNameFromInput(input: InputType): Maybe<string>;
  protected abstract createDocumentFromInput(input: InputType): Promise<string>;
  protected abstract patchDocument(document: DocumentCacheEntry, target: InputType): Promise<boolean>;
}
