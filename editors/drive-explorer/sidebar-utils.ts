import {
  type NodeStatus,
  type SidebarNode,
} from "@powerhousedao/document-engineering/ui";
import { type AtlasArticle } from "./components/types.js";
import { type AtlasMultiParentState } from "../../document-models/atlas-multi-parent/index.js";

export function buildSidebarTree(allNodes: Record<string, AtlasArticle>) {
  const nodesById: Record<string, SidebarNode> = {};

  for (const [key, node] of Object.entries(allNodes)) {
    let icons = {};
    const type = node.global.atlasType?.toLowerCase() || "scope";

    if (node.documentType === "sky/atlas-set") {
      icons = {
        icon: "FolderClose",
        expandedIcon: "FolderOpen",
      };
    } else if (type === "needed_research") {
      icons = {
        icon: "Tube",
      };
    } else if (type === "tenet") {
      icons = {
        icon: "Compass",
      };
    } else if (type === "annotation") {
      icons = {
        icon: "Pencil",
      };
    }

    let status = "UNCHANGED";

    if (!node.global.notionId) {
      status = "CREATED";
    } else if (node.revision.global > 7) {
      status = "MODIFIED";
    }

    let title = `${node.global?.docNo || "Doc No"} - ${node.global.name || "Name"}`;
    if (node.documentType === "sky/atlas-multiparent") {
      title = node.global.name || "Name";
    }
    const isNewDocs = node.global?.docNo === "" && node.global.name === "";
    // check if the document is a new document with no docNo in the name to add placeholder
    const isNewDocsWithNoDocNoInTitle = isNewDocs;

    nodesById[key] = {
      id: key,
      title,
      children: [],
      status: status as NodeStatus,
      className: isNewDocsWithNoDocNoInTitle ? "italic" : "",
      ...icons,
    };
  }

  // Build the tree
  for (const [key, value] of Object.entries(allNodes)) {
    if (value.documentType === "sky/atlas-multiparent") {
      const parents = (value.global as unknown as AtlasMultiParentState)
        .parents;
      if (parents && parents.length > 0) {
        for (const parent of parents) {
          const nodeWithCorrectTitle = {
            ...nodesById[key],
            title: parent.docNo
              ? `${parent.docNo} - ${value.global.name || "Name"}`
              : `${value.global.name || "Name"}`,
          };
          nodesById[parent.id]?.children?.push(nodeWithCorrectTitle);
        }
      }
    } else if (
      value.global.parent &&
      !!value.global.parent.id &&
      nodesById[value.global.parent.id]
    ) {
      if (nodesById[key]) {
        nodesById[value.global.parent.id]?.children?.push(nodesById[key]);
      }
    }
  }

  const childrenIds = new Set<string>();

  Object.entries(nodesById).forEach(([id, node]) => {
    if (node?.children) {
      node?.children?.forEach((child) => {
        childrenIds.add(child.id);
      });
    }
  });

  const result = Object.values(nodesById).filter(
    (node) => !childrenIds.has(node.id),
  );

  return sortSidebarNodes(result);
}

function sortSidebarNodes(nodes: SidebarNode[]): SidebarNode[] {
  for (const node of nodes) {
    if (node.children && node.children.length > 0) {
      node.children = sortSidebarNodes(node.children);
    }
  }

  return nodes.sort((a, b) => {
    if (a.icon === "FolderClose" || b.icon === "FolderClose") {
      // if any of the nodes is a set, we need to sort by the title of the first child
      const bTitle =
        b.icon === "FolderClose"
          ? (b.children?.[0]?.title ?? b.title)
          : b.title;
      const aTitle =
        a.icon === "FolderClose"
          ? (a.children?.[0]?.title ?? a.title)
          : a.title;
      return compareTitles(aTitle, bTitle);
    }

    // jsut two regular nodes
    return compareTitles(a.title, b.title);
  });
}

type TitleParts = {
  docNo?: string;
  name: string;
};

/**
 * Extract the docNo and name from the title
 * @param title - The title of the node
 * @returns The docNo and name
 */
function getTitleParts(title: string): TitleParts {
  if (title.indexOf(" - ") === -1) {
    // the title doesn't have a docNo
    return {
      name: title,
    };
  }

  const separatorIndex = title.indexOf(" - ");
  const docNo = title.slice(0, separatorIndex);
  const name = title.slice(separatorIndex + 3);

  const docNoRegex = /^A(\.[a-zA-Z0-9]+)+\.?$/;
  if (!docNoRegex.test(docNo)) {
    // the title has the separator, but it is just part of the name
    return {
      name,
    };
  }

  return {
    docNo,
    name,
  };
}

/**
 * Compare two titles
 * @param titleA - The first title
 * @param titleB - The second title
 * @returns -1 if titleA is less than titleB, 1 if titleA is greater than titleB, 0 if they are equal
 */
function compareTitles(titleA: string, titleB: string): number {
  const partsA = getTitleParts(titleA);
  const partsB = getTitleParts(titleB);

  // titles with docNo have priority
  if (partsA.docNo && !partsB.docNo) {
    return -1;
  }
  if (!partsA.docNo && partsB.docNo) {
    return 1;
  }

  if (!partsA.docNo && !partsB.docNo) {
    // both titles don't have a docNo, so we sort by name
    return partsA.name.localeCompare(partsB.name);
  }

  const docNoComparison = compareDocNos(partsA.docNo!, partsB.docNo!);
  if (docNoComparison !== 0) {
    return docNoComparison;
  }

  return partsA.name.localeCompare(partsB.name);
}

/**
 * Compare two docNo strings
 * @param docNoA - The first docNo
 * @param docNoB - The second docNo
 * @returns -1 if docNoA is less than docNoB, 1 if docNoA is greater than docNoB, 0 if they are equal
 */
function compareDocNos(docNoA: string, docNoB: string): number {
  const partsA = docNoA.split(".");
  const partsB = docNoB.split(".");

  const length = Math.max(partsA.length, partsB.length);

  for (let i = 0; i < length; i++) {
    // take the segments and remove the AG part to support agent document numbers
    const segA = /AG\d+/.test(partsA[i]) ? partsA[i].substring(2) : partsA[i];
    const segB = /AG\d+/.test(partsB[i]) ? partsB[i].substring(2) : partsB[i];

    // Handle case when one string has fewer segments
    if (segA === undefined) return -1;
    if (segB === undefined) return 1;

    const isNumA = /^\d+$/.test(segA);
    const isNumB = /^\d+$/.test(segB);

    if (isNumA && isNumB) {
      const numA = parseInt(segA, 10);
      const numB = parseInt(segB, 10);
      if (numA < numB) return -1;
      if (numA > numB) return 1;
    } else {
      if (segA < segB) return -1;
      if (segA > segB) return 1;
    }
  }

  return 0;
}
