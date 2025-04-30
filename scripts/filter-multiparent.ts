import { ViewNode } from "@powerhousedao/sky-atlas-notion-data";
import { atlasData } from "../document-models/utils.js";
import fs from "node:fs";

const ANNOTATION = "annotation";
const NEEDED_RESEARCH = "neededResearch";

function filterNodes(type: "annotation" | "neededResearch") {
    const result: ViewNode[] = [];

    function generateNodes(nodes: ViewNode[]) {
        if (nodes.length === 0) {
            return;
        }

        for (const node of nodes) {
            if (node.type === type) {
                result.push(node);
            }

            if (node.subDocuments.length > 0) {
                generateNodes(node.subDocuments);
            }
        }
    }

    generateNodes(atlasData);
    
    fs.writeFileSync(`./data/atlas-data-filtered-${type}.json`, JSON.stringify(result, null, 2));

    console.log(`Filtered ${result.length} ${type} nodes`);

    return result;
}

function findDuplicates(nodes: ViewNode[]) {
    const duplicates = new Map<string, ViewNode[]>();
    let count = 0;

    for (let i = 0; i < nodes.length; i++) {
        for (let j = i + 1; j < nodes.length; j++) {
            if (nodes[i].title.title === nodes[j].title.title) {
                count++;
                if (duplicates.has(nodes[i].title.title)) {
                    duplicates.get(nodes[i].title.title)?.push(nodes[j]);
                } else {
                    duplicates.set(nodes[i].title.title, [nodes[i], nodes[j]]);
                }
            }
        }
    }

    console.log(`Found ${count} duplicates`);

    return duplicates;
}


function main() {
  const annotationNodes = filterNodes(ANNOTATION);
  const neededResearchNodes = filterNodes(NEEDED_RESEARCH);

  const annotationDuplicates = findDuplicates(annotationNodes);
  fs.writeFileSync(`./data/atlas-data-filtered-annotation-duplicates.json`, JSON.stringify(Array.from(annotationDuplicates.values()), null, 2));

  const neededResearchDuplicates = findDuplicates(neededResearchNodes);
  fs.writeFileSync(`./data/atlas-data-filtered-neededResearch-duplicates.json`, JSON.stringify(Array.from(neededResearchDuplicates.values()), null, 2));
}

main();
