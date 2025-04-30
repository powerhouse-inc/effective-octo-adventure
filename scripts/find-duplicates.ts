import { ViewNode } from "@powerhousedao/sky-atlas-notion-data";
import { atlasData } from "../document-models/utils.js";

export function findDuplicates(nodes: ViewNode[]): ViewNode[] {
  const idMap: { [id: string]: boolean } = {};
  const duplicates: ViewNode[] = [];

  function findDuplicatesRecursive(node: ViewNode) {
    if (idMap[node.id]) {
      duplicates.push(node);
    } else {
      idMap[node.id] = true;
    }

    for (const subNode of node.subDocuments) {
      findDuplicatesRecursive(subNode);
    }
  }

  for (const node of nodes) {
    findDuplicatesRecursive(node);
  }

  return duplicates;
}

function main() {
    const duplicates = findDuplicates(atlasData);

    console.log("Duplicates found: ", duplicates.length);
    console.log(duplicates);
}

main();