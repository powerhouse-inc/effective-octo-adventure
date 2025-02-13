export type Tree = {
    [key: string]: TreeNode;
};

export type TreeNode = {
    id: string, 
    type: string, 
    slugSuffix: string, 
    parentSlugSuffix: string, 
    ancestorSlugSuffixes: [string], 
    descendantSlugSuffixes: [string],
    title: {
        formalId: {
            prefix: string,
            numberPath: [number],
        },
        title: string,
    },
    hubUrls: [string],
    content: {
        text: {
            type: string,
            text: string
        }[];
    }[],
    subDocuments: [TreeNode],
};