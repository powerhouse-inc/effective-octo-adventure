import { IconName } from "@powerhousedao/design-system";
import { useDriveContext } from "@powerhousedao/reactor-browser";
import { HookState } from "@powerhousedao/reactor-browser/hooks/document-state";
import { AtlasScopeState } from "document-models/atlas-scope/index.js";
import { useMemo } from "react";

export type DocumentLink = {
  documentType: string;
  documentId: string;
  atlasType?: string;
  name: string | null;
  docNo: string | null;
  title: string;
  icon?: IconName;
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
  const { selectedNode, useDriveDocumentStates } = useDriveContext();

  const [state] = useDriveDocumentStates({
    driveId: selectedNode?.id ?? "",
  });

  const documentsLink = useMemo(() => {
    const allDocs: Array<DocumentLink> = [];

    Object.keys(state).forEach(key => {
        const node = state[key];

        const docState = node.global as AtlasScopeState;
        const doc: DocumentLink = {
            documentType: node.documentType,
            documentId: key,
            atlasType: (docState as any).atlasType ?? "",
            name: docState.name,
            docNo: docState.docNo,
            title: createTitle(docState.docNo, docState.name),
            icon: getIcon(node),
        };

        allDocs.push(doc);
    })

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
    if (node.documentType === "sky/atlas-set") {
        return "FolderClose";
    }

    const type = (node.global as any).atlasType?.toLowerCase() || "scope";

    if (type === "neededResearch" || type === "needed_research") {
        return "Tube";
    } else if (type === "tenet") {
        return "Compass";
    } else if (type === "annotation") {
        return "Pencil";
    }

    return "File";
}