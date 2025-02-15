import { DriveNodes } from "scripts/clients/ReactorClient";

type DocumentEntry = {
  id: string,
  documentType: string,
  notionId: string | null,
  parentFolder?: string,
  name?: string,
}

type DocumentReporter = {
  onDocumentCreated: (callback: (document: DocumentEntry) => void) => number,
  onNameSet: (callback: (id: string, name: string) => void) => number,
  onParentFolderSet: (callback: (id: string, parentFolder: string) => void) => number,
  onNotionIdSet: (callback: (id: string, notionId: string) => void) => number,
  removeObserver: (observerId: number) => boolean,
}

export class AtlasDocumentsCache {
  private documentsByType: Record<string, Record<string, DocumentEntry>> = {};
  private notionLookup: Record<string, Record<string, string>> = {};

  constructor(nodes: DriveNodes) {
    this.initializeNodesByType(nodes);
  }

  public createDocument(entry: DocumentEntry) {
    if (!this.documentsByType[entry.documentType]) {
      this.documentsByType[entry.documentType] = {};
    }

    if (this.documentsByType[entry.documentType][entry.id]) {
      throw new Error(`Document of type ${entry.documentType} already exists on cache create: ${entry.id}`);
    }

    this.documentsByType[entry.documentType][entry.id] = { ...entry };
    this.updateNotionId(null, entry);
  }

  public updateDocument(entry: DocumentEntry) {
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

    this.updateNotionId(existing, entry);
  }

  private updateNotionId(existing: DocumentEntry | null, update: DocumentEntry) {
    if (!existing || existing.notionId !== update.notionId) {
      if (existing && existing.notionId !== null) {
        if (!this.notionLookup[existing.notionId][existing.id]) {
          throw new Error(`Detected missing Notion lookup entry for Notion ID ${existing.notionId} (doc ID ${existing.id})`);
        }

        delete this.notionLookup[existing.notionId][existing.id];
      }

      if (update.notionId !== null) {
        if (!this.notionLookup[update.notionId]) {
          this.notionLookup[update.notionId] = {};
        }

        this.notionLookup[update.notionId][update.id] = update.documentType;
      }
    }
  }

  public getDocumentsOfType(documentType: string) {
    return this.documentsByType[documentType] || [];
  }

  public hasNotionId(notionId: string): boolean {
    return !!this.notionLookup[notionId];
  }

  public resolveNotionId(notionId: string): string[] {
    return Object.keys(this.notionLookup[notionId] || []);
  }

  public getNotionId(documentType: string, id: string) {
    const entry = this.documentsByType[documentType][id];
    return entry ? entry.notionId : null;
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
        notionId: null,
      };
    }
  }
};