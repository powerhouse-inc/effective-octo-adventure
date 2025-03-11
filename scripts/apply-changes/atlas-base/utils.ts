import { Maybe } from "graphql-ts-client";
import { ParsedNotionDocument } from "./NotionTypes";
import { DocumentsCache } from "../common/DocumentsCache";

export const extractDocNoAndTitle = (docNo: string, name: string) => {
  if (name.length > 0) {
    return [docNo.trim(), name.trim()];
  }

  const dashPosition = docNo.indexOf('-');
  if (dashPosition < 0) {
    return [docNo.trim(), name.trim()];
  }

  return [
    docNo.substring(0, dashPosition).trim(),
    docNo.substring(dashPosition + 1).trim(),
  ];
}

type Link = {
  id: string;
  docNo: Maybe<string>;
  name: Maybe<string>;
}

export const findAtlasParentInCache = (input: ParsedNotionDocument, cache: DocumentsCache) => {
  let parent: Maybe<Link> = null;
  for (let i=0; parent === null && i<input.parents?.length || 0; i++) {
    const parentDocIds = cache.resolveInputId(input.parents[i]);
    if (parentDocIds.length) {
      const parentDoc = cache.searchDocument(parentDocIds[0]);
      if (parentDoc) {
        parent = {
          id: parentDoc.id,
          name: parentDoc.name || null,
          docNo: parentDoc.state?.docNo || null
        };
      }
    }
  }

  if (parent === null) {
    console.log(`Can't find the parent in document cache: ${input.parents?.join(',')}`);
  }

  return parent;
}