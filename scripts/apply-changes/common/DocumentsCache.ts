import { DriveNodes } from "../common/ReactorClient";

export type DocumentCacheEntry = {
  id: string,
  documentType: string,
  inputId: string | null,
  parentFolder?: string,
  name?: string,
}

export class DocumentsCache {
  private inputTypeDebugName: string;
  private documentsByType: Record<string, Record<string, DocumentCacheEntry>> = {};
  private inputDocumentsLookup: Record<string, Record<string, string>> = {};

  constructor(nodes: DriveNodes, inputTypeDebugName:string = "Input") {
    this.initializeNodesByType(nodes);
    this.inputTypeDebugName = inputTypeDebugName;
  }

  public createDocument(entry: DocumentCacheEntry) {
    if (!this.documentsByType[entry.documentType]) {
      this.documentsByType[entry.documentType] = {};
    }

    if (this.documentsByType[entry.documentType][entry.id]) {
      throw new Error(`Document of type ${entry.documentType} already exists on cache create: ${entry.id}`);
    }

    this.documentsByType[entry.documentType][entry.id] = { ...entry };
    this.updateInputId(null, entry);
  }

  public updateDocument(entry: DocumentCacheEntry) {
    if (!this.documentsByType[entry.documentType]) {
      throw new Error(`Cannot find document type on update cache: ${entry.documentType}`);
    }

    const existing = this.documentsByType[entry.documentType][entry.id];
    if (!existing) {
      throw new Error(`Cannot find document of type ${entry.documentType} on cache update: ${entry.id}`);
    }

    this.documentsByType[entry.documentType][entry.id] = {
      ...existing,
      ...entry
    };

    this.updateInputId(existing, entry);
  }

  private updateInputId(existing: DocumentCacheEntry | null, update: DocumentCacheEntry) {
    if (!existing || existing.inputId !== update.inputId) {
      if (existing && existing.inputId !== null) {
        if (!this.inputDocumentsLookup[existing.inputId][existing.id]) {
          throw new Error(`Detected missing ${this.inputTypeDebugName} lookup entry for ${this.inputTypeDebugName} ID ${existing.inputId} (document ID ${existing.id})`);
        }

        delete this.inputDocumentsLookup[existing.inputId][existing.id];
      }

      if (update.inputId !== null) {
        if (!this.inputDocumentsLookup[update.inputId]) {
          this.inputDocumentsLookup[update.inputId] = {};
        }

        this.inputDocumentsLookup[update.inputId][update.id] = update.documentType;
      }
    }
  }

  public getDocumentsOfType(documentType: string) {
    return this.documentsByType[documentType] || [];
  }

  public getDocumentCacheEntry(documentType: string, id: string): DocumentCacheEntry {
    if (!this.documentsByType[documentType][id]) {
      throw new Error(`Cannot find document of type ${documentType} with id ${id}`);
    }

    return this.documentsByType[documentType][id];
  }

  public hasInputDocument(inputId: string): boolean {
    return !!this.inputDocumentsLookup[inputId];
  }

  public resolveInputId(inputDocumentId: string): string[] {
    return Object.keys(this.inputDocumentsLookup[inputDocumentId] || []);
  }

  public getInputId(documentType: string, id: string) {
    const entry = this.documentsByType[documentType][id];
    return entry ? entry.inputId : null;
  }

  public getDocumentsCount() {
    return Object.keys(this.documentsByType).reduce(
      (result, key) => { 
        result[key] = Object.keys(this.documentsByType[key]).length;
        return result; 
      },
      {} as Record<string, number>
    );
  }

  private initializeNodesByType(nodes: DriveNodes) {
    for (const node of nodes.nodes) {
      const key = node.documentType || "folder";

      if (!this.documentsByType[key]) {
        this.documentsByType[key] = {};
      }

      if (this.documentsByType[key][node.id]) {
        throw new Error("Found duplicate document ID while initializing index: " + node.id);
      }

      this.documentsByType[key][node.id] = {
        id: node.id,
        name: node.name,
        parentFolder: node.parentFolder,
        documentType: key,
        inputId: null,
      };
    }
  }
};