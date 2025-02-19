import { TreeNode } from "./Tree";

export const getTitle = (document: TreeNode, withNumber=true) => {
    const numberPrefix = (withNumber ? 
        document.title.formalId.prefix + '.' + document.title.formalId.numberPath.join('.') + ' - ' : 
        '');

    return numberPrefix + document.title.title;
};