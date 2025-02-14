import data from "../data/view-node-tree.json";
import { AtlasScopeClient } from "./apply-changes/AtlasScopeClient";
import { Tree, TreeNode } from "./apply-changes/Tree";
import { getTitle } from "./apply-changes/utils";

const GQL_ENDPOINT = 'http://localhost:4001/'
const PROCESS_LIMIT = 6;
const tree = data as Tree;

const skipNodes: {[id: string]: boolean} = {
    '422bae2b-2aec-4324-ae40-33c544820db3': false,
    'eca5e587-79e3-480b-b70d-dd25697c9e1f': false,
    'cde3202c-9073-43db-8405-4094624c57ea': false,
    '0ba1b2bd-9513-487d-974c-0d08fb04b341': false,
    '9e3f76e6-3343-4e70-af0b-c914be2e8d5a': false,
};

const clients = {
    scopes: new AtlasScopeClient(GQL_ENDPOINT),
};

async function main() {
    console.log("Processing input documents...");

    const queue = Object.keys(tree)
        .filter(k => tree[k].type == 'scope')
        .map(k => tree[k])
        .sort((a, b) => (a.title.formalId.numberPath[0] || 0) - (b.title.formalId.numberPath[0] || 0));

    let processed = 0, skipped = 0, node: TreeNode | undefined;

    while(node = queue.shift()) {
        if (processed >= PROCESS_LIMIT) {
            console.log(`Process limit reached.`);
            break;
        }

        if (skipNodes[node.id]) {
            console.log(`SKIP [${node.id}]: ${getTitle(node)} (${node.type})`);
            skipped++;
            continue;
        }

        console.log(`>> ${processed+1} [${node.id}]: ${getTitle(node)} (${node.type})`);

        if (node.type === 'scope') {
            await clients.scopes.update(node);
        }

        node.subDocuments.forEach((subNode) => queue.push(subNode));
        processed++;
    };

    console.log(`Processed: ${processed}. Skipped: ${skipped}. Remaining: ${queue.length}.`);
}

await main();