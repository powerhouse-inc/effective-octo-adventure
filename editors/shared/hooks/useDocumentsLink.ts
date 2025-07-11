import { type IconName } from "@powerhousedao/document-engineering/ui";
import { useDriveContext } from "@powerhousedao/reactor-browser";
import { useMemo } from "react";
import { type HookState } from "@powerhousedao/reactor-browser/hooks/document-state";
import { type Maybe } from "document-model";
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
  let driveContext;
  // check if the context is available before using it
  try {
    driveContext = useDriveContext();
  } catch {
    console.warn(
      "DriveContext not available, returning an empty documents list",
    );
    return [];
  }

  const { selectedNode, useDriveDocumentStates } = driveContext;

  const [state] = useDriveDocumentStates({
    driveId: selectedNode?.id ?? "",
  });

  const documentsLink = useMemo(() => {
    const allDocs: Array<DocumentLink> = [];

    Object.keys(state).forEach((key) => {
      const node = state[key];

      const docState = node.global as AnyDocumentState;
      const doc: DocumentLink = {
        documentType: node.documentType,
        documentId: key,
        atlasType: docState.atlasType ?? "",
        name: docState.name ?? "",
        docNo: docState.docNo ?? "",
        title: createTitle(docState.docNo ?? "", docState.name ?? ""),
        icon: getIcon(node),
      };

      allDocs.push(doc);
    });

    if (filterFn) {
      return allDocs.filter(filterFn);
    }

    return allDocs;
  }, [state]);

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
 * @param node - The node to get the icon for
 * @returns The icon for the node
 */
function getIcon(node: HookState) {
  return getDocumentIcon(
    node.documentType,
    (node.global as AnyDocumentState).atlasType ?? "",
  );
}
