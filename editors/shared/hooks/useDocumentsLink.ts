import { type IconName } from "@powerhousedao/document-engineering/ui";
import { useDocumentsInSelectedDrive } from "@powerhousedao/reactor-browser";
import { useMemo } from "react";
import { type Maybe, type PHDocument } from "document-model";
import { getDocumentIcon } from "../../../document-models/utils.js";

export type DocumentLink = {
  documentType: string;
  documentId: string;
  atlasType?: string;
  name: string | null;
  docNo: string | null;
  title: string;
  icon?: IconName;
};

type AnyDocumentState = {
  atlasType?: Maybe<string>;
  name?: Maybe<string>;
  docNo?: Maybe<string>;
};

/**
 * Filter function for the documents link.
 *
 * @param node - The node to filter
 * @returns True if the node should be included, false otherwise
 */
export type FilterFn = (node: DocumentLink) => boolean;

/**
 * Use the documents link hook.
 *
 * @param filterFn - The filter function to filter the documents (optional)
 * @returns The documents link
 */
export function useDocumentsLink(filterFn?: FilterFn) {
  const documents = useDocumentsInSelectedDrive();

  const documentsLink = useMemo(() => {
    if (!documents) {
      return [];
    }

    const allDocs: Array<DocumentLink> = documents.map((doc) => {
      const docState = (doc.state as any).global as AnyDocumentState;
      return {
        documentType: doc.header.documentType,
        documentId: doc.header.id,
        atlasType: docState.atlasType ?? "",
        name: docState.name ?? "",
        docNo: docState.docNo ?? "",
        title: createTitle(docState.docNo ?? "", docState.name ?? ""),
        icon: getIcon(doc),
      };
    });

    if (filterFn) {
      return allDocs.filter(filterFn);
    }

    return allDocs;
  }, [documents, filterFn]);

  return documentsLink;
}

/**
 * Create the title for the node.
 *
 * @param docNo - The docNo of the node
 * @param name - The name of the node
 * @returns The title for the node
 */
function createTitle(docNo: string | null, name: string | null) {
  if (!docNo) {
    return name ?? "";
  } else if (!name) {
    return docNo;
  }

  return `${docNo} - ${name}`;
}

/**
 * Get the icon name for the node.
 *
 * @param doc - The document to get the icon for
 * @returns The icon for the node
 */
function getIcon(doc: PHDocument) {
  return getDocumentIcon(
    doc.header.documentType,
    ((doc.state as any).global as AnyDocumentState).atlasType ?? "",
  );
}
