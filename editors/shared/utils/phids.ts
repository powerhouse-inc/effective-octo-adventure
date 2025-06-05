import { type PHIDOption } from "@powerhousedao/document-engineering/ui";
import { type DocumentLink } from "../hooks/useDocumentsLink.js";

export function documentLinksToPHIDOptions(
  documents: DocumentLink[],
): PHIDOption[] {
  return documents.map((doc) => ({
    path: doc.documentType,
    value: `phd:${doc.documentId}`,
    title: doc.title,
    icon: doc.icon,
  }));
}
